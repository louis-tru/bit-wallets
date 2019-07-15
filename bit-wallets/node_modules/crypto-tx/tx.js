/* ***** BEGIN LICENSE BLOCK *****
 * Distributed under the BSD license:
 *
 * Copyright (c) 2015, xuewen.chu
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of xuewen.chu nor the
 *       names of its contributors may be used to endorse or promote products
 *       derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL xuewen.chu BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 * ***** END LICENSE BLOCK ***** */

var { Buffer } = require('buffer');
var utils = require('./utils');
var fees = require('./fees');
var BN = require('bn.js');
var assert = require('assert');

var _typeof = (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") ? 
function (obj) { return typeof obj; } :
function (obj) {
	return (
		obj && typeof Symbol === "function" && 
		obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj
	);
};

/**
 * Defines properties on a `Object`. It make the assumption that underlying data is binary.
 * @param {Object} self the `Object` to define properties on
 * @param {Array} fields an array fields to define. Fields can contain:
 * * `name` - the name of the properties
 * * `length` - the number of bytes the field can have
 * * `allowLess` - if the field can be less than the length
 * * `allowEmpty`
 * @param {*} data data to be validated against the definitions
 */
function defineProperties(self, fields, data) {
	self.raw = [];
	self._fields = [];

	// attach the `toJSON`
	self.toJSON = function (label) {
		if (label) {
			var obj = {};
			self._fields.forEach(function (field) {
				obj[field] = '0x' + self[field].toString('hex');
			});
			return obj;
		}
		return utils.baToJSON(this.raw);
	};

	self.serialize = function serialize() {
		return utils.rlp_encode(self.raw);
	};

	fields.forEach(function (field, i) {
		self._fields.push(field.name);

		function getter() {
			return self.raw[i];
		}

		function setter(v) {
			v = utils.toBuffer(v);

			if (v.toString('hex') === '00' && !field.allowZero) {
				v = Buffer.allocUnsafe(0);
			}

			if (field.allowLess && field.length) {
				v = utils.stripZeros(v);
				assert(field.length >= v.length, 
					'The field ' + field.name + ' must not have more ' + field.length + ' bytes');
			}
			else if (!(field.allowZero && v.length === 0) && field.length) {
				assert(field.length === v.length, 
					'The field ' + field.name + ' must have byte length of ' + field.length);
			}

			self.raw[i] = v;
		}

		Object.defineProperty(self, field.name, {
			enumerable: true,
			configurable: true,
			get: getter,
			set: setter
		});

		if (field.default) {
			self[field.name] = field.default;
		}

		// attach alias
		if (field.alias) {
			Object.defineProperty(self, field.alias, {
				enumerable: false,
				configurable: true,
				set: setter,
				get: getter
			});
		}
	});

	// if the constuctor is passed data
	if (data) {
		if (typeof data === 'string') {
			data = Buffer.from(utils.stripHexPrefix(data), 'hex');
		}

		if (Buffer.isBuffer(data)) {
			data = utils.rlp_decode(data);
		}

		if (Array.isArray(data)) {
			if (data.length > self._fields.length) {
				throw new Error('wrong number of fields in data');
			}
			// make sure all the items are buffers
			data.forEach(function (d, i) {
				self[self._fields[i]] = utils.toBuffer(d);
			});
		}
		else if ((typeof data === 'undefined' ? 'undefined' : _typeof(data)) === 'object') {
			var keys = Object.keys(data);
			fields.forEach(function (field) {
				if (keys.indexOf(field.name) !== -1)
					self[field.name] = data[field.name];
				if (keys.indexOf(field.alias) !== -1)
					self[field.alias] = data[field.alias];
			});
		}
		else {
			throw new Error('invalid data');
		}
	}
}

/**
 * @class Transaction
 */
class Transaction {
	
	constructor (data) {
		data = data || {}
		// Define Properties
		const fields = [
			{
				name: 'nonce',
				length: 32,
				allowLess: true,
				default: new Buffer([])
			}, {
				name: 'gasPrice',
				length: 32,
				allowLess: true,
				default: new Buffer([])
			}, {
				name: 'gasLimit',
				alias: 'gas',
				length: 32,
				allowLess: true,
				default: new Buffer([])
			}, {
				name: 'to',
				allowZero: true,
				length: 20,
				default: new Buffer([])
			}, {
				name: 'value',
				length: 32,
				allowLess: true,
				default: new Buffer([])
			}, {
				name: 'data',
				alias: 'input',
				allowZero: true,
				default: new Buffer([])
			}, {
				name: 'v',
				allowZero: true,
				default: new Buffer([0x1c])
			}, {
				name: 'r',
				length: 32,
				allowZero: true,
				allowLess: true,
				default: new Buffer([])
			}, {
				name: 's',
				length: 32,
				allowZero: true,
				allowLess: true,
				default: new Buffer([])
			}
		];

		/**
		 * Returns the rlp encoding of the transaction
		 * @method serialize
		 * @return {Buffer}
		 * @memberof Transaction
		 * @name serialize
		 */
		// attached serialize
		defineProperties(this, fields, data);

		/**
		 * @property {Buffer} from (read only) sender address of 
		 *		this transaction, mathematically derived from other parameters.
		 * @name from
		 * @memberof Transaction
		 */
		Object.defineProperty(this, 'from', {
			enumerable: true,
			configurable: true,
			get: this.getSenderAddress.bind(this)
		});

		// calculate chainId from signature
		let sigV = utils.bufferToInt(this.v);
		let chainId = Math.floor((sigV - 35) / 2);
		if (chainId < 0) chainId = 0;

		// set chainId
		this._chainId = chainId || data.chainId || 0;
		this._homestead = true;
	}

	/**
	 * If the tx's `to` is to the creation address
	 * @return {Boolean}
	 */
	toCreationAddress () {
		return this.to.toString('hex') === '';
	}

	/**
	 * Computes a sha3-256 hash of the serialized tx
	 * @param {Boolean} [includeSignature=true] whether or not to inculde the signature
	 * @return {Buffer}
	 */
	hash (includeSignature) {
		if (includeSignature === undefined) includeSignature = true;

		// EIP155 spec:
		// when computing the hash of a transaction for purposes of signing or recovering,
		// instead of hashing only the first six elements (ie. nonce, gasprice, startgas, to, value, data),
		// hash nine elements, with v replaced by CHAIN_ID, r = 0 and s = 0

		let items
		if (includeSignature) {
			items = this.raw;
		} else {
			if (this._chainId > 0) {
				const raw = this.raw.slice();
				this.v = this._chainId;
				this.r = 0;
				this.s = 0;
				items = this.raw;
				this.raw = raw;
			} else {
				items = this.raw.slice(0, 6);
			}
		}

		// create hash
		return utils.rlphash(items);
	}

	/**
	 * returns chain ID
	 * @return {Buffer}
	 */
	getChainId () {
		return this._chainId;
	}

	/**
	 * returns the sender's address
	 * @return {Buffer}
	 */
	getSenderAddress () {
		if (this._from) {
			return this._from;
		}
		const pubkey = this.getSenderPublicKey();
		this._from = utils.publicToAddress(pubkey);
		return this._from;
	}

	/**
	 * returns the public key of the sender
	 * @return {Buffer}
	 */
	getSenderPublicKey () {
		if (!this._senderPubKey || !this._senderPubKey.length) {
			if (!this.verifySignature()) throw new Error('Invalid Signature');
		}
		return this._senderPubKey;
	}

	/**
	 * Determines if the signature is valid
	 * @return {Boolean}
	 */
	verifySignature () {
		const msgHash = this.hash(false)
		// All transaction signatures whose s-value is greater than secp256k1n/2 are considered invalid.
		if (this._homestead && new BN(this.s).cmp(N_DIV_2) === 1) {
			return false;
		}

		try {
			let v = utils.bufferToInt(this.v)
			if (this._chainId > 0) {
				v -= this._chainId * 2 + 8;
			}
			this._senderPubKey = utils.ecrecover(msgHash, v, this.r, this.s);
		} catch (e) {
			return false;
		}

		return !!this._senderPubKey;
	}

	/**
	 * sign a transaction with a given private key
	 * @param {Buffer} privateKey
	 */
	sign (privateKey) {
		const msgHash = this.hash(false);
		const sig = utils.ecsign(msgHash, privateKey);
		if (this._chainId > 0) {
			sig.v += this._chainId * 2 + 8;
		}
		Object.assign(this, sig);
	}

	/**
	 * The amount of gas paid for the data in this tx
	 * @return {BN}
	 */
	getDataFee () {
		const data = this.raw[5];
		const cost = new BN(0);
		for (let i = 0; i < data.length; i++) {
			data[i] === 0 ? cost.iaddn(fees.txDataZeroGas.v) : cost.iaddn(fees.txDataNonZeroGas.v);
		}
		return cost;
	}

	/**
	 * the minimum amount of gas the tx must have (DataFee + TxFee + Creation Fee)
	 * @return {BN}
	 */
	getBaseFee () {
		const fee = this.getDataFee().iaddn(fees.txGas.v)
		if (this._homestead && this.toCreationAddress()) {
			fee.iaddn(fees.txCreation.v);
		}
		return fee
	}

	/**
	 * the up front amount that an account must have for this transaction to be valid
	 * @return {BN}
	 */
	getUpfrontCost () {
		return new BN(this.gasLimit)
			.imul(new BN(this.gasPrice))
			.iadd(new BN(this.value));
	}

	/**
	 * validates the signature and checks to see if it has enough gas
	 * @param {Boolean} [stringError=false] whether to return a string 
	 *   with a description of why the validation failed or return a Boolean
	 * @return {Boolean|String}
	 */
	validate (stringError) {
		const errors = []
		if (!this.verifySignature()) {
			errors.push('Invalid Signature');
		}

		if (this.getBaseFee().cmp(new BN(this.gasLimit)) > 0) {
			errors.push([`gas limit is too low. Need at least ${this.getBaseFee()}`]);
		}

		if (stringError === undefined || stringError === false) {
			return errors.length === 0;
		} else {
			return errors.join(' ');
		}
	}
}

function signTx(privateKey, txData) {
	// var txData = {
	// 	nonce: '0x00',
	// 	gasPrice: '0x09184e72a000', 
	// 	gasLimit: '0x2710',
	// 	to: '0x0000000000000000000000000000000000000000',
	// 	value: '0x00', 
	// 	data: '0x7f7465737432000000000000000000000000000000000000000000000000000000600057',
	// 	// EIP 155 chainId - mainnet: 1, ropsten: 3
	// 	chainId: 3
	// }
	var tx = new Transaction(txData);
	tx.sign(privateKey);
	var serializedTx = tx.serialize();
	return {
		rsv: { r: tx.r, s: tx.s, v: tx.v },
		rsvHex: {
			r: '0x' + tx.r.toString('hex'),
			s: '0x' + tx.s.toString('hex'),
			v: '0x' + tx.v.toString('hex'),
		},
		rawTx: txData,
		signTx: serializedTx,
		hex: '0x' + serializedTx.toString('hex'),
	};
}

exports.signTx = signTx;
exports.Transaction = Transaction;

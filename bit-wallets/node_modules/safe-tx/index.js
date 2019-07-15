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

var utils = require('langoukit');
var errno = require('./errno');
var { Monitor } = require('langoukit/monitor');
var Web3Class = require('web3');
var { Notification } = require('langoukit/event');
var _fix_web3 = require('./_fix_web3');

var SAFE_TRANSACTION_MAX_TIMEOUT = 180 * 1e3;  // 180秒
var TRANSACTION_MAX_BLOCK_RANGE = 32;
var TRANSACTION_CHECK_TIME = 1e4; // 10秒
var DEFAULT_GAS_LIMIT = 1e8;
var DEFAULT_GAS_PRICE = 1e5;

/**
 * @func web3Instance()
 */
function web3Instance(self) {
	if (!self.m_web3) {
		var url = self.m_url; // utils.config.ethereumPosNode;
		var { HttpProvider, WebsocketProvider } = Web3Class.providers;
		var provider;
		if (/^https?:/.test(url)) {
			provider = new HttpProvider(url, { timeout: SAFE_TRANSACTION_MAX_TIMEOUT });
		} else if (/^wss?:/.test(url)) {
			provider = new WebsocketProvider(url, { timeout: SAFE_TRANSACTION_MAX_TIMEOUT });
		} else {
			throw Error(`Can't create 'Web3 provider`);
		}
		self.m_web3 = new Web3Class(provider);
		self.m_web3.eth.defaultAccount = self.defaultAccount;
	}
	return self.m_web3;
}

/**
 * @func createContract()
 */
function createContract(self, address, abi, name = '') {
	var account = self.defaultAccount;
	var web3 = web3Instance(self);
	var contract = new web3.eth.Contract(abi, address, { 
		from: account, gas: self.gasLimit, gasLimit: self.gasLimit,
	});

	/**
	 * @func signTx(param) 对交易进行签名
	 */
	async function signTx(tx, param) { //
		var data = tx.encodeABI();
		var gasLimit = self.gasLimit;
		var gasPrice = self.gasPrice + utils.random(0, 1000);

		var rawTx = Object.assign({
				from: account,
				gas: gasLimit,
				gasLimit: gasLimit,
				gasPrice: gasPrice, value: '0x00',
			},
			param, { to: address, data: data }
		);
		var signatureData = await self.sign(rawTx);
		return signatureData;
	}

	/**
	 * @func sendSignTransaction(param) 对交易进行签名并发送
	 */
	function Inl_sendSignTransaction(tx, param) {
		return new Promise(async function(resolve, reject) {
			try {
				var signatureData = await signTx(tx, param); // sign Transaction data
			} catch(err) {
				reject(err);
				return;
			}
			try {
				resolve(await self.sendSignTransaction(signatureData, param));
			} catch(err) {
				reject(err);
			}
		});
	}

	// TODO extend method signedTransaction() and sendSignedTransaction()
	abi.forEach(function({ name }) {
		var { methods } = contract;
		var func = methods[name];
		methods[name] = (...args)=>{
			var tx = func.call(methods, ...args);
			tx.sign = e=>signTx(tx, e);
			tx.sendSignTransaction = e=>Inl_sendSignTransaction(tx, e);
			return tx;
		};
	});
	// end

	if (name) {
		self.m_contract[name] = contract;
	}
	self.m_contract[address] = contract;

	return contract;
}

/**
 * @class SafeWeb3
 */
class SafeWeb3 extends Notification {

	constructor(url, defaultAccount = '') {
		super();
		this.m_url = url || 'http://127.0.0.1:8545';
		this.m_prevSafeTransactionTime = {};
		this.m_default_account = defaultAccount || '';
		this.m_contract = {};
		this.m_gasLimit = DEFAULT_GAS_LIMIT;
		this.m_gasPrice = DEFAULT_GAS_PRICE;
	}

	get gasLimit() {
		return this.m_gasLimit;
	}

	set gasLimit(value) {
		this.m_gasLimit = Number(value) || DEFAULT_GAS_LIMIT;
	}

	get gasPrice() {
		return this.m_gasPrice;
	}

	set gasPrice(value) {
		this.m_gasPrice = Number(value) || DEFAULT_GAS_PRICE;
	}

	get core() {
		return web3Instance(this);
	}

	get defaultAccount() {
		return this.getDefaultAccount();
	}

	createContract(address, abi, name = '') {
		var r = this.m_contract[address] || this.m_contract[name];
		if (!r) {
			r = createContract(this, address, abi, name);
		}
		return r;
	}

	/**
	 * @func sendSignTransaction(param) 对交易进行签名并发送
	 */
	sendSignTransaction(signatureData, param = {}) {
		var self = this;
		var web3 = web3Instance(self);
		var TIMEOUT_ERRNO = errno.ERR_REQUEST_TIMEOUT[0];

		return new Promise(async function(resolve, reject) {

			try {
				var blockNumber = await self.getBlockNumber();
			} catch(err) {
				reject(err);
				return;
			}

			param = param || {};

			var timeout = (Number(param.timeout) || SAFE_TRANSACTION_MAX_TIMEOUT) + Date.now();
			var block_range = Number(param.blockRange) || TRANSACTION_MAX_BLOCK_RANGE;
			var limit_block = blockNumber + block_range;
			var completed = false
			var is_check = false;
			var transactionHash = '';
			
			function complete(err, receipt) {
				if (!completed) {
					completed = true;
					err ? reject(err): resolve(receipt);
				}
			}

			async function check_receipt(hash) {
				utils.assert(hash);

				if (is_check) return;
				is_check = true;
				transactionHash = hash;

				do {
					await utils.sleep(TRANSACTION_CHECK_TIME);
					if (!completed) {
						var receipt;
						try {
							receipt = await web3.eth.getTransactionReceipt(transactionHash);
						} catch(err) {
							if (err.code != TIMEOUT_ERRNO) { // timeout
								console.error(err);
							} else {
								console.warn(err);
							}
						}
						if (receipt && receipt.blockHash) {
							complete(null, receipt);
							break;
						} else if (timeout < Date.now()) {
							complete(Error.new(errno.ERR_REQUEST_TIMEOUT));
							break;
						} else {
							try {
								var blockNumber = await self.getBlockNumber();
							} catch(err) {
								console.error(err);
							}
							if (blockNumber && blockNumber > limit_block) {
								complete(Error.new(errno.ERR_ETH_TRANSACTION_FAIL));
								break;
							}
						}
					}
				} while(!completed);
			}

			// send signed Transaction
			// event: transactionHash,receipt,confirmation
			web3.eth.sendSignedTransaction(signatureData.hex)
			.on('transactionHash', e=>check_receipt(e).catch(console.error))
			.then(e=>check_receipt(e.transactionHash).catch(console.error))
			.catch(async e=>{
				if (!completed) {
					if (transactionHash) {
						try {
							var receipt = await web3.eth.getTransactionReceipt(transactionHash);
							if (receipt && receipt.blockHash) {
								complete(null, receipt);
							}
						} catch(err) {
							if (err.code != TIMEOUT_ERRNO) {
								console.error(err);
							} else {
								console.warn(err);
							}
						}
					} else if (e.code != TIMEOUT_ERRNO) {
						complete(e);
					}
				}
			});

		});
	}

	/**
	 * @func safeTransaction(cb) 开始安全交易
	 */
	async safeTransaction(cb, account = '') {
		var self = this;

		account = account || this.defaultAccount;

		var ok = await new Monitor(1e3, 2e4).start(e=>{ // 20秒内重试20次
			// 如果上一次请求时间超过安全交易超时时间,允许发送这笔交易
			var tiem = self.m_prevSafeTransactionTime[account] || 0;
			if (tiem + SAFE_TRANSACTION_MAX_TIMEOUT < Date.now()) {
				e.stop();
				return true;
			}
		});

		utils.assert(ok, errno.ERR_PREV_TRANSACTION_NO_COMPLETE);

		var now = Date.now();

		try {
			self.m_prevSafeTransactionTime[account] = now;

			await self.beforeSafeTransaction();

			this.trigger('SignTransaction');

			var web3 = web3Instance(self);
			var nonce = await self.getNonce(account);
			var args = { web3, account, nonce };

			var result = utils.isAsync(cb) ? await cb(args) : cb(args);
			
			return result;
		} finally {
			if (now == self.m_prevSafeTransactionTime[account]) {
				self.m_prevSafeTransactionTime[account] = 0;
			}
		}
	}

	// Rewrite by method

	getDefaultAccount() {
		return this.m_default_account;
	}

	async getBlockNumber() {
		var web3 = web3Instance(this);
		var blockNumber = await Promise.race([web3.eth.getBlockNumber(), utils.sleep(1e4, -1)]);
		if (blockNumber == -1) {
			throw Error.new(errno.ERR_REQUEST_TIMEOUT);
		}
		return blockNumber;
	}

	async getNonce(account = '') {
		account = account || this.defaultAccount;
		var web3 = web3Instance(this);
		return await web3.eth.getTransactionCount(account, 'latest');
	}

	async sign(txData) {
		throw Error.new(errno.ERR_METHOD_UNREALIZED);
	}

	async beforeSafeTransaction() {
	}

};

exports.SafeWeb3 = SafeWeb3;

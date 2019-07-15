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
var { Buffer } = require('buffer');
var tx = require('./tx');
var { keccak } = require('./keccak');
var secp256k1 = require('./secp256k1');
var assert = require('./assert');
var errno = require('./errno');
var utils_2 = require('./utils');

if (utils.haveNode) {
	var crypto = require('crypto');
} else {
	var hash_js = require('hash.js');
	var browserCrypto = global.crypto || global.msCrypto || {};
	var subtle = browserCrypto.subtle || browserCrypto.webkitSubtle;
	utils.assert(subtle, `not find web crypto.subtle`);
}

var EC_GROUP_ORDER = Buffer.from(
	'fffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141', 'hex');
var ZERO32 = Buffer.alloc(32, 0);

function isValidPrivateKey(privateKey) {
	if (privateKey.length === 32) {
		return privateKey.compare(ZERO32) > 0 && // > 0
		privateKey.compare(EC_GROUP_ORDER) < 0; // < G
	}
}

// Compare two buffers in constant time to prevent timing attacks.
function equalConstTime(b1, b2) {
	if (b1.length !== b2.length) {
		return false;
	}
	var res = 0;
	for (var i = 0; i < b1.length; i++) {
		res |= b1[i] ^ b2[i];  // jshint ignore:line
	}
	return res === 0;
}

function getRandomValues(len) {
	if (crypto) { // node
		return crypto.randomBytes(len);
	} else { // web
		return new Buffer(browserCrypto.getRandomValues(new Uint8Array(len)));
	}
}

function genPrivateKey() {
	do {
		var privateKey = getRandomValues(32);
	} while (!isValidPrivateKey(privateKey));
	return privateKey;
}

function toChecksumAddress(address) {
	address = address.toString('hex');
	var addressHash = keccak(address).hex.slice(2);
	var checksumAddress = '';
	for (var i = 0; i < 40; i++) {
		checksumAddress += parseInt(addressHash[i], 16) > 7 ? 
			address[i].toUpperCase() : address[i];
	}
	return checksumAddress;
}

function publicToAddress(publicKey, fmt = 'address') {
	var address = utils_2.publicToAddress(publicKey, true);
	if (fmt == 'binary') {
		return address; // binary
	}	else {
		address = toChecksumAddress(address);
		return fmt == 'address' ? '0x' + address: address;
	}
}

function getAddress(privateKey, fmt = 'address') {
	return publicToAddress(getPublic(privateKey), fmt);
}

function getPublic(privateKey, compressed = false) {
	return secp256k1.publicKeyCreate(privateKey, compressed);
}

function sign(message, privateKey, options) {
	return secp256k1.sign(message, privateKey, options);
}

function verify(message, publicKeyTo, signature) {
	return secp256k1.sign(message, signature, publicKeyTo);
}

function recover(message, signature, recovery, compressed = true) {
	return secp256k1.recover(message, signature, recovery, compressed);
}

function ecdh(publicKeyA, privateKeyB) {
	return secp256k1.ecdh(publicKeyA, privateKeyB);
}

function sha512(msg) {
	if (crypto) {
		return crypto.createHash("sha512").update(msg).digest();
	} else {
		return new Buffer(hash_js.sha512().update(msg).digest());
	}
}

function hmacSha256(key, msg) {
	if (crypto) {
		return crypto.createHmac('sha256', key).update(msg).digest();
	} else {
		return hash_js.hmac(hash_js.sha256, key).update(msg).digest();
	}
}

function getCryptoSubtleAes(op) {
	return async function(iv, key, data) {
		assert.isBuffer(iv, 'Bad AES iv');
		assert.isBuffer(key, 'Bad AES key');
		assert.isBuffer(data, 'Bad AES data');
		var algorithm = { name: 'AES-CBC' };
		var cryptoKey = await subtle.importKey('raw', key, algorithm, false, [op]);
		var encAlgorithm = { name: 'AES-CBC', iv: iv };
		var result = await subtle[op](encAlgorithm, cryptoKey, data);
		return Buffer.from(new Uint8Array(result));
	}
}

var aes256CbcEncrypt = crypto ? async function(iv, key, plaintext) {
	var cipher = crypto.createCipheriv("aes-256-cbc", key, iv);
	var firstChunk = cipher.update(plaintext);
	var secondChunk = cipher.final();
	return Buffer.concat([firstChunk, secondChunk]);
}: getCryptoSubtleAes('encrypt');

var aes256CbcDecrypt = crypto ? async function(iv, key, ciphertext) {
	var cipher = crypto.createDecipheriv("aes-256-cbc", key, iv);
	var firstChunk = cipher.update(ciphertext);
	var secondChunk = cipher.final();
	return Buffer.concat([firstChunk, secondChunk]);
}: getCryptoSubtleAes('decrypt');

/**
 * Encrypt message for given recepient's public key.
 * @param {Buffer} publicKeyTo - Recipient's public key (65 bytes)
 * @param {Buffer} message - The message being encrypted
 * @param {?{?iv: Buffer, ?ephemPrivateKey: Buffer}} options - You may also
 * specify initialization vector (16 bytes) and ephemeral private key
 * (32 bytes) to get deterministic results.
 * @return {Promise.<Ecies>} - A promise that resolves with the ECIES
 * structure on successful encryption and rejects on failure.
 */
async function encryptECIES(publicKeyTo, message, options) {
	options = options || {};
	// Tmp variable to save context from flat promises;
	var ephemPrivateKey = options.ephemPrivateKey || genPrivateKey();
	assert(isValidPrivateKey(ephemPrivateKey), 'Bad private key invalid');

	var ephemPublicKey = getPublic(ephemPrivateKey);
	var px = ecdh(publicKeyTo, ephemPrivateKey);
	var hash = sha512(px);
	var iv = options.iv ? utils_2.toBuffer(options.iv): getRandomValues(16);

	assert.isBufferLength(iv, 16, 'Bad iv length Must 128 bit');

	var encryptionKey = hash.slice(0, 32);
	var macKey = hash.slice(32);
	var ciphertext = await aes256CbcEncrypt(iv, encryptionKey, message);
	var dataToMac = Buffer.concat([iv, ephemPublicKey, ciphertext]);
	var mac = Buffer.from(hmacSha256(macKey, dataToMac));
	return {
		iv: iv,
		ephemPublicKey: ephemPublicKey,
		ciphertext: ciphertext,
		mac: mac,
	};
}

/**
 * Decrypt message using given private key.
 * @param {Buffer} privateKey - A 32-byte private key of recepient of
 * the mesage
 * @param {Ecies} options - ECIES structure (result of ECIES encryption)
 * @return {Promise.<Buffer>} - A promise that resolves with the
 * plaintext on successful decryption and rejects on failure.
 */
async function decryptECIES(privateKey, options) {
	assert.isBuffer(privateKey, 'Bad private key');
	assert.isBufferLength(privateKey, 32, 'Bad private key length');
	assert(isValidPrivateKey(privateKey), 'Bad private key invalid');

	var px = ecdh(options.ephemPublicKey, privateKey);
	var hash = sha512(px);
	var encryptionKey = hash.slice(0, 32);
	var macKey = hash.slice(32);
	var iv = utils_2.toBuffer(options.iv);

	assert.isBufferLength(iv, 16, 'Bad iv length Must 128 bit');

	if (options.mac) {
		var dataToMac = Buffer.concat([
			iv,
			options.ephemPublicKey,
			options.ciphertext
		]);
		var realMac = hmacSha256(macKey, dataToMac);
		assert(equalConstTime(options.mac, realMac), 'Bad MAC');
	}

	var result = await aes256CbcDecrypt(iv, encryptionKey, options.ciphertext);

	return result;
}

function publicKeyConvertDetails(public_key) {
	public_key = utils_2.toBuffer(public_key);
	var publicKeyLong = secp256k1.publicKeyConvert(public_key, false);
	var publicKey = secp256k1.publicKeyConvert(publicKeyLong);
	var address = publicToAddress(publicKeyLong, 'binary');
	var publicKeyHex = publicKey.toString('hex');
	var publicKeyLongHex = publicKeyLong.toString('hex');
	var addressHex = toChecksumAddress(address);
	return {
		publicKeyBytes: publicKey,
		publicKeyLongBytes: publicKeyLong,
		addressBytes: address,
		publicKey: '0x' + publicKeyHex,
		publicKeyLong: '0x' + publicKeyLongHex,
		address: '0x' + addressHex,
		publicKeyHex: publicKeyHex,
		publicKeyLongHex: publicKeyLongHex,
		addressHex: addressHex,
	};
}

module.exports = Object.assign({
	genPrivateKey,
	getPublic,
	publicToAddress,
	getAddress,
	toChecksumAddress,
	secp256k1,
	publicKeyConvert: secp256k1.publicKeyConvert,
	toBuffer: utils_2.toBuffer,
	sign,
	verify,
	recover,
	ecdh,
	aes256CbcEncrypt,
	aes256CbcDecrypt,
	getRandomValues,
	encryptECIES,
	decryptECIES,
	assert,
	keccak,
	publicKeyConvertDetails,
}, tx);
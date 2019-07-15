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

'use strict'

var assert = require('../assert');
var der = require('./der');
var errno = require('../errno');

function initCompressedValue (value, defaultValue) {
	if (value === undefined)
		return defaultValue;
	assert.isBoolean(value, errno.COMPRESSED_TYPE_INVALID);
	return value;
}

function seafSecp256k1(secp256k1) {
	return {
		privateKeyVerify: function (privateKey) {
			assert.isBuffer(privateKey, errno.EC_PRIVATE_KEY_TYPE_INVALID)
			return privateKey.length === 32 && secp256k1.privateKeyVerify(privateKey)
		},

		privateKeyExport: function (privateKey, compressed) {
			assert.isBuffer(privateKey, errno.EC_PRIVATE_KEY_TYPE_INVALID)
			assert.isBufferLength(privateKey, 32, errno.EC_PRIVATE_KEY_LENGTH_INVALID)

			compressed = initCompressedValue(compressed, true)
			var publicKey = secp256k1.privateKeyExport(privateKey, compressed)

			return der.privateKeyExport(privateKey, publicKey, compressed)
		},

		privateKeyImport: function (privateKey) {
			assert.isBuffer(privateKey, errno.EC_PRIVATE_KEY_TYPE_INVALID)

			privateKey = der.privateKeyImport(privateKey)
			if (privateKey && privateKey.length === 32 && secp256k1.privateKeyVerify(privateKey)) return privateKey

			throw new Error(errno.EC_PRIVATE_KEY_IMPORT_DER_FAIL)
		},

		privateKeyNegate: function (privateKey) {
			assert.isBuffer(privateKey, errno.EC_PRIVATE_KEY_TYPE_INVALID)
			assert.isBufferLength(privateKey, 32, errno.EC_PRIVATE_KEY_LENGTH_INVALID)

			return secp256k1.privateKeyNegate(privateKey)
		},

		privateKeyModInverse: function (privateKey) {
			assert.isBuffer(privateKey, errno.EC_PRIVATE_KEY_TYPE_INVALID)
			assert.isBufferLength(privateKey, 32, errno.EC_PRIVATE_KEY_LENGTH_INVALID)

			return secp256k1.privateKeyModInverse(privateKey)
		},

		privateKeyTweakAdd: function (privateKey, tweak) {
			assert.isBuffer(privateKey, errno.EC_PRIVATE_KEY_TYPE_INVALID)
			assert.isBufferLength(privateKey, 32, errno.EC_PRIVATE_KEY_LENGTH_INVALID)

			assert.isBuffer(tweak, errno.TWEAK_TYPE_INVALID)
			assert.isBufferLength(tweak, 32, errno.TWEAK_LENGTH_INVALID)

			return secp256k1.privateKeyTweakAdd(privateKey, tweak)
		},

		privateKeyTweakMul: function (privateKey, tweak) {
			assert.isBuffer(privateKey, errno.EC_PRIVATE_KEY_TYPE_INVALID)
			assert.isBufferLength(privateKey, 32, errno.EC_PRIVATE_KEY_LENGTH_INVALID)

			assert.isBuffer(tweak, errno.TWEAK_TYPE_INVALID)
			assert.isBufferLength(tweak, 32, errno.TWEAK_LENGTH_INVALID)

			return secp256k1.privateKeyTweakMul(privateKey, tweak)
		},

		publicKeyCreate: function (privateKey, compressed) {
			assert.isBuffer(privateKey, errno.EC_PRIVATE_KEY_TYPE_INVALID)
			assert.isBufferLength(privateKey, 32, errno.EC_PRIVATE_KEY_LENGTH_INVALID)

			compressed = initCompressedValue(compressed, true)

			return secp256k1.publicKeyCreate(privateKey, compressed)
		},

		publicKeyConvert: function (publicKey, compressed) {
			assert.isBuffer(publicKey, errno.EC_PUBLIC_KEY_TYPE_INVALID)
			assert.isBufferLength2(publicKey, 33, 65, errno.EC_PUBLIC_KEY_LENGTH_INVALID)

			compressed = initCompressedValue(compressed, true)

			return secp256k1.publicKeyConvert(publicKey, compressed)
		},

		publicKeyVerify: function (publicKey) {
			assert.isBuffer(publicKey, errno.EC_PUBLIC_KEY_TYPE_INVALID)
			return secp256k1.publicKeyVerify(publicKey)
		},

		publicKeyTweakAdd: function (publicKey, tweak, compressed) {
			assert.isBuffer(publicKey, errno.EC_PUBLIC_KEY_TYPE_INVALID)
			assert.isBufferLength2(publicKey, 33, 65, errno.EC_PUBLIC_KEY_LENGTH_INVALID)

			assert.isBuffer(tweak, errno.TWEAK_TYPE_INVALID)
			assert.isBufferLength(tweak, 32, errno.TWEAK_LENGTH_INVALID)

			compressed = initCompressedValue(compressed, true)

			return secp256k1.publicKeyTweakAdd(publicKey, tweak, compressed)
		},

		publicKeyTweakMul: function (publicKey, tweak, compressed) {
			assert.isBuffer(publicKey, errno.EC_PUBLIC_KEY_TYPE_INVALID)
			assert.isBufferLength2(publicKey, 33, 65, errno.EC_PUBLIC_KEY_LENGTH_INVALID)

			assert.isBuffer(tweak, errno.TWEAK_TYPE_INVALID)
			assert.isBufferLength(tweak, 32, errno.TWEAK_LENGTH_INVALID)

			compressed = initCompressedValue(compressed, true)

			return secp256k1.publicKeyTweakMul(publicKey, tweak, compressed)
		},

		publicKeyCombine: function (publicKeys, compressed) {
			assert.isArray(publicKeys, errno.EC_PUBLIC_KEYS_TYPE_INVALID)
			assert.isLengthGTZero(publicKeys, errno.EC_PUBLIC_KEYS_LENGTH_INVALID)
			for (var i = 0; i < publicKeys.length; ++i) {
				assert.isBuffer(publicKeys[i], errno.EC_PUBLIC_KEY_TYPE_INVALID)
				assert.isBufferLength2(publicKeys[i], 33, 65, errno.EC_PUBLIC_KEY_LENGTH_INVALID)
			}

			compressed = initCompressedValue(compressed, true)

			return secp256k1.publicKeyCombine(publicKeys, compressed)
		},

		signatureNormalize: function (signature) {
			assert.isBuffer(signature, errno.ECDSA_SIGNATURE_TYPE_INVALID)
			assert.isBufferLength(signature, 64, errno.ECDSA_SIGNATURE_LENGTH_INVALID)

			return secp256k1.signatureNormalize(signature)
		},

		signatureExport: function (signature) {
			assert.isBuffer(signature, errno.ECDSA_SIGNATURE_TYPE_INVALID)
			assert.isBufferLength(signature, 64, errno.ECDSA_SIGNATURE_LENGTH_INVALID)

			var sigObj = secp256k1.signatureExport(signature)
			return der.signatureExport(sigObj)
		},

		signatureImport: function (sig) {
			assert.isBuffer(sig, errno.ECDSA_SIGNATURE_TYPE_INVALID)
			assert.isLengthGTZero(sig, errno.ECDSA_SIGNATURE_LENGTH_INVALID)

			var sigObj = der.signatureImport(sig)
			if (sigObj) return secp256k1.signatureImport(sigObj)

			throw new Error(errno.ECDSA_SIGNATURE_PARSE_DER_FAIL)
		},

		signatureImportLax: function (sig) {
			assert.isBuffer(sig, errno.ECDSA_SIGNATURE_TYPE_INVALID)
			assert.isLengthGTZero(sig, errno.ECDSA_SIGNATURE_LENGTH_INVALID)

			var sigObj = der.signatureImportLax(sig)
			if (sigObj) return secp256k1.signatureImport(sigObj)

			throw new Error(errno.ECDSA_SIGNATURE_PARSE_DER_FAIL)
		},

		sign: function (message, privateKey, options) {
			assert.isBuffer(message, errno.MSG32_TYPE_INVALID)
			assert.isBufferLength(message, 32, errno.MSG32_LENGTH_INVALID)

			assert.isBuffer(privateKey, errno.EC_PRIVATE_KEY_TYPE_INVALID)
			assert.isBufferLength(privateKey, 32, errno.EC_PRIVATE_KEY_LENGTH_INVALID)

			var data = null
			var noncefn = null
			if (options !== undefined) {
				assert.isObject(options, errno.OPTIONS_TYPE_INVALID)

				if (options.data !== undefined) {
					assert.isBuffer(options.data, errno.OPTIONS_DATA_TYPE_INVALID)
					assert.isBufferLength(options.data, 32, errno.OPTIONS_DATA_LENGTH_INVALID)
					data = options.data
				}

				if (options.noncefn !== undefined) {
					assert.isFunction(options.noncefn, errno.OPTIONS_NONCEFN_TYPE_INVALID)
					noncefn = options.noncefn
				}
			}

			return secp256k1.sign(message, privateKey, noncefn, data)
		},

		verify: function (message, signature, publicKey) {
			assert.isBuffer(message, errno.MSG32_TYPE_INVALID)
			assert.isBufferLength(message, 32, errno.MSG32_LENGTH_INVALID)

			assert.isBuffer(signature, errno.ECDSA_SIGNATURE_TYPE_INVALID)
			assert.isBufferLength(signature, 64, errno.ECDSA_SIGNATURE_LENGTH_INVALID)

			assert.isBuffer(publicKey, errno.EC_PUBLIC_KEY_TYPE_INVALID)
			assert.isBufferLength2(publicKey, 33, 65, errno.EC_PUBLIC_KEY_LENGTH_INVALID)

			return secp256k1.verify(message, signature, publicKey)
		},

		recover: function (message, signature, recovery, compressed) {
			assert.isBuffer(message, errno.MSG32_TYPE_INVALID)
			assert.isBufferLength(message, 32, errno.MSG32_LENGTH_INVALID)

			assert.isBuffer(signature, errno.ECDSA_SIGNATURE_TYPE_INVALID)
			assert.isBufferLength(signature, 64, errno.ECDSA_SIGNATURE_LENGTH_INVALID)

			assert.isNumber(recovery, errno.RECOVERY_ID_TYPE_INVALID)
			assert.isNumberInInterval(recovery, -1, 4, errno.RECOVERY_ID_VALUE_INVALID)

			compressed = initCompressedValue(compressed, true)

			return secp256k1.recover(message, signature, recovery, compressed)
		},

		ecdh: function (publicKey, privateKey) {
			assert.isBuffer(publicKey, errno.EC_PUBLIC_KEY_TYPE_INVALID)
			assert.isBufferLength2(publicKey, 33, 65, errno.EC_PUBLIC_KEY_LENGTH_INVALID)

			assert.isBuffer(privateKey, errno.EC_PRIVATE_KEY_TYPE_INVALID)
			assert.isBufferLength(privateKey, 32, errno.EC_PRIVATE_KEY_LENGTH_INVALID)

			return secp256k1.ecdh(publicKey, privateKey)
		},

		ecdhUnsafe: function (publicKey, privateKey, compressed) {
			assert.isBuffer(publicKey, errno.EC_PUBLIC_KEY_TYPE_INVALID)
			assert.isBufferLength2(publicKey, 33, 65, errno.EC_PUBLIC_KEY_LENGTH_INVALID)

			assert.isBuffer(privateKey, errno.EC_PRIVATE_KEY_TYPE_INVALID)
			assert.isBufferLength(privateKey, 32, errno.EC_PRIVATE_KEY_LENGTH_INVALID)

			compressed = initCompressedValue(compressed, true)

			return secp256k1.ecdhUnsafe(publicKey, privateKey, compressed)
		}
	}
}

module.exports = seafSecp256k1(require('./elliptic'));

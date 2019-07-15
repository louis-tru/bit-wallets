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

module.exports = {
	"COMPRESSED_TYPE_INVALID": "compressed should be a boolean",
	"EC_PRIVATE_KEY_TYPE_INVALID": "private key should be a Buffer",
	"EC_PRIVATE_KEY_LENGTH_INVALID": "private key length is invalid",
	"EC_PRIVATE_KEY_RANGE_INVALID": "private key range is invalid",
	"EC_PRIVATE_KEY_TWEAK_ADD_FAIL": "tweak out of range or resulting private key is invalid",
	"EC_PRIVATE_KEY_TWEAK_MUL_FAIL": "tweak out of range",
	"EC_PRIVATE_KEY_EXPORT_DER_FAIL": "couldn't export to DER format",
	"EC_PRIVATE_KEY_IMPORT_DER_FAIL": "couldn't import from DER format",
	"EC_PUBLIC_KEYS_TYPE_INVALID": "public keys should be an Array",
	"EC_PUBLIC_KEYS_LENGTH_INVALID": "public keys Array should have at least 1 element",
	"EC_PUBLIC_KEY_TYPE_INVALID": "public key should be a Buffer",
	"EC_PUBLIC_KEY_LENGTH_INVALID": "public key length is invalid",
	"EC_PUBLIC_KEY_PARSE_FAIL": "the public key could not be parsed or is invalid",
	"EC_PUBLIC_KEY_CREATE_FAIL": "private was invalid, try again",
	"EC_PUBLIC_KEY_TWEAK_ADD_FAIL": "tweak out of range or resulting public key is invalid",
	"EC_PUBLIC_KEY_TWEAK_MUL_FAIL": "tweak out of range",
	"EC_PUBLIC_KEY_COMBINE_FAIL": "the sum of the public keys is not valid",
	"ECDH_FAIL": "scalar was invalid (zero or overflow)",
	"ECDSA_SIGNATURE_TYPE_INVALID": "signature should be a Buffer",
	"ECDSA_SIGNATURE_LENGTH_INVALID": "signature length is invalid",
	"ECDSA_SIGNATURE_PARSE_FAIL": "couldn't parse signature",
	"ECDSA_SIGNATURE_PARSE_DER_FAIL": "couldn't parse DER signature",
	"ECDSA_SIGNATURE_SERIALIZE_DER_FAIL": "couldn't serialize signature to DER format",
	"ECDSA_SIGN_FAIL": "nonce generation function failed or private key is invalid",
	"ECDSA_RECOVER_FAIL": "couldn't recover public key from signature",
	"MSG32_TYPE_INVALID": "message should be a Buffer",
	"MSG32_LENGTH_INVALID": "message length is invalid",
	"OPTIONS_TYPE_INVALID": "options should be an Object",
	"OPTIONS_DATA_TYPE_INVALID": "options.data should be a Buffer",
	"OPTIONS_DATA_LENGTH_INVALID": "options.data length is invalid",
	"OPTIONS_NONCEFN_TYPE_INVALID": "options.noncefn should be a Function",
	"RECOVERY_ID_TYPE_INVALID": "recovery should be a Number",
	"RECOVERY_ID_VALUE_INVALID": "recovery should have value between -1 and 4",
	"TWEAK_TYPE_INVALID": "tweak should be a Buffer",
	"TWEAK_LENGTH_INVALID": "tweak length is invalid"
};

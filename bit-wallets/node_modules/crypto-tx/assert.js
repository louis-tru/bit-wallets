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

'use strict';

var Buffer = require('buffer').Buffer;

var toString = Object.prototype.toString;

function assert(value, message) {
	if (!value) throw Error(message);
}

module.exports = assert;

// TypeError
assert.isArray = function (value, message) {
	if (!Array.isArray(value)) throw TypeError(message)
}

assert.isBoolean = function (value, message) {
	if (toString.call(value) !== '[object Boolean]') throw TypeError(message)
}

assert.isBuffer = function (value, message) {
	if (!Buffer.isBuffer(value)) throw TypeError(message)
}

assert.isFunction = function (value, message) {
	if (toString.call(value) !== '[object Function]') throw TypeError(message)
}

assert.isNumber = function (value, message) {
	if (toString.call(value) !== '[object Number]') throw TypeError(message)
}

assert.isObject = function (value, message) {
	if (toString.call(value) !== '[object Object]') throw TypeError(message)
}

// RangeError
assert.isBufferLength = function (buffer, length, message) {
	if (buffer.length !== length) throw RangeError(message)
}

assert.isBufferLength2 = function (buffer, length1, length2, message) {
	if (buffer.length !== length1 && buffer.length !== length2) throw RangeError(message)
}

assert.isLengthGTZero = function (value, message) {
	if (value.length === 0) throw RangeError(message)
}

assert.isNumberInInterval = function (number, x, y, message) {
	if (number <= x || number >= y) throw RangeError(message)
}

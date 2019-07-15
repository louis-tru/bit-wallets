#!/usr/bin/env node
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

var crypto = require('./index');
var assert = require('./assert');
var arguments = require('langoukit/arguments');
var toBuffer = require('./utils').toBuffer;
var opts = arguments.options;
var help_info = arguments.helpInfo;
var def_opts = arguments.defOpts;

// def_opts(['help', 'h'], 0,   '-h   print help info');
def_opts(['E'],         0,   '-E   cmd encryptECIES [{0}]');
def_opts(['D'],         0,   '-D   cmd decryptECIES [{0}]');
def_opts(['G'],         0,   '-G   cmd gen private and public keys [{0}]');
def_opts(['C'],         0,   '-C   cmd public key convert [{0}]');
def_opts(['k'],         '',  '-k   privateKey hex');
def_opts(['p'],         '',  '-p   publicKey hex');
def_opts(['d'],         '',  '-d   encrypt or decrypt data');
def_opts(['iv'],        '',  '-iv  IV 16 bytes hex');
def_opts(['json'],       0,  '-json convert json [{0}]');

function printHelp(code = -1) {
	process.stdout.write('Usage:\n');
	process.stdout.write('  crypto-tx -G [-json]\n');
	process.stdout.write('  crypto-tx -C -p publicKey \n');
	process.stdout.write(
		'  crypto-tx -E '+
		'[-k privateKey] -p publicKeyTo -d originaltext [-iv value] [-json] \n');
	process.stdout.write(
		'  crypto-tx -D '+
		'-k privateKey -p ephemPublicKey -d ciphertext -iv value \n');
	process.stdout.write('Options:\n');
	process.stdout.write('  ' + help_info.join('\n  ') + '\n');
	process.exit(code);
}

async function encrypt() {
	if (!opts.p || !opts.d)
		printHelp();

	var privateKey = opts.k ? toBuffer(opts.k): crypto.genPrivateKey();
	var publicKey = crypto.getPublic(privateKey);
	var publicKeyTo = toBuffer(opts.p);
	var originaltext = toBuffer(opts.d);
	// console.log('opts.iv', !!opts.iv)
	var iv = opts.iv ? toBuffer(opts.iv): crypto.getRandomValues(16);

	assert.isBufferLength(privateKey, 32, 'Bad privateKey length');
	assert.isBufferLength2(publicKeyTo, 33, 65, 'Bad ephemPublicKey length');
	assert.isBufferLength(iv, 16, 'Bad iv length Must 128 bit');

	var { mac, ciphertext, iv } = await crypto.encryptECIES(publicKeyTo, originaltext, {
		iv, ephemPrivateKey: privateKey, 
	});

	var result = {
		ciphertext: '0x' + ciphertext.toString('hex'),
		ephemPublicKey: '0x' + publicKey.toString('hex'),
		iv: '0x' + Buffer.from(iv).toString('hex'),
		mac: '0x' + mac.toString('hex'),
	};

	if (opts.json) {
		console.log(JSON.stringify(result));
	} else {
		console.log('ciphertext:', result.ciphertext);
		console.log('ephemPublicKey:', result.ephemPublicKey);
		console.log('iv:', result.iv);
		console.log('mac:', result.mac);
	}
}

async function decrypt() {
	if (!opts.p || !opts.d || !opts.k || !opts.iv)
		printHelp();

	var privateKey = toBuffer(opts.k);
	var ephemPublicKey = toBuffer(opts.p);
	var ciphertext = toBuffer(opts.d);
	var iv = toBuffer(opts.iv);

	assert.isBufferLength(privateKey, 32, 'Bad privateKey length');
	assert.isBufferLength2(ephemPublicKey, 33, 65, 'Bad ephemPublicKey length');
	assert.isBufferLength(iv, 16, 'Bad iv length Must 128 bit');

	var r = await crypto.decryptECIES(privateKey, {
		ephemPublicKey, ciphertext, iv,
	});

	console.log('0x' + r.toString('hex'));
}

async function main() {

	if (opts.E) {
		await encrypt();
	} else if (opts.D) {
		await decrypt();
	} else if (opts.G) {
		if (opts.k) {
			var privateKey = toBuffer(opts.k);
			assert.isBufferLength(privateKey, 32, 'Bad privateKey length');
		} else {
			var privateKey = crypto.genPrivateKey();
		}
		var publicKey_0 = crypto.getPublic(privateKey);
		var publicKey_1 = crypto.getPublic(privateKey, true);
		var result = {
			privateKey: '0x' + privateKey.toString('hex'),
			publicKey: '0x' + publicKey_0.toString('hex'),
			publicKey1: '0x' + publicKey_1.toString('hex'),
			address: crypto.publicToAddress(publicKey_0),
		};
		if (opts.json) {
			console.log(JSON.stringify(result));
		} else {
			console.log('privateKey:', result.privateKey);
			console.log('publicKey:', result.publicKey);
			console.log('publicKey1:', result.publicKey1);
			console.log('address:', result.address);
		}
	} else if (opts.C) {
		if (!opts.p)
			printHelp(0);

		var public_key = toBuffer(opts.p);
		var public_key_0 = crypto.publicKeyConvert(public_key);
		var public_key_1 = crypto.publicKeyConvert(public_key, false);

		console.log('publicKey:', '0x' + public_key_0.toString('hex'));
		console.log('publicKeyLong:', '0x' + public_key_1.toString('hex'));
	} else {
		printHelp(0);
	}
}

main().catch(console.error);
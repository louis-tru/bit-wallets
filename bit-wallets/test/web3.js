/* ***** BEGIN LICENSE BLOCK *****
 * Distributed under the BSD license:
 *
 * Copyright (c) 2019, xuewen.chu
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

import { SafeWeb3 } from 'safe-tx';
import 'crypto-tx';


class MyWeb3 extends SafeWeb3 {

	async sign(txData) {
		throw Error.new('Error');
	}
}

// var web3 = new Web3('ws://192.168.0.96:38546');
var safeWeb3 = new MyWeb3('http://192.168.1.200:38545');

async function test() { // debugger
	var web3 = safeWeb3.core;

	var privateKey = '7d7610b222bc016629dc268c8720edf82da5ecd00e96591796873509ef91db2baa';
	var publicKey = web3.eth.accounts.privateKeyToAccount(privateKey);
	// var publicKey = web3_utils.toChecksumAddress(publicKey.address);
	// var ascii = web3_utils.toAscii('0x657468657265756d000000000000000000000000000000000000000000000000');
	// var hash = web3_utils.sha3("Some string to be hashed");
	// var hashOfHash = web3_utils.sha3(hash, { encoding: 'hex' });

	var isListening = await web3.eth.net.isListening();
	var getNetworkType = await web3.eth.net.getNetworkType();
	var getPeerCount = await web3.eth.net.getPeerCount();
	var getId = await web3.eth.net.getId();

	var node = await web3.eth.getNodeInfo();
	var version = web3.version;
	var currentProvider = web3.currentProvider;

	// 合约创建者
	// var owner_account = web3_utils.toChecksumAddress('0x073f20292c73dc8f3b144ef28519d179464c5bf8');
	// var account = device.getAccountPublicKey(); 
	// web3.eth.defaultAccount = account;
	var mining = await web3.eth.isMining();
	var hashrate = await web3.eth.getHashrate();
	var gasPrice = await web3.eth.getGasPrice();
	// var ownerAccountBalance = await web3.eth.getBalance(owner_account);
	// var accountBalance = await web3.eth.getBalance(account);
	var accounts = await web3.eth.getAccounts();
	// var code = await web3.eth.getCode(account);
	// var Eth = await eth.web3.eth.getBalance(account);

	// query transaction receipts
	var blockNumber = await web3.eth.getBlockNumber();

	console.log(blockNumber);

	alert(blockNumber);
}


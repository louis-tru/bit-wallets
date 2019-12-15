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

import 'ngui/util';
import 'ngui/font';
import 'ngui/reader';
import { GUIApplication, Root } from 'ngui';
import { NavPageCollection } from 'ngui/nav';
import Index from './pages/index';
import WalletDetails from './pages/wallet_details';
import password_prompt from './pages/password_prompt';

import './cn';
import './common';

import Test from './pages/test';

new GUIApplication({
	multisample: 4,
	width: 375,
	height: 700,
	fullScreen: util.options.full_screen || 0,
	enableTouch: 1,
	background: 0xffffff,
	title: 'BITWallets',
}).start(
	<Root>
		<NavPageCollection id="nav">
			<Index />
			{/* <Test toolbar.hidden=true title="Test" /> */}
			{/* <WalletDetails toolbar.hidden=true title="ETH-Wallet" /> */}
			{/* <password_prompt prompt="123456" /> */}
		</NavPageCollection>
	</Root>
);

font.registerFont( reader.readFileSync(require.resolve('./icomoon.ttf')) );

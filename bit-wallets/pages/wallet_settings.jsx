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

import {
	CSS, atomPixel as px,
	Div, Text, Image, Button, Indep, 
} from 'ngui';
import {NavPage} from 'ngui/nav';
import {NavBtn} from '../btns';

var {resolve} = require;

CSS({
	'.ws': {
		width: '100%',
		height: '100%',
		// backgroundColor: '#f3f4f6',
	},
	'.ws .btn': {
		textSize: 14,
		textStyle: 'bold',
		textColor: '#f00',
		width: '100%',
		textLineHeight: 50,
	},
	'.ws .btn:normal': {
		backgroundColor: '#fff0', time: 50
	},
	'.ws .btn:hover': {
		backgroundColor: '#ececec', time: 50
	},
	'.ws .btn:down': {
		backgroundColor: '#E1E4E4', time: 50
	},
});

/**
 * @class WalletSettings
 */
export default class WalletSettings extends NavPage {

	constructor() {
		super();
		this.title = '设置';
		this.toolbar.hidden = true;
	}

	render() {
		return super.render(
			<Div class="ws">
				<Div class="G_nav_space" />
				<NavBtn big=1 icon=(resolve('../img/BTC-128.png')) onClick="m_handle_click" text="啊啊啊啊" desc="0x2afC7D19...DBd7354Cd9" />
				<Div class="G_nav_space" />
				<NavBtn small=1 icon=(resolve('../img/BTC-128.png')) onClick="m_handle_click" text="密码提示信息" />
				<NavBtn small=1 icon=(resolve('../img/BTC-128.png')) onClick="m_handle_click" text="免密支付" />
				<NavBtn small=1 icon=(resolve('../img/BTC-128.png')) onClick="m_handle_click" text="导出助记词" />
				<NavBtn small=1 icon=(resolve('../img/BTC-128.png')) onClick="m_handle_click" text="导出Keystore" />
				<NavBtn small=1 icon=(resolve('../img/BTC-128.png')) onClick="m_handle_click" text="导出私钥" />
				<Div class="G_nav_space" />
				<Button class="btn" onClick="m_handle_click_1">删除钱包</Button>
				<Div class="G_nav_space" />
			</Div>
		);
	}

	m_handle_click() {

	}
	
	m_handle_click_1() {

	}

}

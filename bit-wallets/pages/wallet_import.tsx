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

import { Hybrid, Button, 
	TextNode, Text, Div, 
	Textarea, Input, default as ngui, _CVD
} from 'ngui';
import { NavPage, Toolbar } from 'ngui/nav';
import { alert } from 'ngui/dialog';
import Tabs, {TabPanel} from '../tabs';
import { Btn } from '../btns';
import {prop} from 'ngui/ctr';
import {Event} from 'ngui/event';

const px = ngui.atomPixel;

ngui.css({
	'.wi': {
		width: "100%",
	},
	'.wi .desc': {
		width: "100%",
		// height: 80,
		backgroundColor: "#fafbfd",
		borderBottom: `${px} #d2d2d2`,
	},
	'.wi .desc .txt': {
		margin:20,
		textSize:12,
		textColor: '#576772',
		textLineHeight: 20,
		// textBackgroundColor: '#f00',
		width:"full",
	},
	'.wi .box1': {
		width: '100%',
	},
	'.wi .box1 .div': {
		margin: 20,
		marginBottom: 5,
		width:"full",
		border: `${px} #e0e0e0`,
		borderRadius: 4,
	},
	'.wi .box1 .in1': {
		margin: '5 0',
		width: "full",
		textSize: 14,
		textColor: '#333',
		textLineHeight: 20,
	},
	'.wi .box1 .div2': {
		width: "full",
		height: 45,
		margin: '0 20',
		borderBottom: `${px} #e0e0e0`,
		// backgroundColor: '#f00',
	},
	'.wi .box1 .in2': {
		width: "30!",
		height: '100%',
		textSize: 14,
		textColor: '#333',
		// backgroundColor: '#f0f',
	},
	'.wi .box1 .div2 .btn': {
		textFamily: 'icomoon-ultimate',
		textAlign: 'center',
		width: 30,
		height: 30,
		// backgroundColor: '#00f',
		textSize: 20,
		marginTop: 7,
		textColor: "#999",
	},
	'.wi .box1 .item': {
		margin: '15 20 0 20',
		width: 'full',
		// backgroundColor: '#f0f',
		height: 30,
	},
	'.wi .box1 .item .txt': {
		textColor: '#000',
		textLineHeight: 30,
		textSize: 14,
	},
	'.wi .btn_p': {
		margin: "20 10",
		width: "full",
	},
	'.wi .btn_0': {
		textFamily: "icomoon-ultimate",
		// backgroundColor: "#f00",
		textLineHeight: 30,
		width: 30,
		textAlign: "center",
		textColor: "#c2c7cb",
	},
});

// Keystore
class Keystore extends TabPanel {

	@prop showPw = false;

	render() {
		return super.render(
			<Div class="wi">
				<Div class="desc">
					<Text class="txt" value="复制粘贴以太坊官方钱包Keystore文件内容至输入框，或通过扫描Keystore内容生成的二维码录入。"/>
				</Div>
				<Div class="box1">
					<Div class="div">
						<Textarea class="in1" height={110} placeholder="Keystore 文件内容" />
					</Div>
					<Div class="div2">
						<Input class="in2" textMargin={0} security={!this.showPw} placeholder="钱包密码" />
						<Button class="btn" onClick="m_handle_click1">{this.showPw?'\uecb1':'\uecb2'}</Button>
					</Div>
				</Div>
				<Div class="btn_p">
					<Btn onClick="m_handle_click2">开始导入</Btn>
				</Div>
			</Div>
		);
	}
	private m_handle_click1() {
		this.showPw = !this.showPw;
	}
	private m_handle_click2() {
		// TODO ...
		alert('导入');
	}
}

// 助记词
class Auxiliaries extends TabPanel {
	@prop showPw = false;
	render() {
		return super.render(
			<Div class="wi">
				<Div class="desc">
					<Text class="txt" value="使用助记词导入的同时可以修改钱包密码。"/>
				</Div>
				<Div class="box1">
					<Div class="div">
						<Textarea class="in1" height={95} placeholder="输入助记词，用空格分隔" />
					</Div>
					<Div class="item">
						<Text class="txt" value="设置密码" />
						<Button class="btn_0" onClick="m_handle_click3">\ued63</Button>
					</Div>
					<Div class="div2">
						<Input class="in2" textMargin={0} security={!this.showPw} placeholder="钱包密码" />
					</Div>
					<Div class="div2">
						<Input class="in2" textMargin={0} security={!this.showPw} placeholder="重复输入密码" />
						<Button class="btn" onClick="m_handle_click1">{this.showPw?'\uecb1':'\uecb2'}</Button>
					</Div>
					<Div class="div2">
						<Input class="in2" textMargin={0} placeholder="密码提示信" />
					</Div>
				</Div>
				<Div class="btn_p">
					<Btn onClick="m_handle_click2">开始导入</Btn>
				</Div>
			</Div>
		);
	}
	private m_handle_click1() {
		this.showPw = !this.showPw;
	}
	private m_handle_click2() {
		// TODO ...
		alert('导入');
	}
	private m_handle_click3() {
		alert({title:'设置密码说明', msg:'如果要在导入的同时修改钱包密码，请在输入框内重复输入新密码，旧密码将在导入钱包后失效。'});
	}
}

// 私钥
class PrivateKey extends TabPanel {
	@prop showPw = false;
	render() {
		return super.render(
			<Div class="wi">
				<Div class="desc">
					<Text class="txt" value="输入 Private Key 文件内容至输入框。或通过扫描 Private Key 内容生成的二维码录入。请留意字符大小写。"/>
				</Div>
				<Div class="box1">
					<Div class="div">
						<Textarea class="in1" height={95} placeholder="输入明文私钥" />
					</Div>
					<Div class="item">
						<Text class="txt" value="设置密码" />
						<Button class="btn_0" onClick="m_handle_click3">\ued63</Button>
					</Div>
					<Div class="div2">
						<Input class="in2" textMargin={0} security={!this.showPw} placeholder="钱包密码" />
					</Div>
					<Div class="div2">
						<Input class="in2" textMargin={0} security={!this.showPw} placeholder="重复输入密码" />
						<Button class="btn" onClick="m_handle_click1">{this.showPw?'\uecb1':'\uecb2'}</Button>
					</Div>
					<Div class="div2">
						<Input class="in2" textMargin={0} placeholder="密码提示信" />
					</Div>
				</Div>
				<Div class="btn_p">
					<Btn onClick="m_handle_click2">开始导入</Btn>
				</Div>
			</Div>
		);
	}
	private m_handle_click1() {
		this.showPw = !this.showPw;
	}
	private m_handle_click2() {
		// TODO ...
		alert('导入');
	}
	private m_handle_click3() {
		alert({title:'设置密码说明', msg:'如果要在导入的同时修改钱包密码，请在输入框内重复输入新密码，旧密码将在导入钱包后失效。'});
	}
}

/**
 * @class Import
 */
export default class Import extends NavPage {
	@prop type = 0;
	constructor() {
		super();
		this.toolbar = (
			<Toolbar>
				<Hybrid textAlign="center" width="100%" height="100%">
					<Button
						height={22} 
						margin="auto"
						textSize={14} 
						textColor="#0079ff"
						onClick={()=>this.m_handle_click_1()}
					><TextNode id="txt" value="了解Keystore" /></Button>
				</Hybrid>
			</Toolbar>
		);
	}
	render() {
		return super.render(
			<Tabs id="tabs" onSwitch="m_handle_switch">
				<Keystore title="Keystore" />
				<Auxiliaries title="助记词" />
				<PrivateKey title="私钥" />
			</Tabs>
		);
	}
	private m_handle_click_1() {
		var tab = this.find<Tabs>('tabs').tab;
		if (tab == 0) {
			ngui.app.openUrl('https://mainnet-bizapi.token.im/support/questions/what-keystore?locale=zh-CN');
		} else if (tab == 1) {
			ngui.app.openUrl('https://mainnet-bizapi.token.im/support/questions/what-mnemonic?locale=zh-CN');
		} else if (tab == 2) {
			ngui.app.openUrl('https://mainnet-bizapi.token.im/support/questions/what-privatekey?locale=zh-CN');
		}
	}
	private m_handle_switch(e: Event<number>) {
		this.toolbar.find<TextNode>('txt').value = ['了解Keystore','了解助记词','了解私钥'][e.data];
	}
}

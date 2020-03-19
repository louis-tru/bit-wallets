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

import { CSS, Text, Div, Image,
	atomPixel as px, Scroll,
} from 'ngui';
import { NavPage, Toolbar } from 'ngui/nav';
import Tabs, {TabPanel} from '../tabs';
import {Btn} from '../btns';
import {showTip} from '../tip';

var {resolve} = require;

CSS({
	'.ex': {
		width: "100%",
	},
	'.ex .box0': {
		width: '100%',
		backgroundColor: '#fbfcfe',
		borderBottom: `${px} #e6e6e6`,
	},
	'.ex .box1': {
		width: 'full',
		margin: '20 20 28.66 20',
	},
	'.ex .txt1': {
		width: '100%',
		textColor: '#066cb7',
		textLineHeight: 18,
		textStyle: 'bold',
		textSize: 12,
		marginTop: 8.33,
	},
	'.ex .txt2': {
		width: '100%',
		textColor: '#93939d',
		textLineHeight: 16,
		textSize: 12,
	},
	'.ex .box2': {
		width: 'full',
		margin: '54 20 20 20',
	},
	'.ex .sc1': {
		width: 'full',
		height: 146,
		border: `${px} #e6e6e6`,
		borderRadius: 5,
		backgroundColor: '#fafafa',
	},
	'.ex .txt3': {
		width: '100%',
		textSize: 12,
		// textDecoration: 'underline',
	},
	'.ex .btn_1': {
		margin: "0 14",
		width: "full",
	},
	'.ex .box3': {
		margin: '62 auto 22 auto',
		width: 251,
		height: 251,
		backgroundColor: '#fbfcfe',
		borderRadius: 6,
	},
	'.ex .img1': {
		width: 220,
		height: 220,
		margin: 'auto',
	},
	'.ex .img2': {
		width: 77.66,
		height: 77.66,
		margin: 'auto',
	},
});

// Keystore
class Keystore extends TabPanel {
	render() {
		return super.render(
			<Div class="ex">
				<Div class="box0">
					<Div class="box1">
						<Text class="txt1" value="离线保存"/>
						<Text class="txt2" value="切勿保存至邮箱、记事本、网盘、聊天工具等，非常危险"/>
						<Text class="txt1" value="请勿使用网络传输"/>
						<Text class="txt2" value="请勿通过网络工具传输、一旦被黑客获取将造成不可挽回的资产损失。建议离线设备通过扫二维码方式传输。"/>
						<Text class="txt1" value="密码管理工具保存"/>
						<Text class="txt2" value="建议使用密码管理工具管理"/>
					</Div>
				</Div>
				<Div class="box2">
					<Scroll class="sc1">
						<Text class="txt3" value='{"crypto":{"cipher":"aes-128-ctr","cipherparams":{"iv":"810943d86de2bdaa39972de158477f53"},"ciphertext":"b11e403d6c3ccec62106b8cbeb106518d8e205fc214e62f1ad7e863d8b3a2db5","kdf":"pbkdf2","kdfparams":{"c":10240,"dklen":32,"prf":"hmac-sha256","salt":"4531c3dd1d40d655031e5d518a1da6838500bd45125059a104a5c4ef10358779"},"mac":"944fcd7a7a0092d7b3c6bf292f8967a6748d2afb8c787756443f910a4e03f906"},"id":"79d211dc-2ed9-403c-90be-16306e7ed4ad","version":3,"address":"e268061297d1e95c82eecb4e01a17e219c7a00fb"}' />
					</Scroll>
				</Div>
				<Div class="btn_1">
					<Btn onClick="m_handle_click2">复制 Keystore</Btn>
				</Div>
			</Div>
		);
	}
	m_handle_click2() {
		// TODO ...
		showTip('已经复制');
	}
}

class QRCode extends TabPanel {
	render() {
		return super.render(
			<Div class="ex">
				<Div class="box0">
					<Div class="box1">
						<Text class="txt1" value="仅供直接扫描"/>
						<Text class="txt2" value="二维码禁止保存、截图、以及拍照。仅供用户在安全环境下直接扫描来方便的导入钱包"/>
						<Text class="txt1" value="在安全环境下使用"/>
						<Text class="txt2" value="请在确保四周无人及无摄像头情况下使用。二维码一旦被他人获取将造成不可挽回的资产损失"/>
					</Div>
				</Div>
				{
					this.modle.showQr?
					<Div class="box3">
						<Image class="img1" src=resolve('../img/qr.png') />
					</Div>:
					<Div class="box3">
						<Image class="img2" src=resolve('../img/icon-4.png') />
					</Div>
				}
				{
					!this.modle.showQr?
					<Div class="btn_1">
						<Btn onClick="m_handle_click2">显示二维码</Btn>
					</Div>:null
				}
			</Div>
		);
	}
	m_handle_click2() {
		if (!this.modle.showQr)
			this.setModle({showQr: 1});
	}
}

/**
 * @class ExportKeystore
 */
export default class ExportKeystore extends NavPage {
	constructor() {
		super();
		this.title = '导出 Keystore';
		this.toolbar.hidden = true;
	}
	render() {
		return super.render(
			<Tabs id="tabs">
				<Keystore title="Keystore" />
				<QRCode title="二维码" />
			</Tabs>
		);
	}
}

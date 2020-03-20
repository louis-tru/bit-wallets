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

import {Div, Image, Text, Hybrid, default as ngui, _CVD} from 'ngui';
import { NavPage } from 'ngui/nav';
import { Switch } from 'ngui/checkbox';
import * as dialog from '../dialog';
import {Event} from 'ngui/event';

const resolve = require.resolve;

ngui.css({
	'.nosp': {
		width: '100%',
		height: '100%',
		backgroundColor: '#f3f4f6',
	},
	'.nosp .div1': {
		width: '100%',
		height: 471 / 3,
	},
	'.nosp .img1': {
		width: 90,
		height: 90,
		margin: 'auto'
	},
	'.nosp .div2': {
		width: '100%',
		height: 155 / 3,
		backgroundColor: '#fff',
		marginBottom: 50 / 3,
	},
	'.nosp .txt1': {
		width: 100,
		textLineHeight: 155 / 3,
		marginLeft: 59 / 3,
		textSize: 14,
	},
	'.nosp .div3': {
		height: 30,
		margin: 'auto 0 auto 190!',
	},
	'.nosp .txt2': {
		height: 128 / 3,
		textLineHeight: 128 / 3,
		textColor: '#434446',
		marginLeft: 59 / 3,
		textSize: 12,
		textStyle: 'bold',
	},
	'.nosp .txt3': {
		margin: '0 30 16 30',
		width: 'full',
		textLineHeight: 20,
		textSize: 12,
		textColor: '#434446',
	},
});

export default class NoSecretPayment extends NavPage {

	constructor() {
		super();
		this.title = '免密支付';
		this.toolbar.hidden = true;
	}

	m_set_switch(ok: boolean) {
		var _switch = this.find<Switch>('_switch');
		_switch.addDefaultListener('Change', null); // delete default listener
		_switch.selected = ok;
		_switch.addDefaultListener('Change', 'm_handle_change');
	}

	m_handle_change(e: Event<boolean, Switch>) {
		if (e.data) {
			dialog.fingerprint(e=>{
				if (e) {
					console.log('open'); // TODO ...
				} else {
					this.m_set_switch(false);
				}
			})
		} else {
			dialog.confirm('确认关闭免密支付？', e=>{
				if (e) {
					console.log('close'); // TODO ...
				} else {
					this.m_set_switch(true);
				}
			});
		}
	}

	render() {
		return super.render(
			<Div class="nosp">
				<Div class="div1">
					<Image class="img1" src={resolve('../img/icon-5.png')} />
				</Div>
				<Div class="div2">
					<Text class="txt1" value="指纹识别" />
					<Div class="div3">
						<Switch id="_switch" onChange="m_handle_change" />
					</Div>
				</Div>
				<Text class="txt2" value="|  免密支付介绍" />
				<Hybrid class="txt3">免密支付将你的钱包密码通过安全加密算法存储至手机设备的Keychain/Keystore中，交易时调用生物识别（指纹或面容）鉴权，快速完成支付与签名。
					开启免密支付后，请妥善备份密码。如果忘记密码，可以通过导入助记词/私钥，重新设备密码。
				</Hybrid>
				<Text class="txt2" value="|  风险提示" />
				<Hybrid class="txt3">请了解你的手机设备生物识别的安全等级\n大额资产，请勿开启免密支付\n公共手机，请勿开启免密支付
				</Hybrid>
				<Text class="txt2" value="|  免则声明" />
				<Hybrid class="txt3">手机厂商的生物识别技术安全等级各有差异，我们提醒用户谨慎使用该便捷功能。使用过程中出现任何生物识别技术漏洞引发的资产风险，本软件不承担法律责任。
				</Hybrid>
			</Div>
		);
	}
}

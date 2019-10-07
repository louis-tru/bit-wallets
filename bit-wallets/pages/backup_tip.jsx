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
	Div, Text, TextNode, Image, Hybrid, Indep, 
} from 'ngui';
import {NavPage} from 'ngui/nav';
import {Btn} from '../btns';
import {sheet,alert} from 'ngui/dialog';
import * as utils from 'ngui/util';

var {resolve} = require;

CSS({
	'.bt': {
		width: '100%',
		height: '100%',
	},
	'.bt .txt1': {
		width: '100%',
		textAlign: 'center',
		textLineHeight: 40,
		marginTop: 24,
		textColor: '#656778',
		textSize: 14,
	},
	'.bt .img1': {
		width: 215,
		height: 200,
		margin: '0 auto',
	},
	'.bt .txt2': {
		width: 'full',
		// height: 28,
		margin: '11 0 0 30',
		textStyle: 'bold',
		textSize: 12,
		textLineHeight: 28,
		// backgroundColor: '#f00',
		// textBackgroundColor: '#0f0',
		textWhiteSpace: 'normal',
	},
	'.bt .txt2 .t1': {
		// textSize: 12,
		y: -2,
	},
	'.bt .txt3': {
		width: 'full',
		margin: '0 30 0 55',
		textColor: '#777a8d',
		textLineHeight: 21,
		textSize: 12,
	},
});

/**
 * @class BackupTip
 */
export default class BackupTip extends NavPage {

	constructor() {
		super();
		this.title = '备份提示';
		this.toolbar.hidden = true;
	}

	render() {
		return super.render(
			<Div class="bt">
				<Text class="txt1" value="获取 Keystore 和密码等于找拥有钱包资产所有权" />
				<Image class="img1" src=resolve('../img/icon-2_06.png') />
				<Hybrid class="txt2">`<TextNode class="t1" value="●" />   备份 Keystore</Hybrid>
				<Text class="txt3" value="请妥善备份 Keystore 和密码\n如果你的手机丢失、被盗、损坏，Keystore 将可以恢复你的资产" />
				<Hybrid class="txt2">`<TextNode class="t1" value="●" />   离线保管</Hybrid>
				<Text class="txt3" value="妥善保管至隔离网络的安全地方\n请勿将 Keystore 在联网环境下分享的存储，比如邮件、相册、社交应用等" />
				<Indep class="G_btns">
					<Btn onClick="m_handle_click">下一步</Btn>
				</Indep>
			</Div>
		);
	}

	m_handle_click() {
		sheetTip(e=>{
			if (e)
				alert('知道了');
		});
	}

}

CSS({
	'.bt_s': {
		width: 'full',
		margin: '9',
		backgroundColor: '#fcfcfc',
		borderRadius: 15,
	},
	'.bt_s .img1': {
		width: 128.3,
		height: 126,
		margin: '27.66 auto 0 auto',
	},
	'.bt_s .txt1': {
		width: '100%',
		textAlign: 'center',
		textStyle: 'bold',
		textSize: 14,
		textLineHeight: 42,
	},
	'.bt_s .txt2': {
		width: 'full',
		margin: '0 25 17.33 25',
		textAlign: 'center',
		textSize: 14,
		textLineHeight: 20.66,
		textColor: '#43464f',
	},
	'.bt_s .btn0': {
		width: 'full',
		margin: '8.66 8.33 8.66 8.33'
	},
	'.bt_s .btn1': {
		width: '50%',
	},
});

export function sheetTip(cb=utils.noop) {
	return sheet(
		<Div class="bt_s">
			<Image class="img1" src=resolve('../img/icon-3.png') />
			<Text class="txt1" value="请勿截屏" />
			<Text class="txt2" value="请勿截屏分享和存储，这将可能被第三方恶意软件收集，造成资产损失" />
			<Div class="btn0">
				<Div class="btn1">
					<Btn color="light" onClick=(e=>cb(0))>取消</Btn>
				</Div>
				<Div class="btn1">
					<Btn onClick=(e=>cb(1))>知道了</Btn>
				</Div>
			</Div>
		</Div>
	);
}
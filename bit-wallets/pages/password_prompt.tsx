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
	CSS, Div, Text, Button
} from 'ngui';
import {NavPage} from 'ngui/nav';
import {NavBtn} from '../btns';
import NoSecretPayment from './no_secret_payment';
import {prompt,alert} from '../dialog';
import BackupTip from './backup_tip';

var {resolve} = require;

CSS({
	'.pp': {
		width: '100%',
		height: '100%',
		backgroundColor: '#f3f4f6',
	},
	'.pp .box1': {
		width: '100%',
		height: 51.5,
		backgroundColor: '#fff',
	},
	'.pp .txt1': {
		width: '74.5!',
		height: 51.5,
		marginLeft: 20,
		textLineHeight: 51.5,
		textSize: 14,
	},
	'.pp .txt2': {
		textFamily: 'icomoon-ultimate',
		textAlign: 'center',
		width: 46.5,
		textLineHeight: 51.5,
		textSize: 18,
		// textColor: "#0d62a5",
		textColor: "#000",
	},
});

/**
 * @class PassworkPrompt
 */
export default class PassworkPrompt extends NavPage {

	constructor() {
		super();
		this.title = '密码提示信息';
		this.toolbar.hidden = true;
	}

	render() {
		var prompt = this.modle.showPw ? this.prompt: Array(this.prompt.length + 1).join('●');
		return super.render(
			<Div class="pp">
				<Div class="G_nav_space" />
				<Div class="box1">
					<Text class="txt1" value=prompt />
					<Button class="txt2" onClick="m_handle_click1">{this.modle.showPw?'\uecb1':'\uecb2'}</Button>
				</Div>
			</Div>
		);
	}

	m_handle_click1() {
		this.modle = {showPw:!this.modle.showPw};
	}
}

PassworkPrompt.defineProps({prompt: ''});
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
	Div,
	Text,
	Image,
	Button,
	Indep, _CVD,
	default as ngui,
} from 'ngui';
import {NavPage} from 'ngui/nav';
import { Btn } from '../btns';
import Tip from '../tip';

const px = ngui.atomPixel;
const {resolve} = require;

ngui.css({
	'.mw': {
		width: '100%',
		height: '100%',
		// backgroundColor: '#f00',
	},
	'.mw .img': {
		width: 49,
		height: 49,
		margin: '28.5 auto 0 auto',
	},
	'.mw .txt1': {
		width: '100%',
		// height: 33.3,
		textLineHeight: 33.3,
		textAlign: 'center',
		textSize: 14,
		textColor: '#757575',
		textStyle: 'bold',
		// backgroundColor: '#f00',
		// TextBackgroundColor: '#ff0',
	},
	'.mw .txt2': {
		width: '100%',
		// height: 40,
		textLineHeight: 40,
		textAlign: 'center',
		textSize: 14,
		textColor: '#777a8b',
		// backgroundColor: '#ff0',
		// TextBackgroundColor: '#f00',
	},
	'.mw .line': {
		width: 'full',
		height: 1,
		margin: '0 19.3',
		backgroundColor: '#e7e7e9',
	},
	'.mw .box1': {
		width: 'full',
		margin: '7 15.3 7 15.3',
		// borderTop: '1 #e7e7e9',
	},
	'.mw .box1 .btn': {
		// height: 29,
		textLineHeight: 29,
		margin: 4.67,
		backgroundColor: '#eaedf6',
		borderRadius: 5,
	},
	'.mw .box2 .btn': {
		textLineHeight: 29 - px * 2,
		backgroundColor: 'none',
		border: `${px} #d3d4d9`,
	},
	'.mw .box1 .btn .txt3': {
		margin: '0 10 0 10'
	},
});

/**
 * @class MnemonicWord
 */
export default class MnemonicWord extends NavPage {

	constructor() {
		super();
		this.title = '备份助记词';
		this.toolbar.hidden = true;
	}

	render() {
		return super.render(
			<Div class="mw">
				<Image class="img" src={resolve('../img/icon-1.png')} />
				{/* <Text class="txt1" value="备份助记词" /> */}
				<Text class="txt2" value="请准备抄写并安全备份助记词" />
				<Div class="line" />
				<Div class="box1">
					<Button class="btn" onClick="m_handle_click_1"><Text class="txt3" value="rather" /></Button>
					<Button class="btn" onClick="m_handle_click_1"><Text class="txt3" value="also" /></Button>
					<Button class="btn" onClick="m_handle_click_1"><Text class="txt3" value="insane" /></Button>
					<Button class="btn" onClick="m_handle_click_1"><Text class="txt3" value="pencil" /></Button>
					<Button class="btn" onClick="m_handle_click_1"><Text class="txt3" value="almost" /></Button>
					<Button class="btn" onClick="m_handle_click_1"><Text class="txt3" value="ahead" /></Button>
					<Button class="btn" onClick="m_handle_click_1"><Text class="txt3" value="effort" /></Button>
					<Button class="btn" onClick="m_handle_click_1"><Text class="txt3" value="embrace" /></Button>
					<Button class="btn" onClick="m_handle_click_1"><Text class="txt3" value="bleak" /></Button>
					<Button class="btn" onClick="m_handle_click_1"><Text class="txt3" value="twenty" /></Button>
					<Button class="btn" onClick="m_handle_click_1"><Text class="txt3" value="music" /></Button>
					<Button class="btn" onClick="m_handle_click_1"><Text class="txt3" value="minor" /></Button>
				</Div>
				<Div class="line" />
				<Div class="box1 box2">
					<Button class="btn" onClick="m_handle_click_1"><Text class="txt3" value="music" /></Button>
				</Div>
				<Indep class="G_btns">
					<Btn onClick="m_handle_click">下一步</Btn>
				</Indep>
			</Div>
		);
	}

	private m_handle_click_1() {
		ngui.render<Tip>(<Tip value="助记词顺序正确" icon="ok" />).show();
	}

	private m_handle_click() {

	}
}

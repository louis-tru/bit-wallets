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
	CSS, render,
	Div as div, 
	Text as text, 
	Image as img, 
	Button as button, 
	Indep as indep, 
	atomPixel as px,
} from 'ngui';
import {NavPage} from 'ngui/nav';
import { Btn } from '../btns';
import Tip from '../tip';

var {resolve} = require;

CSS({
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
		// textBackgroundColor: '#ff0',
	},
	'.mw .txt2': {
		width: '100%',
		// height: 40,
		textLineHeight: 40,
		textAlign: 'center',
		textSize: 14,
		textColor: '#777a8b',
		// backgroundColor: '#ff0',
		// textBackgroundColor: '#f00',
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
			<div class="mw">
				<img class="img" src=resolve('../img/icon-1.png') />
				{/* <text class="txt1" value="备份助记词" /> */}
				<text class="txt2" value="请准备抄写并安全备份助记词" />
				<div class="line" />
				<div class="box1">
					<button class="btn" onClick="m_handle_click_1"><text class="txt3" value="rather" /></button>
					<button class="btn" onClick="m_handle_click_1"><text class="txt3" value="also" /></button>
					<button class="btn" onClick="m_handle_click_1"><text class="txt3" value="insane" /></button>
					<button class="btn" onClick="m_handle_click_1"><text class="txt3" value="pencil" /></button>
					<button class="btn" onClick="m_handle_click_1"><text class="txt3" value="almost" /></button>
					<button class="btn" onClick="m_handle_click_1"><text class="txt3" value="ahead" /></button>
					<button class="btn" onClick="m_handle_click_1"><text class="txt3" value="effort" /></button>
					<button class="btn" onClick="m_handle_click_1"><text class="txt3" value="embrace" /></button>
					<button class="btn" onClick="m_handle_click_1"><text class="txt3" value="bleak" /></button>
					<button class="btn" onClick="m_handle_click_1"><text class="txt3" value="twenty" /></button>
					<button class="btn" onClick="m_handle_click_1"><text class="txt3" value="music" /></button>
					<button class="btn" onClick="m_handle_click_1"><text class="txt3" value="minor" /></button>
				</div>
				<div class="line" />
				<div class="box1 box2">
					<button class="btn" onClick="m_handle_click_1"><text class="txt3" value="music" /></button>
				</div>
				<indep class="G_btns">
					<Btn onClick="m_handle_click">下一步</Btn>
				</indep>
			</div>
		);
	}

	m_handle_click_1() {
		render(<Tip value="助记词顺序正确" icon="ok" />).show();
	}

	m_handle_click() {

	}
}

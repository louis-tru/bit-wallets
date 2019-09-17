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

import { Div, Image, Indep, Input, CSS } from 'ngui';
import { NavPage } from 'ngui/nav';
import { alert } from 'ngui/dialog';
import { Btn } from '../btns';
import WordsBackup from './words_backup';

const {resolve} = require;

CSS({
	'.wcreate': {
		width: '100%',
		height: '100%',
	},
	'.wcreate .img': {
		width: 60,
		height: 60,
		backgroundColor: '#f00',
		margin: '40 auto 30 auto',
	},
	'.wcreate .input': {
		width: 'full',
		height: 38,
		margin: '10 20 0 20',
		backgroundColor: '#f4f4f4',
		borderRadius: 5,
		textSize: 14,
	},
	'.wcreate .btns': {
		width: '20!',
		alignY: 'bottom',
		alignX: 'left',
		x: 10,
		y: -10,
	},
});

/**
 * @class Create
*/
export default class Create extends NavPage {
	constructor() {
		super();
		this.title = '添加XXX钱包';
		this.toolbar.hidden = true;
	}
	render() {
		return super.render(
			<Div class="wcreate">
				<Image class="img" src=(resolve(`../img/${this.type}-128.png`)) />
				<Input class="input" textMargin=15 placeholder="钱包名称" />
				<Input class="input" textMargin=15 security=1 placeholder="钱包密码" />
				<Input class="input" textMargin=15 security=1 placeholder="重复输入密码" />
				<Input class="input" textMargin=15 placeholder="密码提示信息" />
				<Indep class="btns">
					<Btn onClick="m_handle_click">创建</Btn>
				</Indep>
			</Div>
		);
	}
	m_handle_click() {
		this.collection.push(<WordsBackup />, 1);
	}
}

Create.defineProps(['type']);
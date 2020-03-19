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
	ViewController, default as ngui,
	Hybrid, Indep, Image, Text, _CVD
} from 'ngui';
import utils from 'ngui/util';
import {prop} from 'ngui/ctr';

const {resolve} = require;

ngui.css({
	'.tip': {
		width: '100%',
		height: '100%',
	},
	'.tip .box0': {
		align: 'center center',
	},
	'.tip .box1': {
		height: 115,
		backgroundColor: '#f7f7f7',
		margin: 'auto',
		borderRadius: 15,
		textAlign: 'center',
	},
	'.tip .icon': {
		width: 40,
		height: 40,
		margin: '22.3 35 9 35',
		// backgroundColor: '#f00',
	},
	'.tip .txt1': {
		textLineHeight: 26,
		textAlign: 'center',
		textSize: 14,
		textColor: '#000',
		margin: '0 7',
	},
});

const ICONS: Dict<string> = {
	ok: resolve('./img/icon-ok.png'),
	fail: resolve('./img/icon-fail.png'),
};

/**
 * @class Tip
 * @extends ViewController
 */
export default class Tip extends ViewController {
	@prop value = 'tip';
	@prop icon = 'ok';

	render() {
		return (
			<Indep class="tip" _receive={1} opacity={0}>
				<Indep class="box0">
					<Hybrid class="box1">
						<Image class="icon" src={ICONS[this.icon]} />\n
						<Text class="txt1" value={this.value} />
					</Hybrid>
				</Indep>
			</Indep>
		);
	}

	show() {
		var r = ngui.root;
		utils.assert(r, 'not find root view');
		this.appendTo(r);
		this.domAs().transition({opacity:1,time:500});
		utils.sleep(2e3).then(e=>{
			this.domAs().transition({opacity:0,time:500}, e=>this.remove());
		});
		return this;
	}
}

export function showTip(tip = 'tip', icon = 'ok') {
	return ngui.render<Tip>(<Tip value={tip} icon={icon} />).show();
}
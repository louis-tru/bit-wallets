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

import { CSS, Div, Scroll, Text, TextNode, Hybrid, Button } from 'ngui';
import {alert} from 'ngui/dialog';
import { NavPage } from 'ngui/nav';

CSS({
	'.wd': {
		width: '100%',
		height: '100%',
	},
	'.wd .box1': {
		margin: 12,
		width: 'full',
		height: 155,
		backgroundColor: '#0693c1',
		borderRadius: 8,
	},
	'.wd .txt1': {
		width: '63!',
		height: 34,
		marginTop: 14,
		marginLeft: 30,
		textSize: 18,
		textColor: '#fff',
	},
	'.wd .txt2': {
		marginTop: 14,
		textSize: 18,
		textColor: '#fff',
		textFamily: 'icomoon-ultimate',
	},
	'.wd .txt3': {
		height: 31,
		width: 225,
		marginLeft: 30,
		textSize: 14,
		textLineHeight: 31,
		textColor: '#fff',
		textOverflow: 'center_ellipsis',
		textWhiteSpace: 'wrap',
	},
	'.wd .txt4': {
		width: 32,
		textSize: 14,
		textColor: '#fff',
		textLineHeight: 31,
		textFamily: 'icomoon-ultimate',
		textAlign: 'center',
	},
	'.wd .txt5': {
		width: 'full',
		marginTop: 21,
		marginRight: 23,
		textLineHeight: 55,
		textAlign: 'right',
		textSize: 30,
		textColor: '#fff',
	},
})

export default class WalletDetails extends NavPage {

	render() {
		return super.render(
			<Div class="wd">
				<Div class="box1">
					<Text class="txt1" value="ETH-Wallet" />
					<Button class="txt2" onClick=(e=>alert('test'))>\uec6a</Button>
					<Text class="txt3" value="0xb5c4492ae07311Ab3CDa11C8481060A737CEa438" />
					<Button class="txt4" onClick=(e=>alert('test2'))>\ue9f8</Button>
					<Hybrid class="txt5"><TextNode value="￥" textSize=20 y=-7 />0.00</Hybrid>
				</Div>
			</Div>
		);
	}

}

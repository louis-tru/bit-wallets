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
	Hybrid,Div, CSS, Image,
	atomPixel as px, TextNode, Text, Scroll, ViewController
} from 'langou';

const {resolve} = require;

CSS({
	'.iwitem': {
		width: '100%',
		height: 60,
	},
	'.iwitem:normal': {
		backgroundColor: '#fff0', time: 50
	},
	'.iwitem:hover': {
		backgroundColor: '#ececec', time: 50
	},
	'.iwitem:down': {
		backgroundColor: '#E1E4E4', time: 50
	},
	'.iwitem .img': {
		width: 30,
		margin: 'auto 10',
	},
	'.iwitem .con': {
		width: '50!',
		height: 'full',
		contentAlign: 'top',
		borderBottom: `${px} #BBBBBB`,
	},
	'.iwitem .con .left': {
		width: '125!',
		height: 28,
		margin: 'auto 0 auto 5',
		textSize: 17,
		textWhiteSpace: 'no_wrap',
		textOverflow: 'ellipsis',
	},
	'.iwitem .con .right': {
		width: 100,
		height: 40,
		margin: 'auto 20 auto 0',
		textSize: 14,
		textAlign: 'right',
	},
});

export default class IndexWallet extends ViewController {

	title = '钱包';

	m_handle_click(e) {
		// this.collection.push(<Index toolbar.hidden=true />, 1);
	}

	render() {
		return (
			<Scroll class="index">
				<Div class="iwitem" onClick="m_handle_click">
					<Image class="img" src=(resolve('../img/BTC-60.png')) />
					<Div class="con">
						<Text class="left" value="BTC-Wallet" />
						<Hybrid class="right">
							<TextNode value="0\n" textColor="#8F8E94" />
							<TextNode value="$ 0.00" />
						</Hybrid>
					</Div>
				</Div>
				<Div class="iwitem" onClick="m_handle_click">
					<Image class="img" src=(resolve('../img/ETH-60.png')) />
					<Div class="con">
						<Text class="left" value="ETH-Wallet" />
						<Hybrid class="right">
							<TextNode value="0\n" textColor="#8F8E94" />
							<TextNode value="$ 0.00" />
						</Hybrid>
					</Div>
				</Div>
			</Scroll>
		);
	}
}
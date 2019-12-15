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
	CSS, Div, 
	Text, TextNode, 
	Button, Image, Indep, 
} from 'ngui';
import { NavPage, Navbar } from 'ngui/nav';
import {alert} from 'ngui/dialog';
import {showTip} from '../tip';

const {resolve} = require;

CSS({
	'.qrc': {
		width: 317.5,
		height: 317.5,
		// backgroundColor: '#f00',
		margin: 'auto',
		marginTop: 60,
	},
	'.qrc .box1': {
		width: '100%',
		height: 82.5,
		backgroundColor: '#0592bf',
		borderRadiusRightTop: 10,
		borderRadiusLeftTop: 10,
	},
	'.qrc .txt1': {
		width: '100%',
		textLineHeight: 22,
		textAlign: 'center',
		textSize: 16,
		textColor: '#fff',
		marginTop: 32.5,
	},
	'.qrc .txt2': {
		width: '100%',
		height: 21,
		textLineHeight: 21,
		textAlign: 'center',
		textSize: 10,
		textColor: '#fff',
		textOverflow: 'center_ellipsis',
		textWhiteSpace: 'wrap',
	},
	'.qrc .txt2-1': {
		textFamily: 'icomoon-ultimate',
	},
	'.qrc .box2': {
		width: '100%',
		height: 275.5,
		backgroundColor: '#fff',
		borderRadiusRightBottom: 10,
		borderRadiusLeftBottom: 10,
	},
	'.qrc .txt3': {
		width: '100%',
		// height: 51.5,
		textLineHeight: 51.5,
		textAlign: 'center',
		textSize: 15,
		marginTop: 24.5,
	},
	'.qrc .img1': {
		width: 160.5,
		height: 160.5,
		margin: '0 auto',
	},
	'.qrc .box3': {
		width: 50,
		height: 50,
		alignX: 'center',
		y: -25,
		// backgroundImage: `url(${resolve('../img/icon-7.jpg')})`,
	},
	'.qrc .img2': {
		width: '100%',
		height: '100%',
		borderRadius: 25,
	},
});

class MyNavbar extends Navbar {

	m_share(e) {
		alert('分享');
	}

	render() {
		// \uec7f
		// \uea81
		return super.render(
			<Indep alignX="right" alignY="center" x=-10>
				<Button textFamily="icomoon-ultimate" textColor="#fff" textSize=20 onClick="m_share">\uec84</Button>
			</Indep>
		);
	}
}

export default class QRCode extends NavPage {

	constructor() {
		super();
		this.title = '收款';
		this.toolbar.hidden = true;
		this.backgroundColor = '#353b4b';
		this.navbar = <MyNavbar backgroundColor="#353b4b" border=0 />;
	}

	_back() {
		this.collection.pop(true);
	}

	_copy() {
		showTip('钱包地址已复制');
	}

	render() {
		return super.render(
			<Div class="qrc">
				<Div class="box1">
					<Text class="txt1" value=this.name />
					<Button class="txt2" onClick="_copy">0xb5c4492ae07311Ab3CDa11C8481060A737CEa438 <TextNode class="txt2-1" value="\ueecb" /></Button>
				</Div>
				<Div class="box2">
					<Text class="txt3" value="收款地址" />
					<Image class="img1" src=resolve('../img/qr.png') />
				</Div>
				<Indep class="box3">
					<Image class="img2" src=resolve('../img/icon-8.jpg') />
				</Indep>
			</Div>
		);
	}

}

QRCode.defineProps(['name']);
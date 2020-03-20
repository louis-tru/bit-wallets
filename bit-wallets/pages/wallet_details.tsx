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
	Div, Scroll,
	Text, TextNode, Hybrid,
	Button, Image, Indep,
	default as ngui, _CVD
} from 'ngui';
import {alert} from 'ngui/dialog';
import { NavPage, Navbar } from 'ngui/nav';
import WalletSettings from './wallet_settings';
import QRCode from './qrcode';
import {GUIClickEvent} from 'ngui/event';

const px = ngui.atomPixel;
const {resolve} = require;

ngui.css({
	'.wd': {
		width: '100%',
		height: '100%',
	},
	'.wd .box1': {
		margin: 8,
		width: 'full',
		height: 103,
		backgroundColor: '#0693c1',
		// backgroundColor: '#000',
		// border: '1 #0693c1',
		borderRadius: 8,
	},
	'.wd .txt1': {
		width: '50!',
		marginTop: 9.3,
		marginLeft: 20,
		textSize: 16,
		textColor: '#fff',
		textLineHeight: 22.5,
		// backgroundColor: '#aaa',
	},
	'.wd .txt2': {
		marginTop: 9.3,
		textSize: 18,
		textColor: '#fff',
		textFamily: 'icomoon-ultimate',
		textLineHeight: 22.5,
	},
	'.wd .txt3': {
		height: 20.5,
		width: 200,
		marginLeft: 17,
		textSize: 12,
		textLineHeight: 20.5,
		textColor: '#fff',
		textOverflow: 'center_ellipsis',
		textWhiteSpace: 'wrap',
		// backgroundColor: '#aaa',
	},
	'.wd .txt4': {
		width: 21,
		textSize: 12,
		textColor: '#fff',
		textLineHeight: 20.5,
		textFamily: 'icomoon-ultimate',
		textAlign: 'center',
	},
	'.wd .txt5': {
		width: 'full',
		marginTop: 14,
		marginRight: 15,
		textLineHeight: 38,
		height: 38,
		textAlign: 'right',
		textSize: 24,
		textColor: '#fff',
	},
	'.wd .txt6': {
		width: '64.5!',
		textLineHeight: 41.5,
		textSize: 18,
		marginLeft: 13.5,
		textStyle: 'bold',
	},
	'.wd .btn1': {
		width: 41.5,
		textLineHeight: 41.5,
		textSize: 18,
		textAlign: 'center',
		textFamily: 'icomoon-ultimate',
	},
	'.wd .list': {
		width: '100%',
		marginBottom: 20,
	},
	'.wd .item': {
		height: 73.5,
		width: 'full',
		marginLeft: 19.33,
		borderBottom: `${px} #f3f5f4`,
		// backgroundColor: '#faa',
		textAlign: 'left',
	},
	'.wd .img1': {
		height: 38.5,
		width: 38.5,
		marginTop: 17.33,
		marginBottom: 17.33,
		// backgroundColor: '#f00',
	},
	'.wd .txt7': {
		width: '173!',
		height: 38.5,
		marginTop: 'auto',
		marginBottom: 'auto',
		marginLeft: 10.5,
		textLineHeight: 38.5,
		textColor: '#64727d',
		textSize: 18,
		// backgroundColor: '#aaa',
	},
	'.wd .txt8': {
		height: 38.5,
		marginTop: 'auto',
		marginBottom: 'auto',
		width: 100,
		textSize: 16,
		textAlign: 'right',
		textLineHeight: 18,
		// backgroundColor: '#faf',
	},
	'.wd .txt9': {
		textColor: '#949ea7',
		textSize: 12,
	},
});

class MyNavbar extends Navbar {

	m_handle_show_menu(e: GUIClickEvent) {
		alert('扫一扫');
	}

	render() {
		return super.render(
			<Indep alignX="right" alignY="center" x={-10}>
				<Button textFamily="icomoon-ultimate" textColor="#000" textSize={20} onClick="m_handle_show_menu">\ue945</Button>
			</Indep>
		);
	}
}

export default class WalletDetails extends NavPage {

	constructor() {
		super();
		this.navbar = <MyNavbar backgroundColor="#fff" backTextColor="#000" titleTextColor="#000" />;
		// this.navbar = <MyNavbar />;
	}

	_setting() {
		this.collection.push(<WalletSettings />, true);
	}

	_showQrcode() {
		this.collection.push(<QRCode name="ETH-Wallet" />, true);
	}

	render() {
		return super.render(
			<Scroll class="wd">
				<Div class="box1">
					<Text class="txt1" value="ETH-Wallet" />
					<Button class="txt2" onClick="_setting">\uec6a</Button>
					<Button class="txt3" onClick="_showQrcode">0xb5c4492ae07311Ab3CDa11C8481060A737CEa438</Button> 
					<Button class="txt4" onClick="_showQrcode">\ue9f8</Button>
					<Hybrid class="txt5"><TextNode value="￥" textSize={14} y={-6} />0.00</Hybrid>
				</Div>
				<Text class="txt6" value="资产" />
				{/* <Button class="btn1" onClick=(e=>alert('test3'))>\ued5d</Button> */}
				<Div class="list">
					<Div class="item">
						<Image class="img1" src={resolve('../img/ETH-128.png')} />
						<Text class="txt7" value="ETH" />
						<Hybrid class="txt8">0\n<TextNode class="txt9" value="￥0.00" /></Hybrid>
					</Div>
				</Div>
			</Scroll>
		);
	}

}

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
	Hybrid,Div, Image, Indep, Button,
	TextNode, Text, ViewController, default as ngui, _CVD
} from 'ngui';
import { event, EventNoticer, GUIClickEvent } from 'ngui/event';
import { prop } from 'ngui/ctr';

const px = ngui.atomPixel;

ngui.css({
	'.iwitem': {
		width: '100%',
		height: 60,
	},
	'.iwitem.small': {
		height: 52,
	},
	'.iwitem.big': {
		height: 70,
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
		margin: 'auto 15',
	},
	'.iwitem .con': {
		width: '60!',
		height: 'full',
		contentAlign: 'right',
		borderBottom: `${px} #e7e8ea`,
	},
	'.iwitem .con .left': {
		width: '125!',
		alignX: 'left',
		alignY: 'center',
	},
	'.iwitem .con .left .txt': {
		width: 'full',
		marginLeft: 5,
		textSize: 17,
		textColor: '#333',
		textWhiteSpace: 'no_wrap',
		textOverflow: 'ellipsis',
	},
	'.iwitem .con .left .txt.txt2': {
		textSize: 12,
		textColor: '#888',
	},
	'.iwitem.small .con .left .txt': {
		textSize: 14,
	},
	'.iwitem .con .right': {
		width: 100,
		height: 40,
		margin: 'auto 20 auto 0',
		textSize: 14,
		textAlign: 'right',
	},
});

/**
 * @class NavBtn
 */
export class NavBtn extends ViewController {
	@prop icon: string = '';
	@prop text: string = '';
	@prop desc: string = '';
	@prop small: boolean = false;
	@prop big: boolean = false;

	@event readonly onClick: EventNoticer<GUIClickEvent>;
	
	render() {
		return (
			<Div class={`iwitem ${this.small?'small':this.big?'big':''}`} onClick={this.onClick}>
				<Image class="img" src={this.icon} />
				<Div class="con">
					<Indep class="left">
						<Text class="txt" value={this.text} />
						{this.desc?<Text class="txt txt2" value={this.desc} />: null}
					</Indep>
					<Indep x={-10} alignX="right" alignY="center">
						<Text value="\uedbe" textFamily="icomoon-ultimate" textColor="#aaa" />
					</Indep>
				</Div>
			</Div>
		);
	}
}

/**
 * @class NavBtnPrice
 */
export class NavBtnPrice extends ViewController {
	@prop icon = '';
	@prop text = '';
	@prop balance = 0;
	@prop money = 0;
	@prop desc = '';

	@event readonly onClick: EventNoticer<GUIClickEvent>;

	render() {
		return (
			<Div class="iwitem" onClick={this.onClick}>
				<Image class="img" src={this.icon} />
				<Div class="con">
					<Indep class="left">
						<Text class="txt" value={this.text} />
						{this.desc?<Text class="txt txt2" value={this.desc} />: null}
					</Indep>
					<Hybrid class="right">
						<TextNode value={this.balance} />
						<TextNode value={'\n$'+this.money} textColor="#888" />
					</Hybrid>
				</Div>
			</Div>
		);
	}
}

ngui.css({
	'.long_btn': {
		margin: 6,
		width: "full",
		// height: 46,
		textLineHeight: 46,
		textColor: "#fff",
		textSize: 16,
		borderRadius: 8,
		backgroundColor: '#0a8de7',
	}, 
	'.long_btn.trans': {
		textColor: "#0079ff",
		border: `${px} #0079ff`,
		backgroundColor: 'none',
	},
	'.long_btn.white': {
		backgroundColor: '#fff',
		textColor: '#084697',
	},
	'.long_btn.light': {
		backgroundColor: '#e3f0f9',
		textColor: '#0a8de7',
	},
	'.long_btn.gray, .long_btn.disable': {
		backgroundColor: '#c9c9d2',
		textColor: '#fff',
	},
	'.G_btns': {
		width: '20!',
		alignY: 'bottom',
		alignX: 'left',
		x: 10,
		y: -10,
	},
	'.G_nav_space': {
		width: '100%',
		height: 20,
		backgroundColor: '#f3f4f6',
	},
});

export class Btn extends ViewController {
	@prop color = '';
	@prop class = '';

	@event readonly onClick: EventNoticer<GUIClickEvent>;

	render(...vdoms: any[]) {
		return (
			<Button class={`long_btn ${this.color} ${this.class}`} onClick={this.onClick}>{vdoms}</Button>
		);
	}

}
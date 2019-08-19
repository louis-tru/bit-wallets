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
	Hybrid,Div, CSS, Image, Indep, Button,
	atomPixel as px, TextNode, Text, ViewController
} from 'langou';

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
		contentAlign: 'right',
		borderBottom: `${px} #BBBBBB`,
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
	'.iwitem .con .right': {
		width: 100,
		height: 40,
		margin: 'auto 20 auto 0',
		textSize: 14,
		textAlign: 'right',
	},
});

/**
 * @class BtnItem
 */
export class BtnItem extends ViewController {
	render() {
		return (
			<Div class="iwitem" onClick=this.onClick>
				<Image class="img" src=this.icon />
				<Div class="con">
					<Indep class="left">
						<Text class="txt" value=this.text />
						{this.desc?<Text class="txt txt2" value=this.desc />: null}
					</Indep>
					<Hybrid class="right">
						<TextNode value=this.balance />
						<TextNode value=('\n$'+this.money) textColor="#888" />
					</Hybrid>
				</Div>
			</Div>
		);
	}
	event onClick;
}

BtnItem.defineProps(['icon', 'text', 'balance', 'money', 'desc' ]);

/**
 * @class NavBtn
 */
export class NavBtn extends ViewController {
	render() {
		return (
			<Div class="iwitem" onClick=this.onClick>
				<Image class="img" src=this.icon />
				<Div class="con">
					<Indep class="left">
						<Text class="txt" value=this.text />
						{this.desc?<Text class="txt txt2" value=this.desc />: null}
					</Indep>
					<Indep x=-10 alignX="right" alignY="center">
						<Text value="\uedbe" textFamily="icomoon-ultimate" textColor="#aaa" />
					</Indep>
				</Div>
			</Div>
		);
	}
	event onClick;
}

NavBtn.defineProps(['icon', 'text', 'desc']);

CSS({
	'.long_btn': {
		margin: 10,
		width: "full",
		height: 40,
		textLineHeight: 40,
		textColor: "#0079ff",
		borderRadius: 8,
		border: `${px} #0079ff`,

		// .g_btn:active {
		// 	opacity: 0.7;
		// }
		
		// /*.foot */
		// .g_btn.trans {
		// 	background: none;
		// 	color: #084697;
		// }
		
		// /*.foot */
		// .g_btn.white {
		// 	background: #fff;
		// 	color: #084697;
		// }
		
		// /*.foot */
		// .g_btn.light {
		// 	background: #F0F4F9;
		// 	color: #004697;
		// }
		
		// /*.foot */
		// .g_btn.disable, .g_btn.gray {
		// 	background: #c9c9d2;
		// 	color: #fff;
		// 	/*pointer-events: none;*/
		// }
	}, 
	'.long_btn.white': {
		textColor: "#fff",
		border: `${px} #fff`,
	},
});

export class Btn extends ViewController {
	render(...vdoms) {
		return (
			<Button class=`long_btn ${this.color} ${this.class}` onClick=this.onClick>{vdoms}</Button>
		);
	}
	event onClick;
}

Btn.defineProps({ color: '', 'class': '' });
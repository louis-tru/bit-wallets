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

import {Div, CSS, atomPixel as px, ViewController, Button, Text, Hybrid} from 'langou';
import { Overlay } from 'langou/overlay';

CSS({

	'.o_btn': {
		width: "full",
		textLineHeight: 45,
		textAlign: "left",
		borderRadius: 0,
		borderBottom: `${px} #c8c7cc`,
		textColor: "#0079ff",
	},
	
	'.o_btn:normal': {
		backgroundColor: '#fff0', time: 180
	},
	
	'.o_btn:hover': {
		backgroundColor: '#ececec', time: 50
	},
	
	'.o_btn:down': {
		backgroundColor: '#E1E4E4', time: 50
	},

});

export default class Menu extends Overlay {

	event onItemAction;

	render() {
		return super.render(
			this.items.map(({icon,text},i)=>(
				<Button class="o_btn" defaultHighlighted=0 onClick=(e=>this.triggerItemAction(i))>
					{ icon ?
						<Text textFamily="icomoon-ultimate" marginLeft=16 value=icon />: null
					}
					<Hybrid marginLeft=12 marginRight=16>{text}</Hybrid>
				</Button>
			))
		);
	}

}

Menu.defineProps({ items:[] });
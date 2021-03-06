/* ***** BEGIN LICENSE BLOCK *****
 * Distributed under the BSD license:
 *
 * Copyright (c) 2015, xuewen.chu
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

import { Div, Button, Indep, default as ngui, _CVD } from 'ngui';
import { Navbutton, Mynavpage } from './public';
import { Overlay } from 'ngui/overlay';
import { GUIClickEvent } from 'ngui/event';

const resolve = require.resolve;

function show_overlay(evt: GUIClickEvent) {
	ngui.render<Overlay>(
		<Overlay>
			<Div>
				<Navbutton>Menu A</Navbutton>
				<Navbutton>Menu B------C</Navbutton>
				<Navbutton>Menu C</Navbutton>
				<Navbutton style={{borderWidth:0}}>Menu D</Navbutton>
			</Div>
		</Overlay>
	).showOverlayFromView(evt.sender);
}

function show_overlay2(evt: GUIClickEvent) {
	var com = ngui.render<Overlay>(
		<Overlay>
			<Div>
				<Navbutton>Hello.</Navbutton>
				<Navbutton>Who are you going to?</Navbutton>
				<Navbutton style={{borderWidth:0}}>Do I know you?</Navbutton>
			</Div>
		</Overlay>
	);
	com.priority = 'left';
	com.showOverlayFromView(evt.sender);
}

function show_overlay3(evt: GUIClickEvent) {
	var com = ngui.render<Overlay>(
		<Overlay>
			<Div>
				<Navbutton style={{textColor:"#fff"}}>Hello.</Navbutton>
				<Navbutton style={{textColor:"#fff"}}>Who are you going to?</Navbutton>
				<Navbutton style={{textColor:"#fff"}}>Do I know you?</Navbutton>
				<Navbutton style={{textColor:"#fff", borderWidth:0}}>What country are you from?</Navbutton>
			</Div>
		</Overlay>
	);
	com.priority = 'left';
	com.backgroundColor = '#000';
	com.showOverlayFromView(evt.sender);
}

export default ()=>(
	<Mynavpage title="Overlay" source={resolve(__filename)}>
		<Div width="full" height="full">
			<Indep alignY="top" width="full">
				<Button class="long_btn" onClick={show_overlay}> Show Overlay </Button>
			</Indep>
			<Indep alignY="bottom" y={-10} width="full">
				<Button class="long_btn" onClick={show_overlay}> Show Overlay </Button>
			</Indep>
			<Indep alignY="center">
				<Button class="long_btn" onClick={show_overlay2}> Show Overlay </Button>
			</Indep>
			<Indep alignY="center" alignX="right">
				<Button class="long_btn" onClick={show_overlay3}> Show Overlay </Button>
			</Indep>
		</Div>
	</Mynavpage>
)
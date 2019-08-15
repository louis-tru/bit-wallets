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

import { Indep,Button,Hybrid,Div,render, CSS, atomPixel as px, ViewController } from 'langou';
import { NavPage, Toolbar, Navbar } from 'langou/nav';
import { alert } from 'langou/dialog';
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

class OButton extends ViewController {

	event onClick;

	render(...vdoms) {
		return (
			<Button class="o_btn" defaultHighlighted=0 onClick=this.onClick>
				<Hybrid marginLeft=16 marginRight=16>{vdoms}</Hybrid>
			</Button>
		);
	}
}

/**
 * @class IndexNavbar
 */
class IndexNavbar extends Navbar {

	m_handle_add_0() {
		alert('m_handle_add_0');
	}

	m_handle_add_1() {
		alert('m_handle_add_1');
	}

	m_handle_add_2() {
		alert('m_handle_add_2');
	}

	m_handle_add_3() {
		alert('m_handle_add_3');
	}

	m_handle_click(e) {
		render(
			<Overlay>
				<OButton onClick=(e=>this.m_handle_add_0())>Menu A</OButton>
				<OButton onClick=(e=>this.m_handle_add_1())>Menu B------C</OButton>
				<OButton onClick=(e=>this.m_handle_add_2())>Menu C</OButton>
				<OButton onClick=(e=>this.m_handle_add_3())>Menu D</OButton>
			</Overlay>
		).showOverlayWithView(e.sender);
	}

	render() {
		return super.render(
			<Indep alignX="right" alignY="center" x=-10>
				<Button textFamily="icomoon-ultimate" textColor="#fff" textSize=20 onClick="m_handle_click">\ued5d</Button>
			</Indep>
		);
	}
}

/**
 * @class IndexToolbar
 */
class IndexToolbar extends Toolbar {

	m_handle_click(e) {
		alert('Toolbar');
	}

	render() {
		return super.render(
			<Hybrid textAlign="center" width="full" height="full">
				<Button onClick="m_handle_click" backgroundColor="#f00" margin="auto" height=24 width=24>ok</Button>
			</Hybrid>
		);
	}
}

/*
 * @class Index Page
 */
export default class Index extends NavPage {

	constructor() {
		super();
		this.title = '钱包';
		this.navbar = <IndexNavbar />;
		this.toolbar = <IndexToolbar />;
	}

	m_handle_click(e) {
		// this.collection.push(<Index toolbar.hidden=true />, 1);
	}

	render() {
		return super.render(
			<Div>
				<Button onClick="m_handle_click">Hello world</Button>
			</Div>
		);
	}

}
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

import { Indep,Button,Hybrid,Div, atomPixel } from 'langou';
import { NavPage, Toolbar, Navbar } from 'langou/nav';
import { alert } from 'langou/dialog';

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
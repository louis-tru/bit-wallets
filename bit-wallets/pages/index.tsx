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
	Indep,Button,Hybrid,Div, TextNode, default as ngui, _CVD
} from 'ngui';
import { NavPage, Toolbar, Navbar } from 'ngui/nav';
import { alert } from 'ngui/dialog';
import Menu from '../menu';
import IndexWallet from './index_wallet';
import IndexPrice from './index_price';
import IndexMy from './index_my';
import WalletAdds from './wallet_adds';
import {Event, GUIClickEvent} from 'ngui/event';
import {prop} from 'ngui/ctr';

ngui.css({
	'.index': {
		width: '100%',
		height: '100%',
	},
	'.toolbar_btn': {
		marginTop: 8,
		textSize: 20,
		textFamily: 'icomoon-ultimate',
		textAlign: 'center',
		width: '33.3%',
		textLineHeight: 20,
	},
	'.toolbar_btn .txt': {
		textSize: 10,
	},
});

/**
 * @class IndexNavbar
 */
class IndexNavbar extends Navbar {

	private m_handle_menu_item(e: Event<number>) {
		if (e.data == 0) {
			// alert('添加钱包');
			this.collection.push(<WalletAdds />, true);
		} else if (e.data == 1) {
			alert('扫一扫');
		} else if (e.data == 2) {
			alert('收付款');
		}
	}

	private m_handle_show_menu(e: GUIClickEvent) {
		ngui.render<Menu>(
			<Menu items={[
				{icon:'\ueb4d',text:'添加钱包'},
				{icon:'\ue9f8',text:'扫一扫'},
				{icon:'\uea15',text:'收付款'},
			]} onItemAction={(e:any)=>this.m_handle_menu_item(e)} />
		).showOverlayFromView(e.sender);
	}

	render() {
		return super.render(
			<Indep alignX="right" alignY="center" x={-10}>
				<Button textFamily="icomoon-ultimate" textColor="#fff" textSize={20} onClick="m_handle_show_menu">\ued5d</Button>
			</Indep>
		);
	}
}

/**
 * @class IndexToolbar
 */
class IndexToolbar extends Toolbar {

	@prop selected = 0;

	private m_handle_click(e: GUIClickEvent) {
		this.selected = (e.sender as any).index;
	}

	render() {
		return super.render(
			<Hybrid textAlign="center" width="full" height="full">
				<Button onClick="m_handle_click" index={0} class="toolbar_btn" textColor={this.selected==0?'#0079ff':'inherit'}>
					<TextNode value="\uea10" />
					<TextNode value="\n钱包" class="txt" />
				</Button>
				<Button onClick="m_handle_click" index={1} class="toolbar_btn" textColor={this.selected==1?'#0079ff':'inherit'}>
					<TextNode value="\ueb90" />
					<TextNode value="\n行情" class="txt" />
				</Button>
				<Button onClick="m_handle_click" index={2} class="toolbar_btn" textColor={this.selected==2?'#0079ff':'inherit'}>
					<TextNode value="\ueb08" />
					<TextNode value="\n我" class="txt" />
				</Button>
			</Hybrid>
		);
	}
}

/*
 * @class Index Page
 */
export default class Index extends NavPage {

	@prop selected = 0;

	m_handle_update_toolbar(e: Event<void, IndexToolbar>) {
		this.selected = e.sender.selected;
		this.title = ['钱包', '行情', '我'][this.selected];
	}

	constructor() {
		super();
		this.navbar = <IndexNavbar />;
		this.toolbar = <IndexToolbar onUpdate={(e:any)=>this.m_handle_update_toolbar(e)} />;
	}

	render() {
		return super.render(
			<Div class="index">
				{this.selected==0?<IndexWallet />:null}
				{this.selected==1?<IndexPrice />:null}
				{this.selected==2?<IndexMy />:null}
			</Div>
		);
	}

}
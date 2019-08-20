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

import { Div, Image, Indep, Input, CSS } from 'langou';
import { NavPage, Toolbar } from 'langou/nav';
import { alert, sheet } from 'langou/dialog';
import { NavBtn, Btn } from '../btns';
import Create from './wallet_create';
import Import from './wallet_import';

const {resolve} = require;

/**
 * @class WalletAdds
 */
export default class WalletAdds extends NavPage {

	constructor() {
		super();
		this.title = '添加钱包';
		this.toolbar.hidden = true;
	}
	

	m_handle_click(e) {
		var type = e.sender.id;
		sheet(['导入','创建'], (index)=>{
			if (index == 2) {
				this.collection.push(<Create type=type title=`创建 ${type} 钱包` />, 1);
			} else if (index == 1) {
				this.collection.push(<Import type=type title=`导入 ${type} 钱包` />, 1);
			}
		});
	}

	render() {
		return super.render(
			<Div class="index">
				<NavBtn id="BTC" icon=(resolve('../img/BTC-128.png')) onClick="m_handle_click" text="BTC" desc="支持USDT" />
				<NavBtn id="ETH" icon=(resolve('../img/ETH-128.png')) onClick="m_handle_click" text="ETH" />
				<NavBtn id="EOS" icon=(resolve('../img/EOS-128.png')) onClick="m_handle_click" text="EOS" />
				<NavBtn id="DOT" icon=(resolve('../img/DOT-128.png')) onClick="m_handle_click" text="DOT" />
			</Div>
		);
	}
}

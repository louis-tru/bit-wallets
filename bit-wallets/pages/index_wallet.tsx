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
	Scroll, ViewController, _CVD
} from 'ngui';
import {NavBtnPrice} from '../btns';
import WalletDetails from './wallet_details';
import {GUIClickEvent} from 'ngui/event';
import {NavPage, Toolbar} from 'ngui/nav';

const {resolve} = require;

export default class IndexWallet extends ViewController {

	m_handle_click(e: GUIClickEvent<void, NavBtnPrice>) {
		this.ownerAs<NavPage>().collection.push(<WalletDetails toolbar={<Toolbar hidden={true} />} title={e.sender.text} />, true);
	}

	render() {
		return (
			<Scroll class="index">
				<NavBtnPrice icon={resolve('../img/BTC-128.png')} onClick="m_handle_click" text="BTC-Wallet" balance="1.01" money="7980.00" />
				<NavBtnPrice icon={resolve('../img/ETH-128.png')} onClick="m_handle_click" text="ETH-Wallet" balance="2.42" money="300.00" />
			</Scroll>
		);
	}
}
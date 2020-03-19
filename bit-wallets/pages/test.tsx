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
	Div,Scroll,
} from 'ngui';
import { NavPage } from 'ngui/nav';
import { Btn } from '../btns';

import Index from './index';
import MnemonicWord from './mnemonic_word';
import WalletSettings from './wallet_settings';
import BackupTip from './backup_tip';
import ExportKeystore from './export_keystore';
import NoSecretPayment from './no_secret_payment';

export default class Test extends NavPage {
	render() {
		return super.render(
			<Scroll width="100%" height="100%">
				<Div width="100%" height=5 />
				<Btn onClick=(e=>this.collection.push(Index, 1))>Index</Btn>
				<Btn onClick=(e=>this.collection.push(ExportKeystore, 1))>ExportKeystore</Btn>
				<Btn onClick=(e=>this.collection.push(BackupTip, 1))>BackupTip</Btn>
				<Btn onClick=(e=>this.collection.push(WalletSettings, 1))>WalletSettings</Btn>
				<Btn onClick=(e=>this.collection.push(MnemonicWord, 1))>MnemonicWord</Btn>
				<Btn onClick=(e=>this.collection.push(NoSecretPayment, 1))>NoSecretPayment</Btn>
			</Scroll>
		);
	}
}

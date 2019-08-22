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

import { CSS, Hybrid, Button } from 'langou';
import { NavPage, Toolbar } from 'langou/nav';
import Tabs, {TabPanel} from '../tabs';

const {resolve} = require;

CSS({
	'.wimport': {
	},
});

/**
 * @class Import
*/
export default class Import extends NavPage {
	constructor() {
		super();
		this.toolbar = (
			<Toolbar>
				<Hybrid textAlign="center" width="100%" height="100%">
					<Button height=20 margin=8 textSize=14>了解Keystore</Button>
				</Hybrid>
			</Toolbar>
		);
	}
	render() {
		return super.render(
			<Tabs>
				<TabPanel title="Keystore">Keystore</TabPanel>
				<TabPanel title="助记词">助记词</TabPanel>
				<TabPanel title="私钥">私钥</TabPanel>
			</Tabs>
		);
	}
	m_handle_click() {
		// alert('导入');
	}
}

Import.defineProps(['type']);

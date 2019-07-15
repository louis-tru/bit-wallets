
import 'langou/util';
import { GUIApplication, Root, Indep, Button, Hybrid, } from 'langou';
import { NavpageCollection, Toolbar, Navpage } from 'langou/nav';
import { alert } from 'langou/dialog';

import 'ajv';
import 'bn.js';

var default_toolbar_vx = (
	<Toolbar>
		<Hybrid textAlign="center" width="full" height="full">
			<Button onClick=(e=>alert('ABCDEFG')) backgroundColor="#f00">ok</Button>
		</Hybrid>
	</Toolbar>
)

new GUIApplication({
	multisample: 4,
	width: 420,
	height: 800,
	fullScreen: util.options.full_screen || 0,
	enableTouch: 1,
	background: 0x000000,
	title: 'BITWallets',
}).start(
	<Root>
		<NavpageCollection id="npc" defaultToolbar=default_toolbar_vx>
			<Navpage title="钱包">
				Hello world
			</Navpage>
		</NavpageCollection>
	</Root>
);

import React from 'react';

import {Github} from './icons';

import '../styles/header.scss';

export const Header = () => (
	<header>
		<div className="header-start">
			<a href="/">melusc.github.io</a>
		</div>
		<div className="header-end">
			<a href="https://github.com/melusc" rel="noreferrer noopener">
				<Github />
			</a>
		</div>
	</header>
);

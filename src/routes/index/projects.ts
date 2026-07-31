/*
	This file is part of lusc.ch, the author's personal website.
	Copyright (C) 2026, Luca Schnellmann <oss@lusc.ch>

	This program is free software: you can redistribute it and/or modify
	it under the terms of the GNU General Public License as published by
	the Free Software Foundation, either version 3 of the License, or
	(at your option) any later version.

	This program is distributed in the hope that it will be useful,
	but WITHOUT ANY WARRANTY; without even the implied warranty of
	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	GNU General Public License for more details.
*/

import type {RouteId} from '$app/types';

type Entry = {
	key: string;
	text: string;
	description: string;
};

export type ExternalLink = Entry & {
	href: `https://${string}`;
};

export type LocalLink = Entry & {
	href: RouteId;
};

export type Section = {
	key: string;
	title: string;
} & (
	| {
			variant: 'links';
			entries: readonly ExternalLink[];
	  }
	| {
			variant: 'projects';
			entries: readonly LocalLink[];
	  }
);

export default [
	{
		key: 'links',
		title: 'Links',
		variant: 'links',
		entries: [
			{
				key: 'eth',
				text: 'eth.lusc.ch',
				description: 'ETH things.',
				href: 'https://eth.lusc.ch',
			},
		],
	},
	{
		key: 'projects',
		title: 'Projects',
		variant: 'projects',
		entries: [
			{
				description:
					'A sudoku solver that can solve hard sudokus using multiple strategies such as "Hidden Pairs", "Naked Pairs", and "Pointing Arrows".',
				href: '/sudoku',
				key: 'sudoku-solver',
				text: 'Sudoku Solver',
			},
			{
				description: 'A 3D version of Tic Tac Toe.',
				href: '/3d-tic-tac-toe',
				key: '3d-tic-tac-toe',
				text: '3D Tic Tac Toe',
			},
			{
				description:
					'A truth table generator which goes through all the possible combinations and lists them in a table.',
				href: '/truth-table',
				key: 'truth-table',
				text: 'Truth table',
			},
			{
				description:
					'A tool to generate TypeScript definitions from JSON. Uses @lusc/json-dts.',
				href: '/json-dts',
				key: 'json-dts',
				text: 'JSON Dts',
			},
			{
				description:
					'A tool to unlock .docx and .xlsx that have been set to read-only.',
				href: '/unlock-office-documents',
				key: 'unlock-office-documents',
				text: 'Unlock Office Documents',
			},
			{
				description:
					"A little page which imitates Samsung Health, but instead of actually exercising you can just modify the values right from your sofa. I made this so I don't have to do PE homework when I don't feel like doing it.",
				href: '/fake-fitness-app',
				key: 'fake-fitness-app',
				text: 'Fake Fitness App',
			},
			{
				description:
					'A simple page in which you can convert hex from and to rgb.',
				href: '/hex-to-rgb',
				key: 'hex-to-rgb',
				text: 'Hex-RGB Converter',
			},
			{
				description:
					'Calculate the least common multiple (LCM) and greatest common divisor (GCD).',
				href: '/lcm-gcd',
				key: 'lcm-gcd',
				text: 'LCM & GCD Calculator',
			},
			{
				description: 'A fancy clock made up of bars moving up and down.',
				href: '/line-clock',
				key: 'line-clock',
				text: 'Line Clock',
			},
			{
				description: 'A tool which allows you to sort JSON5 by its keys.',
				href: '/sort-json5-keys',
				key: 'sort-json5-keys',
				text: 'Sort JSON5',
			},
			{
				description: 'A triangle that moves around and flashes.',
				href: '/animated-triangle',
				key: 'animated-triangle',
				text: 'Animated Triangle',
			},
		],
	},
] as const satisfies readonly Section[];

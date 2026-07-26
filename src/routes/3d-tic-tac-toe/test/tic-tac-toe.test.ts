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

import {expect, test, vi} from 'vitest';

import {TicTacToe, resolveIndex} from '../tic-tac-toe.ts';

test('#resolveIndex', () => {
	let index = 0;

	for (let z = 0; z < 4; ++z) {
		for (let y = 0; y < 4; ++y) {
			for (let x = 0; x < 4; ++x) {
				expect(resolveIndex(x, y, z)).toStrictEqual(index++);
			}
		}
	}
});

const collator = new Intl.Collator('en-GB', {
	numeric: true,
});

test('#getGroups', () => {
	const t = new TicTacToe();

	const foundGroups: string[] = Array.from(t.getGroups(), group =>
		group.map(({index}) => index).join(', '),
	);

	// prettier-ignore
	const expectedSize
		= (3 * 4 * 4) // "Flat" groups, like rows, 3 directions, 4 layers, 4 per layer
		+ (2 * 4 * 3) // 2d diagonals, 2 per layer, 4 layers, 3 directiosn
		+ 4; // 3d diagonals

	const deduplicated = new Set(foundGroups.toSorted(collator.compare));

	expect(deduplicated).toMatchSnapshot();
	// Test if it contains all
	expect(deduplicated.size).toStrictEqual(expectedSize);
	// Test that there are also no duplicates
	expect(foundGroups.length).toStrictEqual(expectedSize);
});

test('Winning', () => {
	const t = new TicTacToe();

	const handler = vi.fn();
	t.on('win', handler);

	for (const move of [0, 4, 1, 5, 2, 6, 3]) {
		t.makeMove(move);
	}

	expect(handler).toHaveBeenCalledOnce();
});

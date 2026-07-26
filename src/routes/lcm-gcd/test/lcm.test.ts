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

import {expect, test} from 'vitest';

import {absBigInt, lcm, lcmArray} from '../math.js';

test('-1 should return 1n', () => {
	expect(absBigInt(-1)).toBe(1n);
});

test('-1n should return 1n', () => {
	expect(absBigInt(-1n)).toBe(1n);
});

test('20 should return 20n', () => {
	expect(absBigInt(20)).toBe(20n);
});

test('4, 12 should return 12n', () => {
	expect(lcm(4, 12)).toBe(12n);
});

test('4n, 12n should return 12n', () => {
	expect(lcm(4n, 12n)).toBe(12n);
});

test('[] should return ""', () => {
	expect(lcmArray([])).toBe('');
});

test('[1] should return "1"', () => {
	expect(lcmArray([1])).toBe('1');
});

test('4, 20, 12 should return "60"', () => {
	expect(lcmArray([4, 20, 12])).toBe('60');
});

test('1..10 should return "2520"', () => {
	expect(lcmArray(Array.from({length: 10}, (_v, index) => index + 1))).toBe(
		'2520',
	);
});

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

import {test, expect} from 'vitest';

import {gcd, gcdArray} from '../math.js';

test('gcd 150, 100 should return 50', () => {
	expect(gcd(150, 100)).toBe(50n);
});

test('gcd -5, -10 should return -5', () => {
	expect(gcd(-5, -10)).toBe(-5n);
});

test('gcd -5, -6 should return -1', () => {
	expect(gcd(-5, -6)).toBe(-1n);
});

test('gcd 50, 100 should return 50', () => {
	expect(gcd(50, 100)).toBe(50n);
});

test('gcd 13, 17 should return 1', () => {
	expect(gcd(13, 17)).toBe(1n);
});

test('gcdArray [15, 150, 45] should return "15"', () => {
	expect(gcdArray([15, 150, 45])).toBe('15');
});

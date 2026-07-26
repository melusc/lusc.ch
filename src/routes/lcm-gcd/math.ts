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

type ExpectedNumber = number | bigint;

export function absBigInt(n: ExpectedNumber): bigint {
	// eslint-disable-next-line unicorn/prefer-math-abs
	return BigInt(n < 0 ? -n : n);
}

const cache = new Map<string, bigint>();

export function gcd(a_: ExpectedNumber, b_: ExpectedNumber): bigint {
	const bothNegative = a_ < 0 && b_ < 0;

	const a = absBigInt(a_);
	const b = absBigInt(b_);

	let [dividend, divisor] = a > b ? [a, b] : [b, a];

	const key = `${dividend},${divisor}`;

	if (cache.has(key)) {
		return cache.get(key)!;
	}

	let leftover = 1n;

	while (leftover !== 0n) {
		leftover = dividend % divisor;
		if (leftover !== 0n) {
			dividend = divisor;
			divisor = leftover;
		}
	}

	if (bothNegative) {
		divisor *= -1n;
	}

	cache.set(key, divisor);

	return divisor;
}

export function lcm(a: ExpectedNumber, b: ExpectedNumber): bigint {
	return (absBigInt(a) * absBigInt(b)) / gcd(a, b);
}

function wrap(function_: (a: ExpectedNumber, b: ExpectedNumber) => bigint) {
	return (numbers: ExpectedNumber[]): string => {
		let result: ExpectedNumber | undefined;

		for (const n of numbers) {
			result = result === undefined ? n : function_(result, n);
		}

		if (result === undefined) {
			return '';
		}

		return String(result);
	};
}

export const gcdArray = wrap(gcd);
export const lcmArray = wrap(lcm);

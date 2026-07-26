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

import hexRgb_ from 'hex-rgb';

export function hexRgb(hex: string): {
	red: number;
	green: number;
	blue: number;
	alpha: number | undefined;
} {
	hex = hex.trim().replace(/^#/, '');
	const {red, green, blue, alpha} = hexRgb_(hex);

	return {
		red,
		green,
		blue,
		alpha: [4, 8].includes(hex.length)
			? Math.round(alpha * 100) / 100
			: undefined,
	};
}

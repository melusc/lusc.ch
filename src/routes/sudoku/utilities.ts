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

import type {Sudoku} from '@lusc/sudoku';

export type Cell = {
	element: string | undefined;
	isValid: boolean;
	key: string;
};

export function getCells(sudoku: Sudoku): readonly Cell[] {
	const result: Cell[] = [];

	for (const cell of sudoku.getCells()) {
		const element = sudoku.getElement(cell);
		const isValid = sudoku.isCellValid(cell);
		result.push({
			element,
			isValid,
			key: [cell.index, element, isValid].join(','),
		});
	}

	return result;
}

export type MetaKeys = {
	ctrl?: boolean;
	alt?: boolean;
	shift?: boolean;
};

export function getNewFocused(
	key: string,
	focused: number,
	{shift, ctrl}: MetaKeys,
): number {
	key = key.toLowerCase();

	switch (key) {
		case 'arrowdown':
		case 'arrowup': {
			// Always wrap around to the *same* column

			const direction = key === 'arrowdown' ? 9 : -9;

			return (focused + direction + 81) % 81;
		}

		case 'arrowright':
		case 'arrowleft': {
			// Always wrap around to the *same* row

			const direction = key === 'arrowright' ? 1 : -1;

			const col = (focused % 9) + direction;

			if (col < 0) {
				return focused + 8;
			}

			if (col > 8) {
				return focused - 8;
			}

			return focused + direction;
		}

		case ' ': {
			return (focused + 1) % 81;
		}

		case 'tab': {
			// If shift, go backwards
			const direction = shift ? -1 : 1;

			return (focused + direction + 81) % 81;
		}

		case 'backspace': {
			// Back one step, wrap around to last cell
			return (focused + 80) % 81;
		}

		default: {
			// Ctrl + 1 takes you to the first tab so ignore those
			if (!ctrl && /^[1-9]$/.test(key)) {
				return (focused + 1) % 81;
			}
		}
	}

	return focused;
}

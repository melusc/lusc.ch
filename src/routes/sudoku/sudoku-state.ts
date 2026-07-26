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

import {Sudoku, type SubscriptionCallback} from '@lusc/sudoku';
import {get, writable, type Subscriber, type Unsubscriber} from 'svelte/store';

import {getCells, type Cell} from './utilities.ts';

type SudokuState = {
	cells: readonly Cell[];
	error: undefined | string;
	focused: number;
};

export function makeSudokuState(initialSudoku: Sudoku): {
	subscribe: (
		run: Subscriber<SudokuState>,
		invalidate?: () => void,
	) => Unsubscriber;
	clearCell(): void;
	reset(): void;
	setFocus(index: number): void;
	setElement(value: string): void;
	solve(): void;
} {
	let sudoku = initialSudoku;
	const store = writable<SudokuState>({
		focused: 0,
		error: undefined,
		cells: getCells(sudoku),
	});
	const {subscribe, set, update} = store;

	const sudokuSubscriber: SubscriptionCallback = (sudoku_, type): void => {
		const cells = getCells(sudoku_);
		let error: undefined | string;

		switch (type) {
			case 'change': {
				error = undefined;

				break;
			}

			case 'finish': {
				const isSolved = sudoku_.isSolved();
				error = isSolved ? undefined : "Sudoku wasn't solved completely.";

				break;
			}

			case 'error': {
				error = 'Sudoku is invalid!';

				break;
			}
		}

		update(state => ({...state, error, cells}));
	};

	sudoku.subscribe(sudokuSubscriber);

	return {
		subscribe,
		clearCell() {
			sudoku.clearCell(get(store).focused);
		},
		reset() {
			sudoku.unsubscribe(sudokuSubscriber);
			sudoku = new Sudoku(9);
			sudoku.subscribe(sudokuSubscriber);
			set({
				focused: 0,
				error: undefined,
				cells: getCells(sudoku),
			});
		},
		setFocus(index: number) {
			update(state => ({...state, focused: index}));
		},
		setElement(value: string) {
			sudoku.setElement(get(store).focused, value);
		},
		solve() {
			sudoku.solve();
		},
	};
}

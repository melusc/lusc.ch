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

export function sortJson(value: unknown): unknown {
	if (typeof value !== 'object' || value === null) {
		return value;
	}

	if (Array.isArray(value)) {
		return value.map(value => sortJson(value));
	}

	const keys = Object.keys(value).toSorted((a, b) =>
		a.localeCompare(b, 'en', {
			sensitivity: 'case',
			caseFirst: 'lower',
		}),
	);

	const object: Record<string, unknown> = {};

	for (const key of keys) {
		object[key] = sortJson((value as Record<string, unknown>)[key]);
	}

	return object;
}

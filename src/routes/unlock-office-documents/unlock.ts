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

import type JSZip from 'jszip';
import jszip from 'jszip';

export async function unlock(file: File): Promise<Blob> {
	let zip: JSZip;
	try {
		zip = await jszip.loadAsync(file);
	} catch {
		throw new Error('Could not open file as zip');
	}

	const parser = new DOMParser();
	const serializer = new XMLSerializer();

	await Promise.all(
		Object.entries(zip.files).map(async ([name, file]) => {
			if (!name.endsWith('.xml')) {
				return;
			}

			const text = await file.async('text');
			if (
				!/sheetprotection|workbookprotection|documentprotection/i.test(text)
			) {
				return;
			}

			const dom = parser.parseFromString(text, 'text/xml');

			for (const element of dom.querySelectorAll(
				'sheetProtection, workbookProtection, documentProtection',
			)) {
				element.remove();
			}

			zip.file(name, serializer.serializeToString(dom));
		}),
	);

	return zip.generateAsync({type: 'blob'});
}

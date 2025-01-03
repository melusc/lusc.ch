import type JSZip from 'jszip';
import {loadAsync} from 'jszip';

export async function unlock(file: File): Promise<Blob> {
	let zip: JSZip;
	try {
		zip = await loadAsync(file);
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

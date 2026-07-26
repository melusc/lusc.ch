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

import {readdir, writeFile} from 'node:fs/promises';
import {gzipSync} from 'node:zlib';

const buildDirectoryPath = new URL('../build/', import.meta.url);

const sitemapLines = [
	'<?xml version="1.0" encoding="UTF-8"?>',
	'<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
];

const files = await readdir(buildDirectoryPath, {
	withFileTypes: true,
});
for (const file of files) {
	if (!file.isFile() || !file.name.endsWith('.html')) {
		continue;
	}

	const name = file.name.replace(/\.html$/, '');
	if (name === '404') {
		continue;
	}

	const url = new URL(name === 'index' ? '' : name, 'https://lusc.ch');

	sitemapLines.push(
		'\t<url>',
		`\t\t<loc>${url.href}</loc>`,
		'\t\t<changefreq>monthly</changefreq>',
		'\t</url>',
	);
}

sitemapLines.push('</urlset>');

await writeFile(
	new URL('../build/sitemap.xml', import.meta.url),
	sitemapLines.join('\n'),
);

await writeFile(
	new URL('../build/sitemap.xml.gz', import.meta.url),
	gzipSync(sitemapLines.join('\n')),
);

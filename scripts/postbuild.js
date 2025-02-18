import {readdir, writeFile} from 'node:fs/promises';
import {gzipSync} from 'node:zlib';

const buildDirectoryPath = new URL('../build/', import.meta.url);

const sitemapLines = [
	'<?xml version="1.0" encoding="UTF-8"?>',
	'<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
];

// eslint-disable-next-line security/detect-non-literal-fs-filename
for (const file of await readdir(buildDirectoryPath, {
	withFileTypes: true,
})) {
	if (!file.isFile() || !file.name.endsWith('.html')) {
		continue;
	}

	const name = file.name.replace(/\.html$/, '');
	if (name === '404') {
		continue;
	}

	const url = new URL(`${name === 'index' ? '' : name}`, 'https://lusc.ch');

	sitemapLines.push(
		'\t<url>',
		`\t\t<loc>${url.href}</loc>`,
		'\t\t<changefreq>monthly</changefreq>',
		'\t</url>',
	);
}

sitemapLines.push('</urlset>');

// eslint-disable-next-line security/detect-non-literal-fs-filename
await writeFile(
	new URL('../build/sitemap.xml', import.meta.url),
	sitemapLines.join('\n'),
);

// eslint-disable-next-line security/detect-non-literal-fs-filename
await writeFile(
	new URL('../build/sitemap.xml.gz', import.meta.url),
	gzipSync(sitemapLines.join('\n')),
);

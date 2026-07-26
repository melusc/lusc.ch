<!--
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
-->

<script lang="ts">
	import DownloadIcon from './icons/download.svelte';

	const {file, name}: {file: Blob; name: string} = $props();

	let url = $state<string>();

	$effect(() => {
		if (url !== undefined) {
			URL.revokeObjectURL(url);
		}

		url = URL.createObjectURL(file);
	});
</script>

<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
<a href={url} download={name}>
	<DownloadIcon /> Download unlocked file
</a>

<style>
	a {
		margin-top: 2em;

		display: block;
		padding: 10px;
		text-align: center;
		border-radius: 5px;
		text-decoration: none;

		display: flex;
		align-items: center;
		justify-content: center;
		gap: 6px;

		font-size: 1.4em;
	}

	a :global(svg) {
		height: 1.1em;
	}
</style>

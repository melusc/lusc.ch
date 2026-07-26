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
	import json5 from 'json5';

	import {sortJson} from './sort.ts';
	import './style.scss';

	let input = $state('{}');

	function trySort(input: string) {
		try {
			const json = sortJson(json5.parse(input));

			return {
				errorMessage: undefined,
				output: JSON.stringify(json, undefined, '\t'),
			};
		} catch (error: unknown) {
			return {
				errorMessage: error instanceof Error ? error.message : String(error),
				output: '',
			};
		}
	}

	const {output, errorMessage} = $derived(trySort(input));
</script>

<svelte:head>
	<title>Sort json5 by its keys</title>
</svelte:head>

<div id="sort-json5-keys">
	<textarea placeholder="Paste JSON5 here" bind:value={input}></textarea>
	<div class="error">{errorMessage ?? ''}</div>
	<textarea readonly value={output}></textarea>
</div>

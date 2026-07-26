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
	import {jsonDts} from '@lusc/json-dts';

	import type {JsonValue} from '../../common/type-helpers.js';

	import './style.scss';

	let input = $state(
		JSON.stringify(
			{
				id: 0,
				data: {
					age: 20,
					name: 'Bob Smith',
				},
			},
			undefined,
			2,
		),
	);

	function tryJsonDts(input: string) {
		try {
			const json = JSON.parse(input) as JsonValue;
			return {invalid: false, output: jsonDts(json)};
		} catch {
			return {invalid: true, output: ''};
		}
	}

	const {invalid, output} = $derived(tryJsonDts(input));
</script>

<svelte:head>
	<title>JSON Dts</title>
</svelte:head>

<div id="json-dts">
	<textarea bind:value={input} class:invalid></textarea>
	<textarea readonly value={output}></textarea>
</div>

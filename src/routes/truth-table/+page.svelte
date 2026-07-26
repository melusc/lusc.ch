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
	import {operationToString} from '@lusc/truth-table';

	import Checkbox from './components/checkbox.svelte';
	import Input from './components/input.svelte';
	import RenderError from './components/render-error.svelte';
	import Table from './components/table.svelte';
	import {getHash, tryGenerateTable} from './utilities.ts';

	import {browser} from '$app/environment';

	let input = $state('a & b -> (a | b)');
	let includeSteps = $state(true);
	let sortVariables = $state(true);
	const parsed = $derived(
		tryGenerateTable(input, {
			includeSteps,
			sortVariables,
		}),
	);

	function getInputFromHash(): void {
		const hashInput = getHash();
		if (hashInput && hashInput !== input) {
			input = hashInput;
		}
	}
	if (browser) {
		getInputFromHash();
	}

	$effect(() => {
		if (!browser) {
			return;
		}

		// eslint-disable-next-line svelte/prefer-svelte-reactivity
		const newUrl = new URL(location.href);

		let newHash: string;
		let shouldPush = true;

		if (parsed.valid) {
			newHash = operationToString(parsed.table.ast).replace(/^\((.+)\)$/, '$1');
		} else {
			newHash = input;

			// If last was valid don't override it, i.e. pushState
			// if last was invalid, it's not very valuable: replaceState
			shouldPush = parsed.valid;
		}

		newHash = newHash.trim();
		const oldHash = getHash();

		if (newHash !== oldHash) {
			newUrl.hash = newHash;

			if (shouldPush) {
				history.pushState({}, '', newUrl);
			} else {
				history.replaceState({}, '', newUrl);
			}
		}
	});
</script>

<svelte:window on:hashchange={getInputFromHash} />
<svelte:head>
	<title>Truth Table Generator</title>
</svelte:head>

<div id="truth-table">
	<Input bind:input />
	<div class="checkboxes">
		<Checkbox bind:checked={includeSteps} label="Include steps" />
		<Checkbox bind:checked={sortVariables} label="Sort variables" />
	</div>
	{#if parsed.valid}
		<Table table={parsed.table} />
	{:else}
		<RenderError {input} error={parsed.error} />
	{/if}
</div>

<style lang="scss">
	@use '../../common/fonts/JetBrainsMono-Regular.scss';

	#truth-table {
		display: flex;
		flex-direction: column;
		gap: 1em;

		font-size: 23px;
		padding: 0.5em 1em;

		--table-border: 3px solid var(--border);
	}

	.checkboxes {
		display: flex;
		gap: 1em;
	}
</style>

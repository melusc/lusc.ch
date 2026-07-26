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
	import type {FormEventHandler} from 'svelte/elements';

	let {input = $bindable()}: {input: string} = $props();

	const handleInput: FormEventHandler<HTMLInputElement> = event => {
		input = event.currentTarget.value.normalize('NFKC');
	};
</script>

<input type="text" value={input} oninput={handleInput} />

<style>
	input {
		font: inherit;
		background: none;
		border: none;
		outline: none;
		color: inherit;

		border-bottom: var(--table-border);
		padding: 0.3em;

		width: 100%;
	}
</style>

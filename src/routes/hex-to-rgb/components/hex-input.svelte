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
	import rgbHex from 'rgb-hex';
	import type {FormEventHandler} from 'svelte/elements';

	import {hexRgb} from '../utilities.ts';

	import FancyBorder from './fancy-border.svelte';

	let {
		red = $bindable(),
		green = $bindable(),
		blue = $bindable(),
		alpha = $bindable(),
	}: {
		red: number;
		green: number;
		blue: number;
		alpha: number | undefined;
	} = $props();

	const hex = $derived('#' + rgbHex(red, green, blue, alpha));
	let valid = $state(true);

	const handleInput: FormEventHandler<HTMLInputElement> = event => {
		try {
			const input = event.currentTarget.value.trim();
			({red, green, blue, alpha} = hexRgb(input));
			valid = true;
		} catch {
			valid = false;
		}
	};
</script>

<input
	maxLength={9}
	placeholder="#"
	name="hex"
	class:invalid={!valid}
	oninput={handleInput}
	value={hex}
/>
<FancyBorder />

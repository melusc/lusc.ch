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
	import type {FormEventHandler, WheelEventHandler} from 'svelte/elements';

	import FancyBorder from './fancy-border.svelte';

	let {name, value = $bindable()}: {name: string; value: number} = $props();
	let valid = $state(true);

	function clamp(value: number): number {
		value = Math.round(value);
		// Minimum 0
		value = Math.max(0, value);
		// Maximum 255
		return Math.min(value, 255);
	}

	const handleScroll: WheelEventHandler<HTMLInputElement> = event => {
		const direction = Math.sign(event.deltaY);

		value += direction;
		value = clamp(value);
	};

	const handleInput: FormEventHandler<HTMLInputElement> = event => {
		const input = event.currentTarget.value.trim();
		const parsed = Number(input);

		if (Number.isNaN(parsed)) {
			valid = false;
		} else {
			value = clamp(parsed);
			valid = true;
		}
	};
</script>

<input
	type="number"
	min="0"
	max="255"
	maxLength={3}
	{name}
	placeholder={name}
	class:invalid={!valid}
	value={String(value)}
	onwheel={handleScroll}
	oninput={handleInput}
/>
<FancyBorder />

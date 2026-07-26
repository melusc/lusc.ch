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

	let {value = $bindable()}: {value: number | undefined} = $props();
	let invalid = $state(false);

	function clamp(alpha: number): number {
		alpha = Math.round(alpha * 100) / 100;
		// Minimum 0
		alpha = Math.max(0, alpha);
		// Maximum 255
		return Math.min(alpha, 1);
	}
	const handleScroll: WheelEventHandler<HTMLInputElement> = event => {
		const direction = Math.sign(event.deltaY);
		value ??= 0;

		value += direction * 0.01;
		value = clamp(value);
	};

	const handleInput: FormEventHandler<HTMLInputElement> = event => {
		const input = event.currentTarget.value.trim();
		const parsed = Number(input);
		invalid = false;

		if (input === '') {
			value = undefined;
		} else if (Number.isNaN(parsed)) {
			invalid = true;
		} else {
			value = clamp(parsed);
		}
	};
</script>

<input
	type="number"
	min={0}
	max={1}
	placeholder="[alpha]"
	step={0.01}
	name="alpha"
	class:invalid
	value={String(value)}
	onwheel={handleScroll}
	oninput={handleInput}
/>
<FancyBorder />

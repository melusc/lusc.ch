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
	import {getTextWidth} from '../utilities.ts';

	import BatteryIcon from './icons/battery.svelte';

	// Allow all numbers from 1-100
	// Disallow leading zeroes and zero
	const isValidBatteryValue = (v: string): boolean =>
		/^(?:[1-9]\d?|100)%$/.test(v.trim());

	let batteryLevel = $state('100%');
	const inputWidth = $derived(
		Math.max(
			getTextWidth(batteryLevel, `${0.9 * 2.3}vmin "Samsung Sans"`) * 1.1,
			10,
		),
	);
</script>

<input
	class="input-remove-input-visuals battery-input"
	class:invalid={!isValidBatteryValue(batteryLevel)}
	bind:value={batteryLevel}
	style:width={`${inputWidth}px`}
/>
<BatteryIcon {batteryLevel} />

<style>
	.battery-input {
		width: 5ch;

		text-align: right;

		margin: 0 1px;
	}
</style>

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
	import {gcdArray, lcmArray} from './math.ts';
	import {States, parseInput} from './parse-input.ts';
	import './style.scss';

	let input = $state('');

	const {state: state_, uniques} = $derived(parseInput(input));
</script>

<svelte:head>
	<title>LCM & GCD calculator</title>
</svelte:head>

<div id="lcm-gcd">
	<div class="box">
		<input bind:value={input} placeholder="2, 5, 9-13" />

		{#if state_ === States.tooLarge}
			<div>One or more numbers were too large</div>
		{:else if state_ === States.divBy0}
			<div>One or more numbers were 0</div>
		{:else if state_ === States.notAnInteger}
			<div>One or more numbers were not an integer</div>
		{:else if state_ === States.valid}
			{#if uniques?.length}
				<div>Least common multiple: {lcmArray(uniques)}</div>
				<div>Greatest common divisor: {gcdArray(uniques)}</div>
			{:else}
				<div>Enter some numbers</div>
			{/if}
		{/if}
	</div>
</div>

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
	import ClockLine from './clock-line.svelte';
	import './style.scss';

	import {browser} from '$app/environment';

	type TimeValue = [number, number];

	const toTimeValue = (n: number): TimeValue => [Math.floor(n / 10), n % 10];

	let hour = $state<TimeValue>([0, 0]);
	let min = $state<TimeValue>([0, 0]);
	let sec = $state<TimeValue>([0, 0]);

	function update(): void {
		const date = new Date();
		hour = toTimeValue(date.getHours());
		min = toTimeValue(date.getMinutes());
		sec = toTimeValue(date.getSeconds());

		if (browser) {
			requestAnimationFrame(update);
		}
	}

	update();
</script>

<svelte:head>
	<title>Line clock</title>
</svelte:head>

<div id="line-clock">
	<div class="clock">
		<ClockLine to={2} active={hour[0]} />
		<ClockLine to={9} active={hour[1]} />
		<div class="separator">:</div>
		<ClockLine to={5} active={min[0]} />
		<ClockLine to={9} active={min[1]} />
		<div class="separator">:</div>
		<ClockLine to={5} active={sec[0]} />
		<ClockLine to={9} active={sec[1]} />
	</div>
</div>

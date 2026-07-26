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
	import dayjs from 'dayjs';
	import customParseFormat from 'dayjs/plugin/customParseFormat.js';

	import Battery from './battery.svelte';
	import Bluetooth from './icons/bluetooth.svelte';
	import Signal from './icons/signal.svelte';
	import Wifi from './icons/wifi.svelte';
	import TimeInput from './time-input.svelte';

	dayjs.extend(customParseFormat);
</script>

<div class="notification-bar">
	<TimeInput class="clock" />
	<div class="battery-and-icons">
		<Bluetooth />
		<Wifi />
		<Signal />
		<Battery />
	</div>
</div>

<style>
	.notification-bar {
		width: 100%;

		font-size: 0.9em;

		display: grid;
		grid-template-columns: 6.5% auto auto 6%;

		align-items: center;

		color: var(--notification-grey);
	}

	.battery-and-icons {
		justify-self: end;

		display: flex;
		justify-content: flex-end;
		align-items: center;
	}

	.battery-and-icons :global(svg) {
		height: 1.2em;
	}

	.battery-and-icons :global(.icon-reception) {
		height: 1em;
	}

	.notification-bar :global(.clock) {
		grid-column: 2 / 3;

		justify-self: start;

		width: 5ch;
	}
</style>

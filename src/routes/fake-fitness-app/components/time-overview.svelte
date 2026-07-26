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

	import * as CONSTS from '../consts.ts';
	import {isValidDuration, calculateTimePerDistance} from '../utilities.ts';

	import VerticalBorder from './vertical-border.svelte';

	dayjs.extend(customParseFormat);

	let {
		duration = $bindable(),
		distance = $bindable(),
	}: {duration: string; distance: string} = $props();

	const timePerDistance = $derived(
		calculateTimePerDistance(distance, duration),
	);
</script>

<div class="time-overview">
	<div class="duration">
		<input
			bind:value={duration}
			class="input-remove-input-visuals"
			class:invalid={!isValidDuration(duration)}
		/>
	</div>
	<div class="distance">
		<div>
			<input
				bind:value={distance}
				class="input-remove-input-visuals"
				class:invalid={!CONSTS.distanceRegex.test(distance)}
				placeholder="0.00"
			/><small>km</small>
		</div>
		<VerticalBorder height={12} margin={10} />
		<div class="time-per-distance" class:invalid={timePerDistance === false}>
			{timePerDistance === false ? 'Invalid' : timePerDistance}<small>/km</small
			>
		</div>
	</div>
</div>

<style>
	.time-overview {
		color: var(--text-white);

		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

		background-color: var(--card-background);
		border-radius: var(--card-border-radius);
		margin-top: 20px;
		padding: 7vmin 0;
	}
	small {
		margin-left: 2px;
		font-size: 70%;
	}

	.duration {
		font: 1.9em Orbitron;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.duration input {
		width: 80%;
		text-align: center;
	}

	.distance {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 80%;
	}

	.distance input {
		width: 6ch;
		display: inline;
		text-align: right;
		margin-right: 2px;
	}
</style>

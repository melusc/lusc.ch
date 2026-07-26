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
	import * as CONSTS from '../consts.ts';
	import {isValidDuration, parseDuration, toSpeed} from '../utilities.ts';

	import Run from './icons/run.svelte';
	import VerticalBorder from './vertical-border.svelte';

	const {duration, distance}: {duration: string; distance: string} = $props();
	let totalDuration = $state(CONSTS.duration);
	let maxSpeed = $state('0.0');

	function onDurationInput(event: {currentTarget: HTMLInputElement}): void {
		const value = event.currentTarget.value;
		totalDuration = isValidDuration(value)
			? parseDuration(value).format('HH:mm:ss')
			: value.trim();
	}
</script>

<div class="workout-details">
	<div class="workout-details-title">Workout details</div>
	<div class="table">
		<div class="row">
			<div>
				<div class="table-value">{duration}</div>
				<div class="table-explanation">Workout duration</div>
			</div>
			<VerticalBorder height={22} margin={0} />
			<div>
				<input
					class="input-remove-input-visuals table-value"
					class:invalid={!isValidDuration(totalDuration)}
					value={totalDuration}
					placeholder="HH:mm:ss"
					oninput={onDurationInput}
				/>
				<div class="table-explanation">Total duration</div>
			</div>
		</div>
		<hr />
		<div class="row">
			<div>
				<div class="table-value">{distance}</div>
				<div class="table-explanation">Distance(km)</div>
			</div>
			<VerticalBorder height={22} margin={0} />
			<div>
				<Run />
			</div>
		</div>
		<hr />
		<div class="row">
			<div>
				<div class="table-value">{toSpeed(duration, distance) || ''}</div>
				<div class="table-explanation">Avg. speed(km/h)</div>
			</div>
			<VerticalBorder height={22} margin={0} />
			<div>
				<input
					class="input-remove-input-visuals table-value"
					class:invalid={!CONSTS.speedRegex.test(maxSpeed)}
					bind:value={maxSpeed}
					placeholder="0.0"
				/>
				<div class="table-explanation">Max. speed(km/h)</div>
			</div>
		</div>
	</div>
</div>

<style>
	.workout-details {
		color: var(--text-white);

		background: var(--card-background);
		border-radius: var(--card-border-radius);

		display: flex;
		justify-content: center;
		flex-direction: column;

		margin-top: 2.8vmin;
		padding: 2.5vmin 3.4vmin;
	}

	.workout-details-title {
		margin-bottom: 1em;
	}

	.table {
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	.table :global(svg) {
		height: 1.5em;
	}

	.table :global(hr) {
		width: 100%;
		border: none;
		border-bottom: 1px solid var(--border-color);
	}

	.table-value,
	.table-explanation {
		text-align: center;
		width: 100%;
	}

	.row {
		display: grid;
		grid-template-columns: minmax(0, 1fr) 1px minmax(0, 1fr);
		align-items: center;
	}

	.row > div {
		display: flex;
		align-items: center;
		flex-direction: column;
	}

	.table-explanation {
		font-size: 0.7em;
		color: var(--table-small-explanation);
	}
</style>

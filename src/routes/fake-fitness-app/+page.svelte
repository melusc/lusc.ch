<script lang="ts">
	import Help from './components/help.svelte';
	import MainAppDateTime from './components/main-app-date-time.svelte';
	import Navbar from './components/navbar.svelte';
	import NotificationBar from './components/notification-bar.svelte';
	import TimeOverview from './components/time-overview.svelte';
	import WorkoutDetails from './components/workout-details.svelte';
	import WorkoutImages from './components/workout-images.svelte';
	import * as CONSTS from './consts.ts';

	import './style.scss';

	import {browser} from '$app/environment';

	let width = $state(1440);
	let height = $state(2960);
	const biggestSize = $derived(Math.max(width, height));

	let distance = $state(CONSTS.distance);
	let duration = $state(CONSTS.duration);

	if (browser) {
		// A bit hacky
		// remove sanitize.css because this was designed without sanitize.css initially
		document
			.querySelector('link[rel="stylesheet"][href*="sanitize.css"]')
			?.remove();
	}
</script>

<svelte:head>
	<title>Fake Fitness App</title>
</svelte:head>

<div id="fake-fitness-app">
	<div class="inputs">
		<div>
			<label for="width">Width:</label>
			<input id="width" type="number" placeholder="width" bind:value={width} />
		</div>
		<div>
			<label for="height">Height:</label>
			<input
				id="height"
				type="number"
				placeholder="height"
				bind:value={height}
			/>
		</div>
	</div>
	<div
		style:width={`${(width / biggestSize) * 100}vmin`}
		style:height={`${(height / biggestSize) * 100}vmin`}
		class="fake-app"
	>
		<NotificationBar />
		<Navbar />
		<MainAppDateTime {duration} />
		<TimeOverview bind:duration bind:distance />
		<WorkoutDetails {duration} {distance} />
		<WorkoutImages />
	</div>
	<Help />
</div>

<style>
	#fake-fitness-app {
		height: 100vh;
		width: 100vw;

		display: grid;

		grid-template-columns: 1fr auto 1fr;
		grid-template-rows: 100%;

		align-items: center;

		justify-items: center;
	}

	.inputs {
		grid-column: 1 / 2;

		height: 100%;

		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;

		font-size: 3vmin;

		color: var(--text-black);
	}
	.inputs > div {
		margin: 0.75em 0;

		width: 80%;

		display: grid;
		grid-template-columns: 2fr 3fr;

		align-items: center;
		justify-items: center;
	}

	.inputs label {
		margin-right: 3px;
		color: var(--text-white);
	}
</style>

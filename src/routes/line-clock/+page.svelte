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

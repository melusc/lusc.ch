<script lang="ts">
	import {debounce} from 'lodash-es';
	import rgbHex from 'rgb-hex';

	import HexInput from './components/hex-input.svelte';
	import RgbaInput from './components/rgba-input.svelte';
	import {hexRgb} from './utilities.ts';
	import './style.scss';

	import {browser} from '$app/environment';

	let red = $state(0xFF);
	let green = $state(0xFF);
	let blue = $state(0xFF);
	let alpha = $state<number>();

	function randomColour(): void {
		const [red_, blue_, green_] = crypto.getRandomValues(new Uint8Array(3));
		red = red_!;
		blue = blue_!;
		green = green_!;
		alpha = undefined;

		setHashInstantly(red, green, blue, alpha);
	}

	function handleKeydown(event: KeyboardEvent) {
		const code = event.code.toLowerCase();
		if (code === 'enter' || code === 'space') {
			randomColour();
		}
	}

	$effect(() => {
		setHashDebounced(red, green, blue, alpha);
	});

	function setHashInstantly(
		red: number,
		green: number,
		blue: number,
		alpha: number | undefined,
	): void {
		if (!browser) {
			return;
		}

		const hex = `#${rgbHex(red, green, blue, alpha)}`;

		if (hex !== location.hash) {
			/*
      https://developer.mozilla.org/en-US/docs/Web/API/History/pushState#description
      -> history.pushState doesn't trigger hashchange

      Alternative would be storing current hex and location.hash and
      when setHash updates the hash, the stored hex and hash will be the same
      and if the user goes back in history the stored hex and hash will not be the same
    */
			history.pushState({}, '', hex);
		}
	}

	/*
		To not spam the history
	*/

	const setHashDebounced = debounce(setHashInstantly, 800, {
		leading: true,
		trailing: true,
		maxWait: 1500,
	});

	function readHexFromHash(): void {
		const hex = location.hash;

		try {
			({red, green, blue, alpha} = hexRgb(hex));
		} catch {
			randomColour();
		}
	}

	if (browser) {
		readHexFromHash();
	}
</script>

<svelte:window on:hashchange={readHexFromHash} />
<svelte:head>
	<title>Hex-RGB converter</title>
</svelte:head>

<div id="hex-to-rgb">
	<div
		class="horizontal-vertical-center"
		style:background-color="rgba({red}, {green}, {blue}, {alpha ?? 1})"
	>
		<div class="floating-box">
			<div class="row">
				<div>Hex</div>
				<div class="inputs-rows">
					<HexInput bind:red bind:green bind:blue bind:alpha />
				</div>
			</div>

			<div class="row">
				<div>Rgba</div>
				<div class="inputs-rows">
					<RgbaInput bind:red bind:green bind:blue bind:alpha />
				</div>
			</div>
			<div class="row">
				<div class="rainbow-box">
					<div
						class="rainbow-text"
						onclick={randomColour}
						onkeydown={handleKeydown}
						role="button"
						tabindex="0"
					>
						Random colour
					</div>
					<div class="rainbow-bg"></div>
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	#hex-to-rgb {
		background-image:
			linear-gradient(45deg, #ababab 25%, transparent 25%),
			linear-gradient(45deg, transparent 75%, #ababab 75%),
			linear-gradient(45deg, transparent 75%, #ababab 75%),
			linear-gradient(45deg, #ababab 25%, transparent 25%);

		background-size: 50px 50px;
		background-position:
			0 0,
			0 0,
			-25px -25px,
			25px 25px;
		height: 100vh;
	}
</style>

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
	import {onMount} from 'svelte';

	import sections from '../projects.ts';

	import Footer from './footer.svelte';
	import Section from './section.svelte';

	onMount(() => {
		if (location.hash) {
			try {
				document.querySelector(location.hash)?.scrollIntoView();
			} catch (error: unknown) {
				console.error(error);
			}
		}
	});
</script>

<main>
	<header>
		<h1>Personal projects</h1>
	</header>

	{#each sections as section (section.key)}
		<Section {section} />
	{/each}

	<Footer />
</main>

<style lang="scss">
	@use '../vars' as *;

	main {
		max-width: $content-width;
		margin: 0 auto;
		padding: 0 $content-padding 96px;
	}

	header {
		max-width: 720px;
		padding: 96px 0 72px;
	}

	h1 {
		margin: 0;

		font-size: 40px;
		font-weight: 600;
		line-height: 1.05;
		letter-spacing: -0.01em;

		color: $heading;
		text-wrap: pretty;

		cursor: text;
	}

	@media (max-width: 700px) {
		main {
			padding: 0 $content-padding-mobile 64px;
		}

		header {
			padding: 56px 0 40px;
		}

		h1 {
			font-size: 32px;
		}
	}
</style>

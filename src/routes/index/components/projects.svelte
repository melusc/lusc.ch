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

	import projects from '../projects.ts';

	import SingleProject from './single-project.svelte';

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
	<div class="projects">
		{#each projects as project (project.key)}
			<SingleProject {project} />
		{/each}
	</div>
</main>

<style lang="scss">
	@use 'sass:color';

	main {
		display: flex !important;
		justify-content: center;
		/* Margin would seem more appropriate but on mobile the background color doesn't apply to that section */
		padding: 2em 0;
	}

	.projects {
		display: flex;
		flex-direction: column;
		gap: 2em;

		width: 50vw;
	}

	@media (max-width: 500px) {
		.projects {
			width: 95vw;
			display: flex;
			flex-direction: column;
		}
	}
</style>

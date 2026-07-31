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
	import type {Section} from '../projects.ts';

	import LinkCard from './link-card.svelte';
	import ProjectCard from './project-card.svelte';

	const {section}: {section: Section} = $props();
</script>

<section>
	<div class="section-header">
		<h2 id={section.key}>{section.title}</h2>
	</div>

	<div class="grid">
		{#if section.variant === 'links'}
			{#each section.entries as link (link.key)}
				<LinkCard {link} />
			{/each}
		{:else}
			{#each section.entries as project (project.key)}
				<ProjectCard {project} />
			{/each}
		{/if}
	</div>
</section>

<style lang="scss">
	@use '../vars' as *;

	section {
		margin-bottom: 72px;

		&:last-of-type {
			margin-bottom: 0;
		}
	}

	.section-header {
		display: flex;
		align-items: baseline;
		justify-content: space-between;

		padding-bottom: 14px;
		margin-bottom: 28px;

		border-bottom: 2px solid $accent;
	}

	h2 {
		margin: 0;

		font-size: 30px;
		font-weight: 500;

		color: $text;

		scroll-margin-top: $nav-height;

		cursor: text;
	}

	.grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
		gap: 20px;
	}

	@media (max-width: 700px) {
		section {
			margin-bottom: 56px;
		}

		h2 {
			font-size: 26px;
		}

		.grid {
			grid-template-columns: 1fr;
		}
	}
</style>

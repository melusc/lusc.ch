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
	import type {Project} from '../projects.ts';

	const {project}: {project: Project} = $props();
	const {text, key} = $derived(project);
	const id = $derived(`#${key}`);
</script>

{#if project.type === 'title'}
	<div class="project-row title">
		<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
		<a href={id} class="id-anchor">#</a>
		<h1 id={key}>{text}</h1>
	</div>
{:else}
	<div class="project-row">
		<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
		<a href={id} class="id-anchor">#</a>
		<div class="single-project" id={key}>
			<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
			<a href={project.href} data-sveltekit-reload>{text}</a>
			<p>{project.description}</p>
		</div>
	</div>
{/if}

<style lang="scss">
	@use 'sass:color';
	@use '../../../common/theme.scss' as *;

	.title {
		grid-template-columns: 2em auto;
		width: max-content;
		align-self: center;
	}

	.project-row {
		display: grid;

		grid-template-columns: 2em 1fr;

		align-items: center;
		margin-right: 2em;

		&:hover {
			.id-anchor {
				visibility: visible;
			}

			.single-project {
				background-color: color.adjust($card, $lightness: 2%);

				transform: scale(0.98);
			}
		}
	}

	.single-project {
		background-color: $card;

		border-radius: 5px;

		min-height: 25vh;

		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		text-align: center;
		padding: 1em 2em;

		transition:
			transform ease 0.2s,
			background-color ease 0.2s;

		> a {
			font-size: 1.2em;
		}
	}

	h1 {
		text-align: center;
	}
	.id-anchor {
		visibility: hidden;
		padding: 1em;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		text-decoration: none;
	}

	@media (max-width: 500px) {
		.single-project {
			min-height: 15vh;
			padding: 1em;
		}

		.project-row {
			&:focus {
				> a {
					visibility: visible;
				}
			}
		}
	}
</style>

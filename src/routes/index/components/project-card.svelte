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
	import type {LocalLink} from '../projects.ts';

	const {project}: {project: LocalLink} = $props();
</script>

<a
	class="card"
	id={project.key}
	// eslint-disable-next-line svelte/no-navigation-without-resolve
	href={project.href}
	data-sveltekit-reload
>
	<h3>{project.text}</h3>
	<p>{project.description}</p>
</a>

<style lang="scss">
	@use '../card';
	@use '../vars' as *;

	.card {
		gap: 12px;
		padding: 24px;
	}

	h3 {
		margin: 0;

		font-size: 24px;
		font-weight: 600;
		line-height: 1.1;

		color: $card-heading;
		text-wrap: pretty;
	}
</style>

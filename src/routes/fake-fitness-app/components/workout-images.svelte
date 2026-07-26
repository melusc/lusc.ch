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
	import Photo from './icons/photo.svelte';
</script>

<div class="workout-images">
	<div class="workout-images-title">Images</div>
	<Photo class="workout-image-preview" />
</div>

<style>
	.workout-images {
		background-color: var(--card-background);
		color: var(--text-white);
		border-radius: var(--card-border-radius);

		display: grid;
		grid-template-columns: 1fr auto 1fr;
		grid-template-rows: 1fr auto 1fr;

		margin-top: 2.8vmin;
		padding: 2.5vmin 3.4vmin;
	}

	.workout-images :global(.workout-image-preview) {
		align-self: center;
		justify-self: center;
		grid-area: 2 / 2 / 3 / 3;

		background-color: var(--photo-icon-background);
		border-radius: 50%;
		margin-top: 1em;

		--height: 1.5em;

		width: var(--height);
		height: var(--height);
		padding: calc(var(--height) * 0.5);
	}
</style>

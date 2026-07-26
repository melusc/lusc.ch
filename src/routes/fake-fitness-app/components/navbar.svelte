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
	import AngleLeft from './icons/angle-left.svelte';
	import DotsVertical from './icons/dots-vertical.svelte';
</script>

<div class="navbar">
	<AngleLeft class="navbar-angle-left" />
	<span>Running</span>
	<DotsVertical class="navbar-dots-vertical" />
</div>

<style>
	.navbar {
		color: var(--text-white);

		display: grid;
		align-items: center;

		margin: 0 6.5%;

		grid-template-columns: auto repeat(3, 1fr);
	}

	.navbar :global(svg) {
		height: 1.5em;
	}

	.navbar :global(.navbar-angle-left) {
		justify-self: start;

		margin-right: 1em;
	}

	.navbar :global(.navbar-dots-vertical) {
		grid-column: 4 / 5;

		justify-self: end;
	}
</style>

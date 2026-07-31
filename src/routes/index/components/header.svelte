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
	import Github from './icons/github.svelte';
</script>

<nav>
	<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
	<a class="home-link" href="/">lusc.ch</a>

	<a
		class="github"
		href="https://github.com/melusc"
		rel="noreferrer noopener"
		aria-label="GitHub"
	>
		<Github />
	</a>
</nav>

<style lang="scss">
	@use '../vars' as *;

	nav {
		position: sticky;
		top: 0;
		z-index: 10;

		display: flex;
		align-items: center;
		justify-content: space-between;

		padding: 18px $content-padding;
		font-size: 22px;

		background-color: rgba($bg, 0.82);
		backdrop-filter: blur(10px);
		border-bottom: 1px solid $border-strong;
	}

	.home-link {
		font-weight: 600;
		letter-spacing: 0.02em;

		color: $accent;
		text-decoration: none;
	}

	.github {
		display: inline-flex;

		color: $muted;
		transition: color 0.15s ease;

		&:hover {
			color: $text;
		}

		:global(svg) {
			height: 1em;
			width: 1em;
		}
	}

	@media (max-width: 700px) {
		nav {
			padding: 18px $content-padding-mobile;
		}
	}
</style>

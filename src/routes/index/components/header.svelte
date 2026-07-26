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

	import {resolve} from '$app/paths';
</script>

<header>
	<div class="header-start">
		<a href={resolve('/')}>lusc.ch</a>
	</div>
	<div class="header-end">
		<a href="https://github.com/melusc" rel="noreferrer noopener">
			<Github />
		</a>
	</div>
</header>

<style lang="scss">
	@use 'sass:color';
	@use '../../../common/theme.scss' as *;

	header {
		background-color: $card;
		padding: 1.5em 1em;

		display: grid;
		grid-template-columns: auto 1fr auto;
		align-items: center;

		box-shadow: 0 2px 7px color.adjust($card, $lightness: -7%);
	}

	.header-start {
		grid-column: 1;
	}

	.header-end {
		grid-column: 3;
		justify-content: flex-end;
	}

	.header-end,
	.header-start {
		display: flex;
		align-items: center;
	}

	header :global(svg) {
		height: 1.7em;
	}
</style>

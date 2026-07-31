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
	import type {ExternalLink} from '../projects.ts';

	import ArrowUpRight from './icons/arrow-up-right.svelte';

	const {link}: {link: ExternalLink} = $props();
</script>

<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
<a class="card" id={link.key} href={link.href} rel="noopener">
	<div class="title">
		<span>{link.text}</span>
		<ArrowUpRight />
	</div>
	<p>{link.description}</p>
</a>

<style lang="scss">
	@use '../card';
	@use '../vars' as *;

	.card {
		gap: 10px;
		padding: 22px 24px;
	}

	.title {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 12px;
		font-size: 22px;

		span {
			font-weight: 600;
			color: $text;
		}

		:global(svg) {
			flex-shrink: 0;
			width: 1em;
			height: 1em;
			color: $accent;
		}
	}
</style>

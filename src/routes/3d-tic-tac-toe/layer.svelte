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
	import Cell from './cell.svelte';
	import type {Layer as LayerType} from './tic-tac-toe.ts';

	const {
		layer,
		winningCells,
		onchoice,
	}: {
		layer: LayerType;
		winningCells: ReadonlySet<number>;
		onchoice: (choice: number) => void;
	} = $props();
</script>

<div class="layer-perspective">
	<div class="layer-tilted">
		{#each layer as cell (cell.index)}
			<Cell {cell} {onchoice} {winningCells} />
		{/each}
	</div>
</div>

<style lang="scss">
	.layer-perspective {
		perspective: 300px;
		width: 80%;
		height: 100%;
	}

	.layer-tilted {
		transform: rotateX(50deg);

		display: grid;
		grid-template: repeat(4, minmax(0, 1fr)) / repeat(4, minmax(0, 1fr));

		border: 1px solid var(--border);
		height: 100%;
	}

	@media (min-width: 600px) {
		.layer-tilted {
			transform: rotateX(30deg);
		}
	}
</style>

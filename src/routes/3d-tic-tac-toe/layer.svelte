<script lang="ts">
	import Cell from './cell.svelte';
	import type {Layer as LayerType} from './tic-tac-toe.ts';

	const {
		layer,
		winningCells,
		onchoice,
	}: {
		layer: LayerType;
		winningCells: Set<number>;
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

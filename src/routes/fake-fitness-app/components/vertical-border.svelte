<script lang="ts">
	const {height, margin}: {height: number; margin: number} = $props();

	const style = $derived(`height: ${height / 7}vmin; margin: 0 ${margin}px;`);
</script>

<div class="vertical-border" {style}></div>

<style>
	.vertical-border {
		border-right: 1px solid var(--border-color);
	}
</style>

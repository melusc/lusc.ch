<script lang="ts">
	const {height, margin}: {height: number; margin: number} = $props();
</script>

<div
	class="vertical-border"
	style:height={`${height / 7}vmin`}
	style:margin={`0 ${margin}px`}
></div>

<style>
	.vertical-border {
		border-right: 1px solid var(--border-color);
	}
</style>

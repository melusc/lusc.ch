<script lang="ts">
	let {checked = $bindable(), label}: {checked: boolean; label: string} =
		$props();
</script>

<label>
	<input type="checkbox" bind:checked />
	{label}
</label>

<style>
	label {
		display: flex;
		gap: 1ch;
		align-items: center;
	}
</style>

<script lang="ts">
	import type {FormEventHandler} from 'svelte/elements';

	let {input = $bindable()}: {input: string} = $props();

	const handleInput: FormEventHandler<HTMLInputElement> = event => {
		input = event.currentTarget.value.normalize('NFKC');
	};
</script>

<input type="text" value={input} oninput={handleInput} />

<style>
	input {
		font: inherit;
		background: none;
		border: none;
		outline: none;
		color: inherit;

		border-bottom: var(--table-border);
		padding: 0.3em;

		width: 100%;
	}
</style>

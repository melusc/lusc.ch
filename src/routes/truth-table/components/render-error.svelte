<script lang="ts">
	import {IndexedError} from '@lusc/truth-table';

	const {error, input}: {error: Error; input: string} = $props();
</script>

{#if error instanceof IndexedError}
	<div class="error">
		<div class="error-message">Malformed input: {error.message}</div>
		<div class="error-input">
			{input.slice(0, error.from)}<span class="error-input-incorrect"
				>{input.slice(error.from, error.to)}</span
			>{input.slice(error.to)}
		</div>
	</div>
{:else}
	<div class="error">
		<div class="error-message">{error.message}</div>
	</div>
{/if}

<style>
	.error {
		display: flex;
		flex-direction: column;
	}

	.error-message {
		font-family: 'JetBrains Mono', monospace;
		font-weight: 300;
	}

	.error-input-incorrect {
		font-weight: bolder;
	}

	.error-input {
		white-space-collapse: preserve;
	}

	.error-message,
	.error-input-incorrect {
		color: var(--red);
	}
</style>

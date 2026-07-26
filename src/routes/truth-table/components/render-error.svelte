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

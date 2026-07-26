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
	import Download from './download.svelte';
	import {unlock} from './unlock.ts';
	import Upload from './upload.svelte';

	let name = $state<string>();

	let output = $state<Promise<Blob>>();

	function handleUpload(input: {name: string; file: File}): void {
		output = unlock(input.file);
		name = input.name;
	}
</script>

<svelte:head>
	<title>Unlock Office Documents</title>
</svelte:head>

<div id="unlock-office-documents">
	<Upload oninput={handleUpload} />

	{#if output}
		{#await output then file}
			<Download {file} name={name!} />
		{:catch error}
			<div class="error">
				{error instanceof Error ? error.message : error}
			</div>
		{/await}
	{/if}

	<div class="report-issue">
		Not working as expected?
		<a
			href="https://github.com/melusc/lusc.ch/issues"
			target="_blank"
			rel="noopener noreferrer"
		>
			Report an issue
		</a>
	</div>
</div>

<style lang="scss">
	@use '../../common/fonts/OpenSans-Light.scss';

	.error {
		margin-top: 2em;
		font-size: 1.4em;
		color: var(--red);
	}

	.report-issue {
		position: absolute;
		right: 2em;
		bottom: 2em;
	}

	#unlock-office-documents {
		display: flex;
		flex-direction: column;
		align-items: center;

		padding: 2em;
	}
</style>

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
	import type {ParsedTable} from '@lusc/truth-table';

	const {table}: {table: ParsedTable} = $props();
</script>

<table>
	<thead>
		<tr>
			{#each table.columns as col (col)}
				<th>{col}</th>
			{/each}
		</tr>
	</thead>
	<tbody>
		{#each table.rows as row (row.join('-'))}
			<tr>
				{#each row as cell, index (cell ? index : -index)}
					<td class:cell_true={cell} class:cell_false={!cell}>
						{cell}
					</td>
				{/each}
			</tr>
		{/each}
	</tbody>
</table>

<style>
	table {
		table-layout: fixed;
		width: max-content;
	}

	tr {
		border-bottom: var(--table-border);
	}

	td.cell_false {
		color: var(--red);
	}
	td.cell_true {
		color: var(--green);
	}

	th,
	td {
		padding: 4px 1em;

		border-left: var(--table-border);
	}
	th:first-child,
	td:first-child {
		border-left: none;
	}
</style>

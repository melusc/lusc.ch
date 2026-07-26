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
	import {Player} from './tic-tac-toe.ts';

	const {player}: {player: Player} = $props();
</script>

<span class:p1={player === Player.p1} class:p2={player === Player.p2}
	>{player === Player.p1 ? 'Player 1' : 'Player 2'}</span
>

<style>
	.p1 {
		color: var(--blue);
	}

	.p2 {
		color: var(--red);
	}
</style>

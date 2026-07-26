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

<script>
	import Game from './game.svelte';
</script>

<svelte:head>
	<title>3D Tic Tac Toe</title>
</svelte:head>

<div class="App">
	<Game />
</div>

<style>
	.App {
		display: flex;
		flex-direction: column;
		align-items: center;

		padding: 1em;

		height: 100vh;
		width: 100vw;

		font-size: 1.4em;
	}
</style>

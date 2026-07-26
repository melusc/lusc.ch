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
	import {resolve} from '$app/paths';
</script>

<svelte:head>
	<title>Not Found</title>
</svelte:head>

<div id="_404">
	<main>
		<div class="emphasise">404</div>
		<div>Not found</div>
	</main>

	<footer>
		<a href={resolve('/')}>lusc.ch</a>
	</footer>
</div>

<style lang="scss">
	#_404 {
		font-size: 45px;
		text-align: center;

		height: 100vh;
		width: 100vw;

		display: grid;
		grid-template-rows: 1fr auto;
		justify-content: center;
	}

	main {
		align-self: center;
	}

	footer {
		align-self: flex-end;
		padding: 1em;
	}

	.emphasise {
		color: var(--blue);
	}

	a {
		font-size: 0.5em;
	}
</style>

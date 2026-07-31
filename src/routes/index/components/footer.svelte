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

<footer>
	<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
	<a class="home-link" href="/">lusc.ch</a>
</footer>

<style lang="scss">
	@use '../vars' as *;

	footer {
		display: flex;
		align-items: center;
		justify-content: space-between;
		flex-wrap: wrap;
		gap: 12px;

		margin-top: 80px;
		padding-top: 24px;

		border-top: 1px solid $border-strong;
	}

	.home-link {
		font-size: 18px;
		color: $accent;
		text-decoration: none;
	}
</style>

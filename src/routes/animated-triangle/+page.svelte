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

<svelte:head>
	<title>Animated triangle</title>
</svelte:head>

<div id="animated-triangle">
	<svg fill="hsl(0, 100%, 70%)" viewBox="0 0 256 256">
		<path d="M10 10L246 246H10z" />
	</svg>
</div>

<style lang="scss">
	@use 'sass:math';

	svg {
		width: 100vmin;
		height: 100vmin;
		animation: colour 4s infinite alternate linear;
	}

	path {
		animation: path 4s infinite alternate linear;
	}

	@keyframes path {
		0%,
		100% {
			d: path('M10 10L246 246H10z');
		}
		50% {
			d: path('M246 10L246 246H10z');
		}
	}

	@keyframes colour {
		@for $i from 0 through 360 {
			#{math.div($i, 3.6) * 1%} {
				fill: hsl($i, 100%, 70%);
			}
		}
	}
</style>

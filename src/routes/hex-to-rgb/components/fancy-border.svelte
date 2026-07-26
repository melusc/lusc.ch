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

<div class="fancy-border"></div>

<style lang="scss">
	:global(input) + .fancy-border {
		$height: 3px;

		position: relative;
		top: -$height - 0.5px;
		margin-bottom: -$height - 1px;

		border: none;
		border-bottom: $height solid;
		border-image: linear-gradient(to right, var(--gradient));
		border-image-slice: 1;

		transition: transform 0.3s ease-in-out;

		transform: scaleX(0);
		transform-origin: 100% 0;
	}

	:global(input:focus) + .fancy-border {
		transform: scaleX(1);
		transform-origin: 0 0;
	}
</style>

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

<script module lang="ts">
	import dayjs from 'dayjs';
	import customParseFormat from 'dayjs/plugin/customParseFormat.js';

	dayjs.extend(customParseFormat);

	const timeAtLoad = dayjs().format('HH:mm');
</script>

<script lang="ts">
	import {timeValid, toTime} from '../utilities.ts';

	let {
		class: className,
		time = $bindable(timeAtLoad),
		width,
	}: {class?: string; time?: string; width?: string} = $props();

	function onInput(event: {currentTarget: HTMLInputElement}): void {
		const value = event.currentTarget.value;
		time = timeValid(value) ? toTime(value).format('HH:mm') : value;
	}
</script>

<input
	class="input-remove-input-visuals {className ?? ''}"
	class:invalid={!timeValid(time)}
	value={time}
	placeholder="HH:mm"
	oninput={onInput}
	style:width
/>

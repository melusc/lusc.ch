/*
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
*/

type EventHandler<Detail> = (event: CustomEvent<Detail>) => void;

export class TypedEventTarget<EventMap extends Record<string, unknown>> {
	// Doing this instead of `extends EventTarget` and `super.blabla()`
	// because that way it can only have the methods it needs
	// and overriding the original methods doesn't work
	// because the original and new methods are not compatible
	readonly #eventTarget = new EventTarget();

	on<Event extends keyof EventMap & string>(
		name: Event,
		callback: EventHandler<EventMap[Event]>,
	): void {
		// @ts-expect-error CustomEvent has .detail and only CustomEvents are dispatched here
		// TypeScript doesn't know that, it thinks Events can be dispatched, too
		this.#eventTarget.addEventListener(name, callback);
	}

	off<Event extends keyof EventMap & string>(
		name: Event,
		callback: EventHandler<EventMap[Event]>,
	): void {
		// @ts-expect-error Same as above
		this.#eventTarget.removeEventListener(name, callback);
	}

	protected emit<Event extends keyof EventMap & string>(
		name: Event,
		detail: EventMap[Event],
	): boolean {
		return this.#eventTarget.dispatchEvent(new CustomEvent(name, {detail}));
	}
}

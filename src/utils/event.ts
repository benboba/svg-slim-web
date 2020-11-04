interface IEventOption {
	bubbles?: boolean;
	cancelable?: boolean;
	detail?: object;
}

const DEFAULT_OPTION = {
	bubbles: true,
	cancelable: true,
};

const eventCache: Array<[EventTarget, string, EventListenerOrEventListenerObject]> = [];

export function bind(node: EventTarget, ev: string, fn: EventListenerOrEventListenerObject): void {
	const evs = ev.split(',');
	evs.forEach(_ev => {
		const _event = _ev.trim();
		node.addEventListener(_event, fn, false);
		eventCache.push([node, _event, fn]);
	});
}

export function unbind(node: EventTarget, ev: string, fn?: EventListenerOrEventListenerObject): void {
	for (let i = eventCache.length; i--;) {
		if (eventCache[i][0] === node && eventCache[i][1] === ev && (!fn || eventCache[i][2] === fn)) {
			node.removeEventListener(ev, eventCache[i][2]);
			eventCache.splice(i, 1);
		}
	}
}

export function trigger(node: EventTarget, ev: string, option: IEventOption = DEFAULT_OPTION): void {
	try {
		node.dispatchEvent(new CustomEvent(ev, option));
	} catch (err) {
		const e = document.createEvent('CustomEvent');
		e.initCustomEvent(ev, option.bubbles || DEFAULT_OPTION.bubbles, option.cancelable || DEFAULT_OPTION.cancelable, option.detail);
	}
}

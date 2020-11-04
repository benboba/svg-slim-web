import { readFile } from './read-file';

const MAX_DAYS = 10;
const MAX_HISTORY = 20;

export function addHistory(strs: string[]) {
	const storage = localStorage.getItem('history');
	let history: Array<[string, string[]]> = [];
	if (storage) {
		try {
			history = JSON.parse(storage) as Array<[string, string[]]>;
		} catch (e) {}
	}
	const today = new Date();
	const key = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
	for (const [, hisStrs] of history) {
		strs.forEach(s => {
			const index = hisStrs.indexOf(s);
			if (index !== -1) {
				hisStrs.splice(index, 1);
			}
		});
	}
	let last: [string, string[]] = [key, []];
	if (history.length && history[0][0] === key) {
		last = history[0];
	} else {
		history.unshift(last);
	}
	last[1].unshift(...strs);
	if (last[1].length > MAX_HISTORY) {
		last[1].length = MAX_HISTORY;
	}
	if (history.length > MAX_DAYS) {
		history.length = MAX_DAYS;
	}
	localStorage.setItem('history', JSON.stringify(history));
}

export const files: string[] = [];

export const config = {
	params: {
		sizeDigit: 2,
		angelDigit: 2,
		trifuncDigit: 3,
		opacityDigit: 3,
		thinning: 0,
		straighten: 0,
		mergePoint: 0,
		rmAttrEqDefault: true,
		exchangeStyle: false,
		ignoreKnownCSS: false,
	},
	rules: {
		'apply-style': [true],
		'collapse-g': [true],
		'collapse-textwrap': [true],
		'combine-path': [true, {
			disregardFill: false,
			disregardOpacity: false,
		}],
		'combine-transform': [true],
		'compute-path': [true],
		'rm-attribute': [true, {
			keepEvent: false,
			keepAria: false,
		}],
		'rm-comments': [true],
		'rm-doctype': [true],
		'rm-hidden': [true],
		'rm-important': [true],
		'rm-illegal-style': [true],
		'rm-irregular-nesting': [true, {
			ignore: [],
		}],
		'rm-irregular-tag': [true, {
			ignore: [],
		}],
		'rm-px': [true],
		'rm-unnecessary': [true, {
			tags: ['desc', 'discard', 'foreignObject', 'image', 'video', 'audio', 'iframe', 'canvas', 'metadata', 'script', 'title', 'unknown'],
		}],
		'rm-version': [true],
		'rm-viewbox': [true],
		'rm-xml-decl': [true],
		'rm-xmlns': [true],
		'shape-to-path': [true],
		'shorten-animate': [true, {
			remove: false,
		}],
		'shorten-class': [true],
		'shorten-color': [true, {
			rrggbbaa: false,
		}],
		'shorten-decimal-digits': [true],
		'shorten-defs': [true],
		'shorten-filter': [true],
		'shorten-id': [true],
		'shorten-shape': [true],
		'shorten-style-attr': [true],
		'shorten-style-tag': [true],
		'style-to-class': [true],
	}
};

export function readFiles(f: File[]) {
	return Promise.all(f.filter(file => file.type === 'image/svg+xml').map(async file => readFile(file)));
}

export function changeConfig(config: IConfig) {
	Object.assign(config, config);
}

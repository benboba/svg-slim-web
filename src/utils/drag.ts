import { bind } from './event';
import './drag.css';

export function drag(cb: (files: File[]) => void) {
	const doc = document;

	bind(doc, 'dragover', (ev: Event) => {
		ev.preventDefault();
		doc.body.className = 'drag-tips';
	});

	bind(doc, 'dragleave', (ev: Event) => {
		doc.body.className = '';
	});

	bind(doc, 'drop', (ev: Event) => {
		ev.preventDefault();

		doc.body.className = '';

		const transfer = (ev as DragEvent).dataTransfer;
		if (!!transfer) {
			const files: File[] = [].slice.call(transfer.files) as File[];
			if (files.length) {
				cb(files);
			}
		}
	});
}
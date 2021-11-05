import Vue from 'vue';
import VueI18n from 'vue-i18n';
import { cn } from './cn';
import { en } from './en';

Vue.use(VueI18n);

export const i18n = new VueI18n({
	locale: /^zh\b|\bcn$/i.test(navigator.language) ? 'cn' : 'en',
	messages: {
		cn,
		en,
	},
});

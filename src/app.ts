import 'normalize.css';
import Vue from 'vue';
import App from './App.vue';
import Element from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import { i18n } from './i18n';

Vue.use(Element);

new Vue({
	i18n,
	render: h => h(App),
}).$mount('#app');

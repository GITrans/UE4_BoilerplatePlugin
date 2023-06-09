
import Vue from 'vue';

import axios from 'axios';
import VueAxios from 'vue-axios';

import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';

import App from './App.vue';

import '@fortawesome/fontawesome-free/css/all.css';

import VueYouTubeEmbed from 'vue-youtube-embed'
Vue.use(VueYouTubeEmbed)

import Bars from 'vuebars';
Vue.use(Bars);

import LoadScript from 'vue-plugin-load-script';
Vue.use(LoadScript);

Vue.config.productionTip = false;

Vue.use(VueAxios, axios);
Vue.use(Vuetify, {iconfont: 'fa'});

new Vue({
  render: h => h(App),
}).$mount('#app');
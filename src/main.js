import '@babel/polyfill';
import Vue from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify'; // path to vuetify export
import router from './router';

// Plugins
import './plugins';

// Styles
import './scss/main.scss';

// State
import './class/CaptionManager';

Vue.config.productionTip = false;

new Vue({
  vuetify,
  router,
  render: (h) => h(App)
}).$mount('#app');

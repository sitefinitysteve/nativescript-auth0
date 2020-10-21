import Vue from 'nativescript-vue';
import App from './components/App.vue';
import { setupAuth0 } from './auth0-setup';

setupAuth0();

new Vue({
  render: h => h('frame', [h(App)])
}).$start();

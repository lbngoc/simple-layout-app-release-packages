import Vue from 'vue';
import SuiVue from 'semantic-ui-vue';
import VueResource from 'vue-resource';
import App from './App.vue';
// import '../app.releases.json';

Vue.use(SuiVue);
Vue.use(VueResource);
new Vue({
  el: '#app',
  render: h => h(App)
})

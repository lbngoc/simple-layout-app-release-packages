import Vue from 'vue';
import SuiVue from 'semantic-ui-vue';
import App from './App.vue';
// import '../app.releases.json';

Vue.use(SuiVue);
new Vue({
  el: '#app',
  render: h => h(App)
})

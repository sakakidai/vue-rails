import Vue from 'vue/dist/vue.esm.js'
import Header from './components/Header.vue'
import Router from './router/router'

new Vue({
  router: Router,
  el: '#app',
  components: {
    'navbar': Header,
  }
})
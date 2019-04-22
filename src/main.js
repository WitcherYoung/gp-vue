// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import store from'./store'  //引入store

import ElementUI from 'element-ui'	
import '../node_modules/element-ui/lib/theme-chalk/index.css'	
import './assets/less/index.less'	

Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.use(Vuex)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

// App.vue
// <template>
//   <div id="app">
//     <router-view/>
//   </div>
// </template>

// <script>
// export default {
//   name: 'App',
// }
// </script>

// <style>
// #app {
//   font-family: 'Avenir', Helvetica, Arial, sans-serif;
//   -webkit-font-smoothing: antialiased;
//   -moz-osx-font-smoothing: grayscale;
//   text-align: center;
//   color: #2c3e50;
//   padding:0;
//   margin: 0;
// }
// </style>

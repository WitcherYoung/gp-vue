import Vue from 'vue'
import Router from 'vue-router'
import home from '@/pages/home'
import details from '@/pages/details'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      // meta: {
      //   title: "首页"
      // },
      component: home
    },
    {
      path: '/details',
      name: 'details',
      component: details
    }
  ]
})

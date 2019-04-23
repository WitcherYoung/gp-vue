import Vue from 'vue'
import Router from 'vue-router'
import home from '@/pages/home'
import details from '@/pages/details'
import tags from '@/pages/tags'
import star from '@/pages/star'
import approve from '@/pages/approve'
import myComments from '@/pages/myComments'
import myMessages from '@/pages/myMessages'
import userInfo from '@/pages/userInfo'

// const loadComponent = (componentName, resolve) => require(["@/pages/" + componentName], resolve);

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: home,
      meta: {
        title: "首页"
      }
    },
    {
      path: '/details',
      name: 'details',
      component: details,
      meta: {
        title: "详情"
      },
    },
    {
      path: '/tags',
      name: 'tags',
      component: tags,
      meta: {
        title: "管理标签"
      },
    },
    {
      path: '/star',
      name: 'star',
      component: star,
      meta: {
        title: "我的收藏"
      },
    },
    {
      path: '/approve',
      name: 'approve',
      component: approve,
      meta: {
        title: "我赞过的"
      },
    },
    {
      path: '/myComments',
      name: 'myComments',
      component: myComments,
      meta: {
        title: "我的评论"
      },
    },
    {
      path: '/myMessages',
      name: 'myMessages',
      component: myMessages,
      meta: {
        title: "我的消息"
      },
    },
    {
      path: '/userInfo',
      name: 'userInfo',
      component: userInfo,
      meta: {
        title: "个人主页"
      },
    }
  ],
})

router.beforeEach(function (to, from, next) {
  window.document.title = to.meta.title;
  next();
})


export default router

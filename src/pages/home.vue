<template>
  <div class="home width100pec backColorf4f5f5">
    <div class="width100pec backColorFFF nav-shadow fixed top0">
      <nav-bar :isSelected="isNavSelected" :isLogin="isLogin" :userInfo="userInfo" @navClick="navClick" @handleLRClick="handleLRClick" @handleLogout="handleLogout" @handleSearch="handleSearch"></nav-bar>  
    </div>
    <div class="width80pec marginXauto paddingTop100">
      <div class="width65pec article-list-shadow backColorFFF">
        <div class="paddingX10">
          <filter-bar :isSelected="isFilterSelected" @hanldeClick="filterClick"></filter-bar>
          <article-list :articleList="articleList"></article-list>
        </div>
        <div>
          <load-more :isReflash="isReflash" @handleLoad="handleLoad()"></load-more>
        </div>
      </div>
      <div class="width25pec"></div>
    </div>
    <div class="width100pec backColorFFF">
      <footer-bar></footer-bar>  
    </div>
    <div>
      <el-dialog class="register-login" :visible.sync="rlVisible" center width="40%" :before-close="handleRLClose()">
        <div slot="title" class="title">
          <span :class="{'select': true, 'padding5X': true, 'selected': dialogRLType=='login'}" @click="switchVal('login')">登录</span>
          <span :class="{'select': true, 'padding5X': true, 'selected': dialogRLType=='register'}" @click="switchVal('register')">注册</span>
        </div>
        <div v-show="dialogRLType=='login'" class="login">
          <login @handleLogin="handleLogin"></login>
        </div>
        <div v-show="dialogRLType=='register'" class="register">
          <register></register>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
// import test from "../../static/data/testData.js"
import httpRequest from "@/api";
import tools from "@/utils/tools.js"
import axios from "axios";
// 自定义组件
import navBar from "@/components/NavBar.vue";
import filterBar from "@/components/FilterBar.vue";
import articleList from "@/components/ArticleList.vue";
import loadMore from "@/components/LoadMore.vue";
import footerBar from "@/components/FooterBar.vue";
import login from "@/components/login.vue";
import register from "@/components/register.vue";
// 加载遮罩
import { Loading } from 'element-ui';

export default {
  data() {
    return {
      loading: null,
      isNavSelected: "news",
      isLogin: false,
      userInfo: {},
      isFilterSelected: "recommend",
      // articleList: test.testData,
      articleList: [],
      isReflash: false,
      loadNewsParam: {
        newsType: 1,
        pageNum: 1,
      },
      rlVisible: false,
      dialogRLType: null,
    }
  },
  components: {
    navBar,
    filterBar,
    articleList,
    loadMore,
    footerBar,
    login,
    register
  },
  mounted() {
    this.loading = Loading.service({ 
      lock: true,
      text: 'Loading',
      background: 'rgb(255, 255, 255)'
    });
    setTimeout(() => {
      this.getNewsList();
    }, 500);
  },
  methods: {
    // 交互
    navClick(navType) {
      this.isNavSelected = navType;
    },
    handleLRClick(rlType) {
      this.dialogRLType = rlType;
      this.rlVisible = true;
    },
    handleRLClose() {

    },
    switchVal(switchType) {
      this.dialogRLType = switchType;
      console.log(this.dialogRLType);
    },
    filterClick(filterType) {
      this.isFilterSelected = filterType;
    },
    // 前端逻辑
    // 请求
    getNewsList() {
      httpRequest.getNews(this.loadNewsParam).then( res => {
        if(this.loadNewsParam.pageNum == 1) {
          this.articleList = res.data.news
        }else {
          this.articleList = this.articleList.concat(res.data.news);
        }
        this.articleList.forEach((item, index, array) => {
          item.time = tools.transferDate(item.time.substring(0,10))
        });
        setTimeout(() => {
          this.loading.close();
        }, 500);
        this.isReflash = false;
        this.loadNewsParam.pageNum ++;
      }).catch( err => {
        console.error(err);
      });
    },
    handleLoad() {
      this.isReflash = true;
      setTimeout(() => {
        this.getNewsList();
      }, 1000);
    },
    handleLogin(formLogin) {
      // debugger
      httpRequest.postLogin(formLogin).then( res => {
        console.log(res);
        if(res.data) {
          this.userInfo = res.data.userInfo;
          this.isLogin = true;
          this.rlVisible = false;
          this.loading = Loading.service({ 
            lock: true,
            text: 'Login...',
            background: 'rgba(0, 0, 0, 0.7)'
          });
          setTimeout(() => {
            this.loading.close();
          }, 800);
        }
      }).catch( err => {
        this.$message({
          type: "error",
          message: err.ret_msg,
          center: true
        });
      });
    },
    handleLogout() {
      window.location.reload();
    },
    handleSearch(searchStr) {
      console.log(searchStr);
    }
  }
};
</script>

<style>
</style>

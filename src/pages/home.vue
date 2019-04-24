<template>
  <div class="home width100pec backColorf4f5f5">
    <div class="width100pec backColorFFF nav-shadow fixed z2000 top0">
      <nav-bar :isSelected="isNavSelected" :isLogin="isLogin" :userInfo="userInfo" @navClick="navClick" @handleLRClick="handleLRClick" @handleLogout="handleLogout" @handleSearch="handleSearch"></nav-bar>  
    </div>
    <div class="width80pec marginXauto paddingTop100">
      <personal-side-card></personal-side-card>
      <div class="width75pec article-list-shadow backColorFFF">
        <div v-if="isNavSelected==5">
          <div class="paddingX10">
            <personal-articles :articleList="recommendList"></personal-articles>
          </div>
          <div>
            <load-more :isMore="true"></load-more>
          </div>
        </div>
        <div v-else>
          <div class="paddingX10">
            <filter-bar :isSelected="isFilterSelected" @hanldeClick="filterClick"></filter-bar>
            <article-list :articleType="isNavSelected" :articleList="articleList"></article-list>
          </div>
          <div>
            <load-more :isReflash="isReflash" :isMore="isMore" @handleLoad="handleLoad()"></load-more>
          </div>
        </div>
      </div>
    </div>
    <div class="right-bar"></div>
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
          <register @handleRegister="handleRegister"></register>
        </div>
      </el-dialog>
      <el-dialog class="search-dialog" :visible.sync="searchDialog.visible" center width="60%">
        <div slot="title" class="title textAlignL">
          <i class="fa fa-search-plus"></i>
          <span> 搜索结果</span>
        </div>
        <div v-loading="searchDialog.loading">
          <div v-if="searchDialog.hasData" class="search-body">
            <search-list :articleList="searchDialog.articleList"></search-list>
          </div>
          <div v-else class="search-nodata height400 flex-justify-align">
            <div class="flex-column">
              <img class="width100 height100" :src="searchDialog.noDataImg" alt="">
              <span class="colorcccccc textAlignC">暂无搜索结果</span>
            </div>
          </div>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
// import test from "../../static/data/testData.js"
import noSearchRes from "@/assets/img/暂无搜索结果.png";
import httpRequest from "@/api";
import tools from "@/utils/tools.js"
import axios from "axios";
// 自定义组件
import navBar from "@/components/NavBar.vue";
import filterBar from "@/components/FilterBar.vue";
import articleList from "@/components/ArticleList.vue";
import personalArticles from "@/components/PersonalArticles.vue";
import personalSideCard from "@/components/PersonalSideCard.vue";
import searchList from "@/components/SearchList.vue";
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
      isNavSelected: 1,
      isLogin: false,
      userInfo: {},
      isChangeNav: false,
      isFilterSelected: 1,
      // articleList: test.testData,
      articleList: [],
      recommendList: [],
      isReflash: false,
      isMore: false,
      loadParam: {
        newsType: 1,
        filterType: 1,
        pageNum: 1,
      },
      rlVisible: false,
      searchDialog: {
        articleList: [],
        visible: false,
        hasData: false,
        loading: false,
        noDataImg: noSearchRes
      },
      dialogRLType: null
    }
  },
  components: {
    navBar,
    filterBar,
    articleList,
    personalSideCard,
    personalArticles,
    searchList,
    loadMore,
    footerBar,
    login,
    register
  },
  mounted() {
    if(this.$store.state.isNavSelected != 1) {
      this.isNavSelected = this.$store.state.isNavSelected;
      this.loadParam.newsType = this.$store.state.isNavSelected;
    }
    if(sessionStorage.getItem("userInfo")) {
      this.userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
      this.isLogin = true;
    }
    this.loading = Loading.service({
      lock: true,
      text: 'Loading',
      background: 'rgb(255, 255, 255)'
    });
    setTimeout(() => {
      this.getArticleList();
    }, 500);
  },
  methods: {
    // 交互
    navClick(navType) {
        this.loading = Loading.service({
          text: 'Loading...',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        this.isNavSelected = navType;
        // 改变 this.$store.state.isNavSelected
        this.$store.commit("changeIsNavSelected", navType);
        this.loadParam.newsType = navType;
        this.isChangeNav = true;
        this.loadParam.pageNum = 1;
      if(this.loadParam.newsType!=5) {
        this.getArticleList();
      }else {
        this.getRecommendList();
      }
    },
    handleLRClick(rlType) {
      this.dialogRLType = rlType;
      this.rlVisible = true;
    },
    handleRLClose() {

    },
    switchVal(switchType) {
      this.dialogRLType = switchType;
    },
    filterClick(filterType) {
      this.isFilterSelected = filterType;
      this.loadParam.filterType = filterType;
      this.loadParam.pageNum = 1;
      this.loading = Loading.service({
        text: 'Loading...',
        background: 'rgba(0, 0, 0, 0.7)'
      });
      this.getArticleList();
    },
    // 前端逻辑
    // 请求
    getArticleList() {
      httpRequest.getArticles(this.loadParam).then( res => {
        if(res.data.articleList.length == 0) {
          this.isMore = true;
        }
        // 判断导航菜单是否切换
        if(!this.isChangeNav) {
          // 导航菜单未切换, 判断查询页数
          if(this.loadParam.pageNum == 1) {
            this.articleList = res.data.articleList
          }else {
            this.articleList = this.articleList.concat(res.data.articleList);
          }
        }else {
          // 导航菜单切换, 查询第一页数据
          this.articleList = res.data.articleList;
          this.isChangeNav = false;
        }
        if(this.loadParam.newsType == 1|| this.loadParam.newsType == 4) {
          this.articleList.forEach((item, index, array) => {
            item.time = tools.transferDate(item.time.substring(0,10))
          });
        }
        setTimeout(() => {
          this.loading.close();
        }, 500);
        this.isReflash = false;
        this.loadParam.pageNum ++;
      }).catch( err => {
        console.error(err);
      });
    },
    getRecommendList() {
      let params = {
        username: this.userInfo.username,
      }
      httpRequest.getRecommend(params).then( res => {
        console.log(res);
        this.recommendList = res.data.articleList;
        // // 判断导航菜单是否切换
        // if(!this.isChangeNav) {
        //   // 导航菜单未切换, 判断查询页数
        //   if(this.loadParam.pageNum == 1) {
        //     this.articleList = res.data.articleList
        //   }else {
        //     this.articleList = this.articleList.concat(res.data.articleList);
        //   }
        // }else {
        //   // 导航菜单切换, 查询第一页数据
        //   this.articleList = res.data.articleList;
        //   this.isChangeNav = false;
        // }
        // if(this.loadParam.newsType == 1|| this.loadParam.newsType == 4) {
        //   this.articleList.forEach((item, index, array) => {
        //     item.time = tools.transferDate(item.time.substring(0,10))
        //   });
        // }
        setTimeout(() => {
          this.loading.close();
        }, 500);
        // this.isReflash = false;
        // this.loadParam.pageNum ++;
      }).catch( err => {
        console.error(err);
      });
    },
    handleLoad() {
      this.isReflash = true;
      setTimeout(() => {
        this.getArticleList();
      }, 1000);
    },
    handleLogin(formLogin) {
      // debugger
      httpRequest.postLogin(formLogin).then( res => {
        // console.log(res);
        if(res.data) {
          sessionStorage.removeItem('userInfo');
          sessionStorage.setItem("userInfo", JSON.stringify(res.data.userInfo));
          this.userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
          this.isLogin = true;
          this.rlVisible = false;
          this.loading = Loading.service({ 
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
    handleRegister(formRegister) {
      this.loading = Loading.service({
        text: 'Register...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });

      delete formRegister.rePwd;
      httpRequest.postRegister(formRegister).then( res => {
        // console.log(res);
        setTimeout(() => {
          this.loading.close();
        }, 500);
        if(res.data.rowsAffected) {
          this.$message({
            message: res.ret_msg,
            type: "success",
            center: true
          })
        }else {
          this.$message({
            message: res.ret_msg,
            type: "error",
            center: true
          })
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
      console.log("handleLogout")
      sessionStorage.removeItem('userInfo');
      window.location.reload();
    },
    handleSearch(searchStr) {
      let param = {
        searchStr: searchStr,
      }
      console.log(searchStr);
      this.searchDialog.visible = true;
      this.searchDialog.loading = true;
      httpRequest.search(param).then( res => {
        console.log(res);
        let hasData = res.data.articleList.length;
        if(hasData) {
          this.searchDialog.hasData = true;
          this.searchDialog.articleList = res.data.articleList
        }else {
          this.searchDialog.hasData = false;
        }
        setTimeout(() => {
          this.searchDialog.loading = false;
        }, 800);
      }).catch( err => {
        console.error(err);
      });
    },    
  }
};
</script>

<style>
</style>

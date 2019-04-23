<template>
  <div class="width100pec backColorf4f5f5">
    <div class="width100pec backColorFFF nav-shadow fixed z2000 top0">
      <nav-bar :isSelected="isNavSelected" :isLogin="isLogin" :userInfo="userInfo" @navClick="navClick" @handleLRClick="handleLRClick" @handleLogout="handleLogout" @handleSearch="handleSearch"></nav-bar>  
    </div>
    <div class="width80pec marginXauto paddingTop100">
      <personal-side-card></personal-side-card>
      <div class="width75pec article-list-shadow backColorFFF">
        <div class="padding20">
            <user-data></user-data>
        </div>
      </div>
      <div class="width25pec"></div>
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
import UserData from "@/components/UserData.vue";
import personalSideCard from "@/components/PersonalSideCard.vue";
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
      isCollected: false,
      isLiked: false,
      userInfo: {},
      articleParam: {
        newsType: 1,
        newsId: 1,
      },
      rlVisible: false,
      dialogRLType: null,
    }
  },
  components: {
    navBar,
    UserData,
    personalSideCard,
    loadMore,
    footerBar,
    login,
    register
  },
  mounted() {
    this.articleParam.newsType = this.$route.query.newsType;
    this.articleParam.newsId = this.$route.query.id;
    this.isNavSelected = this.$store.state.isNavSelected;
    if(sessionStorage.getItem("userInfo")) {
      this.userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
      this.isLogin = true;
    }
    // this.loading = Loading.service({
    //   lock: true,
    //   text: 'Loading',
    //   background: 'rgb(255, 255, 255)'
    // });
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
      if(this.$route.name!="home") {
        this.$router.push({
          path: "/"
        })
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
    // 前端逻辑

    // 请求
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
      console.log(searchStr);
    },
  }
};
</script>

<style>
</style>

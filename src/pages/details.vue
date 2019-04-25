<template>
  <div class="details width100pec backColorf4f5f5">
    <div class="width100pec backColorFFF nav-shadow fixed z2000 top0">
      <nav-bar :isSelected="isNavSelected" :isLogin="isLogin" :userInfo="userInfo" @navClick="navClick" @handleLRClick="handleLRClick" @handleLogout="handleLogout" @handleSearch="handleSearch"></nav-bar>  
    </div>
    <div class="width80pec marginXauto paddingTop100">
      <personal-side-card></personal-side-card>
      <div class="width75pec article-list-shadow backColorFFF">
        <div class="padding20">
          <div class="article-title"><h2 class="">{{detail.title}}</h2></div>
          <div class="article-img padding20X">
            <img :src="detail.img" alt="">
          </div>
          <div class="article-content textAlignL padding20">
            <p v-html="detail.summary"></p>
          </div>
          <div class="article-footer flex-space-between flex-align-center padding10X paddingX20">
            <div class="flex-justify-center">
              <span class="tag marginRight10"><el-tag size="small">{{detail.tag}}</el-tag></span>
              <span class="time coloradadad">{{detail.time}}</span>
            </div>
            <div>
              <span v-show="!isCollected" class="font-size20 marginRight10 mark-hover" @click="handleCollected()"><i class="fa fa-star-o" aria-hidden="true"></i></span>
              <span v-show="isCollected" class="font-size20 marginRight10 colorffc347 mark-hover" @click="handleCollected()"><i class="fa fa-star" aria-hidden="true"></i></span>
              <span v-show="!isLiked" class="font-size20 marginRight10 mark-hover" @click="handleLiked()"><i class="fa fa-thumbs-o-up"></i></span>
              <span v-show="isLiked" class="font-size20 marginRight10 colorFF4500 mark-hover" @click="handleLiked()"><i class="fa fa-thumbs-up"></i></span>
              <span class="marginRight20">{{detail.liked?detail.liked:""}}</span>
            </div>
          </div>
        </div>
        <div class="marginXauto100X borderb7b7b7" style="width: 90%;"></div>
        <div class="article-comments">
          <messages :messageType="'details'" :showTitle="false" :showBar="true" :showReplay="true"></messages>
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
import personalSideCard from "@/components/PersonalSideCard.vue";
import Messages from "@/components/Messages.vue";
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
      detail: {
        img: "",
        liked: "",
        summary: "",
        tag: "",
        time: "",
        title: "",
      },
      rlVisible: false,
      dialogRLType: null,
    }
  },
  components: {
    navBar,
    personalSideCard,
    Messages,
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
    this.getArticleDetail();
    this.loadCollectedLiked();
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
    handleCollected() {
      let param = {};
      param.isCollected = this.isCollected?0:1;
      param.name = this.userInfo.name;
      param.newsType = this.$route.query.newsType;
      param.articleId = this.$route.query.id;
      httpRequest.postCollected(param).then(res => {
        console.log(res);
        this.isCollected = !this.isCollected;
        if(this.isCollected) {
          this.$notify({
            title: '收藏成功',
            type: 'success',
            duration: 1500
          });
        }else {
          this.$notify({
            title: '取消收藏',
            type: 'warning',
            duration: 1500
          });
        }
      }).catch(err => {
        this.$notify({
          title: '收藏失败',
          type: 'error',
          duration: 1500
        });
        console.log(err)
      });
    },
    handleLiked() {
      let param = {};
      param.isGood = this.isLiked?0:1;
      param.name = this.userInfo.name;
      param.newsType = this.$route.query.newsType;
      param.articleId = this.$route.query.id;
      httpRequest.postLiked(param).then(res => {
        console.log(res);
        this.isLiked = !this.isLiked;
        this.detail.liked = res.data.LikedInfo.likedCount;
      }).catch(err => {
        console.log(err)
      });
    },
    // 请求
    getArticleDetail() {
      httpRequest.getDetails(this.articleParam).then(res => {
        // console.log(res);
        this.detail = res.data.article;
        this.detail.time = tools.transferDate(this.detail.time.substring(0,10))
      }).catch(err => {
        console.log(err)
      })
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
      let param = {
        username: this.userInfo.username
      }
      sessionStorage.removeItem('userInfo');
      httpRequest.postLogout(param).then( res => {
        console.log(res);
      }).catch( err => {
        console.error(err);
      });
      this.$router.push({
        path: "/"
      })
      window.location.reload();
    },
    handleSearch(searchStr) {
      console.log(searchStr);
    },
    loadCollectedLiked() {
      let param = {};
      param.name = this.userInfo.name;
      param.newsType = this.$route.query.newsType;
      param.articleId = this.$route.query.id;
      httpRequest.getCollectedLiked(param).then(res => {
        // console.log(res);
        if(res.data.collectedLiked) {
          this.isCollected = res.data.collectedLiked.isCollected?true:false;
          this.isLiked = res.data.collectedLiked.isLiked?true:false;
        }
      }).catch(err => {
        console.log(err)
      });
    },
  }
};
</script>

<style>
</style>

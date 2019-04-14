<template>
  <div class="nav-bar width80pec marginXauto flex-align-center flex-space-between padding20X">
    <div class="nav-left flex-align-center flex-justify-center">
      <div class="nav-logo marginRight20">
        <span class="inline-block">
          <i class="fa fa-connectdevelop font-size50"></i>
        </span>
      </div>
      <div class="nav-menu">
        <ul class="bold">
          <li class="paddingX10" @click="hanldeClick('news')"><span :class="{'padding5X': true, 'nav-select': true, 'nav-selected': isSelected=='news'}">资讯</span></li>
          <li class="paddingX10" @click="hanldeClick('food')"><span :class="{'padding5X': true, 'nav-select': true, 'nav-selected': isSelected=='food'}">美食</span></li>
          <li class="paddingX10" @click="hanldeClick('play')"><span :class="{'padding5X': true, 'nav-select': true, 'nav-selected': isSelected=='play'}">游玩</span></li>
          <li class="paddingX10" @click="hanldeClick('fun')"><span :class="{'padding5X': true, 'nav-select': true, 'nav-selected': isSelected=='fun'}">趣事</span></li>
        </ul>
      </div>
    </div>
    <div class="nav-right flex-align-center flex-justify-center">
      <div class="search-bar marginRight20">
        <el-button type="primary" icon="el-icon-search" round>搜索</el-button>
      </div>
      <div class="nav-user">
        <div v-show="!isLogin">
          <el-button type="text"  @click="handleLRClick('login')">登录</el-button><span class="color409EFF">/</span><el-button type="text"  @click="handleLRClick('register')">注册</el-button>
        </div>
        <div v-show="isLogin">用户</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isLogin: false
    };
  },
  props: {
    isSelected: {
      type: String,
      default: "recommend"
    }
  },
  methods: {
    hanldeClick(navType) {
      this.$emit("navClick", navType);
    },
    handleLRClick(rlType) {
      console.log(rlType);
      this.$emit("handleLRClick", rlType);
    }
  }
};
</script>

<style>
</style>

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
          <li class="paddingX10" @click="hanldeClick(1)"><span :class="{'padding5X': true, 'nav-select': true, 'nav-selected': isSelected==1}">资讯</span></li>
          <li class="paddingX10" @click="hanldeClick(2)"><span :class="{'padding5X': true, 'nav-select': true, 'nav-selected': isSelected==2}">美食</span></li>
          <li class="paddingX10" @click="hanldeClick(3)"><span :class="{'padding5X': true, 'nav-select': true, 'nav-selected': isSelected==3}">游玩</span></li>
          <li class="paddingX10" @click="hanldeClick(4)"><span :class="{'padding5X': true, 'nav-select': true, 'nav-selected': isSelected==4}">趣事</span></li>
          <li v-if="isLogin" class="paddingX10" @click="hanldeClick(5)"><span :class="{'padding5X': true, 'nav-select': true, 'nav-selected': isSelected==5}">推荐</span></li>
        </ul>
      </div>
    </div>
    <div class="nav-right flex-align-center flex-justify-center">
      <div class="search-bar marginRight40">
        <!-- <sapn class="inline-block">
          <el-input ></el-input>
        </sapn>
        <sapn class="inline-block">
          <el-button type="primary" icon="el-icon-search" size="small" @click="handleSearch()" round>搜索</el-button>
        </sapn> -->
        <el-input v-model="searchStr" class="search-input" placeholder="请输入搜索内容..." clearable>
          <el-button slot="append" type="primary" size="small" @click="handleSearch()">
            <i class="fa fa-search"></i>
          </el-button>
        </el-input>
      </div>
      <div class="nav-user">
        <div v-show="!isLogin">
          <el-button type="text" @click="handleLRClick('login')">登录</el-button><span class="color409EFF">/</span><el-button type="text"  @click="handleLRClick('register')">注册</el-button>
        </div>
        <div v-show="isLogin">
          <el-popover ref="userMenu" placement="bottom" width="100">
            <div>
              <popover-menu :userInfo="userInfo" @handleLogout="handleLogout"></popover-menu>
            </div>
          </el-popover>
          <el-button class="backColorFFF" v-popover:userMenu>
            <img class="border-radius" :src="userInfo.image_url" alt="" v-popover:userMenu>
          </el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import popoverMenu from "@/components/PopoverMenu.vue"
export default {
  data() {
    return {
      searchStr: "",
    };
  },
  props: {
    isSelected: {
      type: Number,
      default: 1
    },
    isLogin: {
      type: Boolean,
      default: false
    },
    userInfo: {
      type: Object,
    }
  },
  components: {
    popoverMenu
  },
  methods: {
    hanldeClick(navType) {
      this.$emit("navClick", navType);
    },
    handleLRClick(rlType) {
      this.$emit("handleLRClick", rlType);
    },
    handleLogout() {
      this.$emit("handleLogout");
    },
    handleSearch() {
      this.$emit("handleSearch", this.searchStr);
    }
  }
};
</script>

<style>
</style>

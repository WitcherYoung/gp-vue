<template>
  <div class="popover-menu">
    <ul>
      <li>
        <div class="flex-space-between">
          <span class="username">{{userInfo.name}}</span>
          <span class="sign-out color898989" @click="handleLogout()"><i class="fa fa-sign-out"></i></span>
        </div>
      </li>
      <li>
        <div class="flex-align-start padding5 popover-menu-item" >
          <span class="color898989"><i class="fa fa-user"></i></span>
          <span class="">我的主页</span>
        </div>
      </li>
      <li>
        <div class="flex-align-start padding5 popover-menu-item">
          <span class="color898989"><i class="fa fa-thumbs-up"></i></span>
          <span class="">我赞过的</span>
        </div>
      </li>
      <li>
        <div class="flex-align-start padding5 popover-menu-item">
          <span class="color898989"><i class="fa fa-heart"></i></span>
          <span class="">我的收藏</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    userInfo: {
      type: Object,
    }
  },
  methods: {
    handleLogout() {
      this.$emit("handleLogout");
    }
  }
};
</script>

<style>
</style>

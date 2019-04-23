<template>
  <div class="popover-menu">
    <ul>
      <li>
        <div class="flex-space-between paddingX5">
          <span class="inline-block username">{{userInfo.name}}</span>
        </div>
      </li>
      <li>
        <div class="flex-align-start padding5 popover-menu-item" @click="handleInfo()">
          <span class="popover-menu-icon color898989"><i class="fa fa-user"></i></span>
          <span class="">主页</span>
        </div>
      </li>
      <li>
        <div class="flex-align-start padding5 popover-menu-item" @click="handleLogout()">
          <span class="popover-menu-icon color898989"><i class="fa fa-sign-out"></i></span>
          <span class="">退出</span>
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
    handleInfo() {
      this.$router.push({
        path: "/userInfo",
      });
    },
    handleLogout() {
      this.$emit("handleLogout");
    }
  }
};
</script>

<style>
</style>

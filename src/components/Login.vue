<template>
  <div class="login">
    <div class="form-login width100pec">
      <el-form class="width60pec padding10X paddingX60 marginXauto" label-position="left" label-width="80px" :model="formLogin">
        <el-form-item class="form-item-login">
          <div slot="label"><span> 用户名</span></div>
          <el-input v-model="formLogin.username"></el-input>
        </el-form-item>
        <el-form-item class="form-item-login">
          <div slot="label"><span> 密码</span></div>
          <el-input v-model="formLogin.pwd"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div class="btn-login flex-justify-align">
      <el-button type="primary" plain @click="handleClick(formLogin)">登 录</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formLogin: {
        username: null,
        pwd: null
      }
    }
  },
  methods: {
    handleClick(formLogin) {
      this.$emit("handleLogin", formLogin);
    }
  }
};
</script>

<style>
</style>

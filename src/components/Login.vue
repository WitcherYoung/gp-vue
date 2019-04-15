<template>
  <div class="login">
    <div class="form-login width100pec">
      <el-form class="width60pec padding10X paddingX60 marginXauto" label-position="left" label-width="80px" :model="formLogin">
        <el-form-item class="form-item-login">
          <div slot="label"><span> 用户名</span></div>
          <el-input type="text" v-model="formLogin.username" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item v-if="visible" class="form-item-login">
          <div slot="label"><span> 密码</span></div>
          <el-input type="text" v-model="formLogin.pwd" placeholder="请输入密码">
            <i slot="suffix" title="显示密码" @click="changePass('show')" style="cursor:pointer;"
               class="fa fa-eye"></i>
          </el-input>
        </el-form-item>
        <el-form-item v-else class="form-item-login">
          <div slot="label"><span> 密码</span></div>
          <el-input type="password" v-model="formLogin.pwd" placeholder="请输入密码">
            <i slot="suffix" title="隐藏密码" @click="changePass('hide')" style="cursor:pointer;"
               class="fa fa-eye-slash"></i>
          </el-input>
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
      },
      visible: false  
      
    }
  },
  methods: {
    handleClick(formLogin) {
      this.$emit("handleLogin", formLogin);
    },
    changePass(val) {
      this.visible = !(val === 'show');
    }
  }
};
</script>

<style>
</style>

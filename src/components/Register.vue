<template>
  <div class="register">
    <div class="form-register width100pec">
      <el-form class="padding10X paddingX60" label-position="left" label-width="80px" :model="formRegister">
        <el-form-item class="form-item-register">
          <div slot="label"><span class="required">*</span><span> 用户名</span></div>
          <el-input v-model="formRegister.username" placeholder="请输入用户名..."></el-input>
          <span class="tip">2~8个字符，可使用字母、数字、下划线，需以字母开头</span>
        </el-form-item>
        <el-form-item class="form-item-register">
          <div slot="label"><span class="required">&nbsp;</span><span> 昵称</span></div>
          <el-input v-model="formRegister.name" placeholder="请输入昵称..."></el-input>
          <span class="tip">2~8个字符，可使用字母、数字、下划线，需以字母开头</span>
        </el-form-item>
        <el-form-item class="form-item-register">
          <div slot="label"><span class="required">*</span><span> 密码</span></div>
          <el-input type="password" v-model="formRegister.pwd"></el-input>
          <span class="tip">6~16个字符，区分大小写</span>
        </el-form-item>
        <el-form-item class="form-item-register">
          <div slot="label"><span class="required">*</span><span> 确认密码</span></div>
          <el-input type="password" v-model="confirmPWD"></el-input>
          <span class="tip">请再次填写密码</span>
        </el-form-item>
        <el-form-item class="form-item-register">
          <div slot="label"><span class="required">&nbsp;</span><span> 年龄</span></div>
          <el-input v-model="formRegister.age" placeholder="请输入年龄..."></el-input>
          <span class="tip">&nbsp;</span>
        </el-form-item>
        <el-form-item class="form-item-register">
          <div slot="label"><span class="required">&nbsp;</span><span> 邮箱</span></div>
          <el-input v-model="formRegister.mail" placeholder="请输入邮箱..."></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div class="btn-register flex-justify-align">
      <el-button type="primary" plain @click="handleClick(formRegister)">注 册</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formRegister: {
        username: null,
        name: null,
        pwd: null,
        age: null,
        mail: null,
      },
      confirmPWD: null,
    }
  },
  methods: {
    handleClick(formRegister) {
      this.$emit("handleRegister", formRegister);
    }
  }
};
</script>

<style>
</style>

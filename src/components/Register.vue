<template>
  <div class="register">
    <div class="form-register width100pec">
      <el-form class="padding10X paddingX60" label-position="left" label-width="80px" :model="formRegister">
        <el-form-item class="form-item-register">
          <div slot="label"><span class="required">*</span><span> 用户名</span></div>
          <el-input v-model="formRegister.username" placeholder="请输入用户名..."></el-input>
          <span class="tip">2~8个字符, 需以字母开头, 可使用字母、数字、下划线</span>
        </el-form-item>
        <el-form-item class="form-item-register">
          <div slot="label"><span class="required">&nbsp;</span><span> 昵称</span></div>
          <el-input v-model="formRegister.name" placeholder="请输入昵称..."></el-input>
          <span class="tip">2~8个字符, 需以字母或中文开头, 可使用字母、中文、数字、下划线</span>
        </el-form-item>
        <el-form-item class="form-item-register">
          <div slot="label"><span class="required">*</span><span> 密码</span></div>
          <el-input type="password" v-model="formRegister.pwd"></el-input>
          <span class="tip">6~16个字符, 可使用字母、数字, 英文区分大小写</span>
        </el-form-item>
        <el-form-item class="form-item-register">
          <div slot="label"><span class="required">*</span><span> 确认密码</span></div>
          <el-input id="confirmPwd" type="password" v-model="formRegister.rePwd" @blur="handleCheck"></el-input>
          <span v-show="!isPwdDiff" class="tip">请再次填写密码</span>
          <span v-show="isPwdDiff" class="tip-error colorRed">您输入的两次密码不一致, 请再次输入密码</span>
          <span v-show="isConfirmed" class="tip-error"><i class="fa fa-check-circle font-size20 colorGreen"></i></span>
        </el-form-item>
        <el-form-item class="form-item-register">
          <div slot="label"><span class="required">&nbsp;</span><span> 年龄</span></div>
          <el-input v-model="formRegister.age" placeholder="请输入年龄..."></el-input>
          <span class="tip">&nbsp;</span>
        </el-form-item>
        <el-form-item class="form-item-register">
          <div slot="label"><span class="required">&nbsp;</span><span> 性别</span></div>
          <div>
            <el-radio-group v-model="formRegister.sex" size="small">
              <el-radio-button label="0"><i class="fa fa-mars"></i> 男</el-radio-button>
              <el-radio-button label="1"><i class="fa fa-venus"></i> 女</el-radio-button>
            </el-radio-group>
          </div>
          <span class="tip">&nbsp;</span>
        </el-form-item>
        <el-form-item class="form-item-register">
          <div slot="label"><span class="required">*</span><span> 邮箱</span></div>
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
import tools from "@/utils/tools.js"
export default {
  data() {
    return {
      formRegister: {
        username: null,
        name: null,
        pwd: null,
        rePwd: null,
        age: null,
        sex: 0,
        mail: null,
      },
      isPwdDiff: false,
      isConfirmed: false
    }
  },
  mounted() {
    
  },
  methods: {
    handleClick(formRegister) {
      let message = tools.detectName(formRegister);
      if(!message.isLegal) {
        this.$message({
            message: message.msg,
            type: "error",
            center: true
        })
        return 
      }
      if(!this.isConfirmed) {
        this.$message({
            message: "您输入的两次密码不一致, 请再次输入密码",
            type: "error",
            center: true
        })
        return 
      }
      this.handleRegister(formRegister);
    },
    handleRegister(formRegister) {
      this.$emit("handleRegister", formRegister);
    },
    handleCheck(e) {
      if(this.formRegister.rePwd == this.formRegister.pwd) {
        this.isPwdDiff = false,
        this.isConfirmed = true
      }else {
        this.isPwdDiff = true,
        this.isConfirmed = false
      }
    }
  }
};
</script>

<style>
</style>

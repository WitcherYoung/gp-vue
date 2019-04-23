<template>
  <div class="user-data width70pec minHeight450 marginXauto textAlignL">
    <div class="form-userData-title flex-align-center paddingX20 padding10X">
      <span><i class="fa fa-address-card font-size5em"></i></span>
      <span class="marginLeft20 bold">个人信息</span>
    </div>
    <div class="form-userData width80pec marginXauto">
      <div class="form-item-userData flex-space-between flex-align-center paddingX20 padding10X">
        <div class="label flex-align-center">
          <div class="label-div width100px textAlignR">
            <span class="inline-block required marginRight10">*</span>
            <span class="inline-block label-name font-size20 marginRight10">用户名</span>
          </div>
          <span class="inline-block">{{tableUserInfo.name}}</span>
        </div>
        <div>
          <el-button class="font-size15" type="text" @click="handleChange('用户名', 1, tableUserInfo.name)">修改</el-button>
        </div>
      </div>
      <div class="form-item-userData flex-space-between flex-align-center paddingX20 padding10X">
        <div class="label flex-align-center">
          <div class="label-div width100px textAlignR">
            <span class="inline-block required marginRight10">*</span>
            <span class="inline-block label-name font-size20 marginRight10">密码</span>
          </div>
          <span class="inline-block">{{tableUserInfo.pwd}}</span>
        </div>
        <div>
          <el-button class="font-size15" type="text" @click="handleChange('密码', 2, tableUserInfo.pwd)">修改</el-button>
        </div>
      </div>
      <div class="form-item-userData flex-space-between flex-align-center paddingX20 padding10X">
        <div class="label flex-align-center">
          <div class="label-div width100px textAlignR">
            <span class="inline-block label-name font-size20 marginRight10">年龄</span>
          </div>
          <span class="inline-block">{{tableUserInfo.age}}</span>
        </div>
        <div>
          <el-button class="font-size15" type="text" @click="handleChange('年龄', 3, tableUserInfo.age)">修改</el-button>
        </div>
      </div>
      <div class="form-item-userData flex-space-between flex-align-center paddingX20 padding10X">
        <div class="label flex-align-center">
          <div class="label-div width100px textAlignR">
            <span class="inline-block label-name font-size20 marginRight10">性别</span>
          </div>
          <span class="inline-block">{{tableUserInfo.sex}}</span>
        </div>
        <div>
          <el-button class="font-size15" type="text" @click="handleChange('性别', 4, tableUserInfo.sex)">修改</el-button>
        </div>
      </div>
      <div class="form-item-userData flex-space-between flex-align-center paddingX20 padding10X">
        <div class="label flex-align-center">
          <div class="label-div width100px textAlignR">
            <span class="inline-block required marginRight10">*</span>
            <span class="inline-block label-name font-size20 marginRight10">邮箱</span>
          </div>
          <span class="inline-block">{{tableUserInfo.mail}}</span>
        </div>
        <div>
          <el-button class="font-size15" type="text" @click="handleChange('邮箱', 5,tableUserInfo.mail)">修改</el-button>
        </div>
      </div>
    </div>
    <div class="changeVal-Box">
      <el-dialog title="提示" :visible.sync="dialogVisible" width="30%" @close="handleClose()">
        <span slot="title">
          <span>{{dialogData.type!=4?"请输入新的":"请重新选择"}}</span>
          <span>{{dialogData.title}}</span>
        </span>
        <div>
          <div v-if="dialogData.type==4">
            <el-radio-group v-model="newVal" size="small">
              <el-radio-button label="0"><i class="fa fa-mars"></i> 男</el-radio-button>
              <el-radio-button label="1"><i class="fa fa-venus"></i> 女</el-radio-button>
            </el-radio-group>
          </div>
          <div v-else>
            <el-input v-model="newVal" placeholder="请输入用户名..."></el-input>
          </div>
          <div v-show="dialogData.type==1" class="paddingTop10"><p class="tip">2~8个字符, 需以字母或中文开头, 可使用字母、中文、数字、下划线</p></div>
          <div v-show="dialogData.type==2" class="paddingTop10"><p class="tip">6~16个字符, 可使用字母、数字, 英文区分大小写</p></div>
          <div v-show="dialogData.type==4" class="paddingTop10"><p class="tip">若未选择直接保存, 默认值 为 男</p></div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="handleSubmit()">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import tools from "@/utils/tools.js"
import httpRequest from "@/api";
export default {
  data() {
    return {
      dialogVisible: false,
      userInfo: null,
      tableUserInfo: {
        name: "name",
        pwd: "pwd",
        age: 24,
        sex: "男",
        mail: "994920937@qq.com"
      },
      dialogData: {
        title: null,
        type: null
      },
      newVal: null,
    };
  },
  mounted() {
    if(sessionStorage.getItem("userInfo")) {
      this.userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
      this.getPersonalInfo();
    }
  },
  methods: {
    getPersonalInfo() {
      let param = {
        name: this.userInfo.name
      }
      console.log(param.name)
      httpRequest.getPersonalInfo(param).then( res => {
        // console.log(res.data.userInfo);
        this.tableUserInfo = res.data.userInfo;
      }).catch( err => {
        console.error(err);
      });
    },
    handleChange(itemName, type, oldVal) {
      console.log(itemName, oldVal);
      this.dialogVisible = true;
      this.dialogData.title = itemName;
      this.dialogData.type = type;
    },
    handleClose() {
      this.newVal = null;
      this.dialogData.type = null;
      this.dialogData.title = null;
    },
    handleSubmit() {
      let message = tools.detectChange(this.dialogData.type, this.newVal),
          params = {
            username: null,
            type: null,
            value: null,
          };
      if(!message.isLegal) {
        this.$message({
            message: message.msg,
            type: "error",
            center: true
        })
        return 
      }
      params.username = this.userInfo.username;
      params.type = this.dialogData.type;
      params.value = this.newVal;
      httpRequest.postPersonalInfo(params).then( res => {
        console.log(res);
        if(res.ret_code == 200) {
          this.$message({
            message: "修改成功",
            type: "success",
            center: true
          })
          this.dialogVisible = false;
          this.handleClose();
          this.getPersonalInfo();
        }
      }).catch( err => {
        console.error(err);
      });
    }
  }
};
</script>

<style>
</style>

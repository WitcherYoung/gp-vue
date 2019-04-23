<template>
  <div class="comments padding20">
    <div v-if="showBar" class="comment-bar padding20">
      <el-input v-model="commentTextarea" type="textarea" :rows="3" placeholder="请输入内容"></el-input>
      <div class="comment-bar-footer textAlignR paddingTop20">
        <el-button size="small" type="info" @click="handleReset(0)">重置</el-button>
        <el-button class="btn-comment" size="small" @click="handleComment(0)" :disabled="commentDisabled">
          <span v-show="!commentDisabled">评论</span>
          <span v-show="commentDisabled" class="paddingX5">
            <i class="fa fa-spinner fa-spin fa-x fa-fw"></i>
          </span>
        </el-button>
      </div>
    </div>
    <div v-if="messageInfo.length == 0" :class="{'no-data': true, 'detail-no-data': messageType=='details'}"></div>
    <div v-else class="minHeight450">
      <div v-if="title == '我的评论'" class="side-card-title bold font-size20">
        <span class="padding5X paddingX10">
          <i class="fa fa-commenting card-commenting" style="color: #3f3f3f"></i> {{title}}
        </span>
      </div>
      <div v-else-if="title == '我的消息'" class="side-card-title bold font-size20">
        <span class="padding5X paddingX10">
          <i class="fa fa-comments-o card-comments-o" style="color: #0068d1"></i> {{title}}
        </span>
      </div>
      <div class="comment flex-align-start padding10X" v-for="(item, index) in messageInfo" :key="index">
        <div class="comment-left user-img padding10X">
          <img class="border-radius" :src="item.replyUserInfo.image_url">
        </div>
        <div class="comment-right flex-column paddingX10 marginLeft10 textAlignL">
          <div v-if="showTitle" class="comment-title flex-align-center">
            <span class="bold marginRight10">原文 :</span>
            <span class="comment-titleVal" @click="readArticle(index, item, item.newsType)">{{item.articleTitle}}</span>
          </div>
          <div :class="{'comment-content': true, 'padding10X': true, 'paddingTop0': !item.originUserInfo.userName}">
            <div v-if="item.originUserInfo.userName" class="comment-origin paddingX10 padding5X border-radius5 color8B8B7A backColorEEEED1"> 
              <div><span>{{item.originUserInfo.userName}} ：</span></div>
              <p>{{item.commentOrigin}}</p>
            </div>
            <div class="comment-reply padding10X bottom-lineb7b7b7s">
              <p>{{item.commentReply}}</p>
            </div>
          </div>
          <div class="comment-footer flex-space-between">
            <div class="user-messageInfo">
              <div v-if="showReplay" class="inline-block marginRight10">
                <span class="font-size14 color4169E1">来自 </span>
                <span class="font-size15">{{item.replyUserInfo.userName}}</span>
              </div>
              <span class="comment-time font-size14 color999999">{{item.commentTime}}</span>
            </div>
            <div v-if="item.replyUserInfo.userName!=userInfo.name || showReplay" class="footer-reply">
              <span @click="handleReply(item.replyUserInfo.userName, item)">回复</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="el-dialog-reply">
      <el-dialog class="reply-bar" :visible.sync="replyVisible" center width="40%" :before-close="handleReplyClose()">
        <div slot="title" class="reply-bar-title  textAlignL">
          <span>对 </span>
          <span>{{targetName}}</span>
          <span> 进行回复</span>
        </div>
        <div class="reply-bar-body">
          <el-input v-model="replyTextarea" type="textarea" :rows="3" placeholder="请输入内容"></el-input>
        </div>
        <div slot="footer" class="reply-bar-footer textAlignR">
          <el-button size="small" type="info" @click="handleReset(1)">重置</el-button>
          <el-button class="btn-comment" size="small" @click="handleComment(1)" :disabled="replyDisabled">
            <span v-show="!replyDisabled">回复</span>
            <span v-show="replyDisabled" class="paddingX5">
              <i class="fa fa-spinner fa-spin fa-x fa-fw"></i>
            </span>
          </el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import test from "../../static/data/testData.js";
import tools from "@/utils/tools.js"
import httpRequest from "@/api";
export default {
  data() {
    return {
      replyVisible: false,
      commentDisabled: false,
      replyDisabled: false,
      targetName: "",
      userInfo: {},
      messageInfo: [],
      // messageInfo: [],
      newsType: null,
      id: null,
      commentTextarea: "",
      replyTextarea: "",
      getComments: {
        newsType: "",
        newsId: "",
        replyName: "",
        originName: "",
      },
      params: {
        articleId: null,
        newsType: null,
        replyName: null,
        originName: null,
        commentTime: null,
        commentOrigin: null,
        commentReply: null,
        replyUserInfo: null,
        originUserInfo: null
      }
    };
  },
  props: {
    messageType: {
      type: String,
      default: "details"
    },
    title: {
      type: String,
      default: ""
    },
    showTitle: {
      type: Boolean,
      default: false
    },
    showBar: {
      type: Boolean,
      default: false
    },
    showReplay: {
      type: Boolean,
      default: false
    }
  },
  mounted() {
    this.handleMessageType();
  },
  methods: {
    readArticle(index,item,newsType) {
      this.$router.push({
        path: "/details",
        query: {
          newsType: newsType,
          id: item.articleId,
        }
      });
    },
    handleMessageType() {
      if(this.messageType == "details") {
        this.getComments.newsId = this.$route.query.id;
        this.getComments.newsType = this.$route.query.newsType;
        this.getCommentList();
      }else if(this.messageType == "myComments") {
        if(this.checkLogined()) {
          return 
        }
        console.log("myComments: ", this.userInfo.name);
        this.getComments.replyName = this.userInfo.name;
        this.getCommentList();
      }else if(this.messageType == "myMessages") {
        if(this.checkLogined()) {
          return 
        }
        this.getComments.originName = this.userInfo.name;
        this.getCommentList();
      }else {
        console.error("handleMessageType error");
      }
    },
    getCommentList() {
      httpRequest.getComments(this.getComments).then( res => {
          // console.log(res);
          res.data.messageInfo.forEach((item, index, arr) => {
            arr[index].commentTime = tools.transferTime(arr[index].commentTime);
          });
          this.messageInfo = res.data.messageInfo;
        }).catch( err => {
          this.$message({
            type: "error",
            message: err.ret_msg,
            center: true
          });
        });
    },
    handleReset(resetType) {
      if(resetType == 0) {
        this.commentTextarea = "";
      }else {
        this.replyTextarea = "";
      }
      // let time = tools.getCurrentTime();
      // console.log(time);
    },
    handleComment(commentType) {
      if(this.checkLogined()) {
        return 
      }
      let originUserInfo = {
            userName: "",
          },
          replyUserInfo = {
            image_url: "",
            userName: "",
          };
      // 评论/回复公共参数
      this.params.replyName = this.userInfo.name;
      this.params.commentTime = tools.getCurrentTime();
      replyUserInfo.userName = this.userInfo.name;
      replyUserInfo.image_url = this.userInfo.source_url;
      this.params.replyUserInfo = JSON.stringify(replyUserInfo);

      if(commentType == 0) {
        if(!this.commentTextarea) {
          return this.$message({
            type: "error",
            message: "请输入评论内容",
            center: true
          });
        }
        // // 用户评论
        this.commentDisabled = true;  // 评论按钮禁用
        this.params.articleId = this.$route.query.id;
        this.params.newsType = this.$route.query.newsType;
        this.params.commentReply = this.commentTextarea;
        // console.log(this.params);
        // 发送请求
        httpRequest.postComment(this.params).then( res => {
          // console.log(res);
          this.handleParamsInit();
          this.commentDisabled = false;  // 评论按钮禁用解除
          this.commentTextarea = "",
          this.getCommentList();
        }).catch( err => {
          this.$message({
            type: "error",
            message: err.ret_msg,
            center: true
          });
        });
      }else {
        if(!this.replyTextarea) {
          return this.$message({
            type: "error",
            message: "请输入回复内容",
            center: true
          });
        }
        // 用户回复
        this.replyDisabled = true;
        this.params.commentReply = this.replyTextarea;
        originUserInfo.userName = this.params.originName;
        this.params.originUserInfo = JSON.stringify(originUserInfo);
        this.replyDisabled = true;  // 评论按钮禁用
        console.log(this.params);
        // 发送请求
        httpRequest.postComment(this.params).then( res => {
          // console.log(res);
          this.handleParamsInit();
          this.replyDisabled = false;  // 回复按钮禁用解除
          this.replyTextarea = "",
          this.replyVisible = false;
          this.targetName = "";
          this.getCommentList();
        }).catch( err => {
          this.$message({
            type: "error",
            message: err.ret_msg,
            center: true
          });
        });
      }
    },
    handleReply(originName, item) {
      this.replyVisible = true;
      this.targetName = originName;
      this.params.originName = originName;
      this.params.commentOrigin = item.commentReply;
      this.params.articleId = item.articleId;
      this.params.newsType = item.newsType;
    },
    handleReplyClose() {
      
    },
    handleParamsInit() {
      this.paramsarticleId = null;
      this.paramsnewsType = null;
      this.paramsreplyName = null;
      this.paramsoriginName = null;
      this.paramscommentTime = null;
      this.paramscommentOrigin = null;
      this.paramscommentReply = null;
      this.paramsreplyUserInfo = null;
      this.paramsoriginUserInfo = null;
    },
    checkLogined() {
      if(sessionStorage.getItem("userInfo")) {
        this.userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
        return false;
      }else {
        this.$message({
          type: "error",
          message: "请先登录再发表您的看法",
          center: true,
        })
        return true;
      }
    }
  }
};
</script>

<style>
</style>

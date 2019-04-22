<template>
  <div class="comments padding20">
    <div v-if="info.length == 0" class="no-data"></div>
    <div v-else class="comment flex-align-start padding10X" v-for="(item, index) in info" :key="index">
      <div class="comment-left user-img">
        <img class="border-radius" :src="item.image_url">
      </div>
      <div class="comment-right flex-column paddingX10 marginLeft10 textAlignL">
        <div class="comment-title">
          <span>资讯标题 </span>
          <span>{{item.articleTitle}}</span>
        </div>
        <div class="comment-content padding10X">
          <div class="comment-origin paddingX10 padding5X border-radius5 color8B8B7A backColorEEEED1"> 
            <p>{{item.commentOrigin}}</p>
          </div>
          <div class="comment-reply padding10X bottom-lineb7b7b7s">
            <p>{{item.commentReply}}</p>
          </div>
        </div>
        <div class="comment-footer flex-space-between">
          <div class="user-info">
            <span>来自 {{item.userName}}</span>
            <span>{{item.commentTime}}</span>
          </div>
          <div>
            <span>回复</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import test from "../../static/data/testData.js";
export default {
  data() {
    return {
      // info: [test.testInfo, test.testInfo]
      info: []
    };
  }
};
</script>

<style>
</style>

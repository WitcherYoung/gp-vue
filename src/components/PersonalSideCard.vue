<template>
  <div class="personal-side-card fixed right15pec">
    <div class="width230px height120px backColorFFF side-card-shadow padding10">
      <ul class="textAlignL">
        <li @click="hanldeClick(1)">
          <span class="padding5X paddingX10">
            <i class="fa fa-tags card-tags"></i> 管理标签
          </span>
        </li>
        <li @click="hanldeClick(2)">
          <span class="padding5X paddingX10">
            <i class="fa fa-star card-star"></i> 我的收藏
          </span>
          <span></span>
        </li>
        <li @click="hanldeClick(3)">
          <span class="padding5X paddingX10">
            <i class="fa fa-thumbs-up card-thumbs-up"></i> 我赞过的
          </span>
        </li>
        <li @click="hanldeClick(4)">
          <span class="padding5X paddingX10">
            <i class="fa fa-commenting card-commenting"></i> 我的评论
          </span>
          <span></span>
        </li>
        <li @click="hanldeClick(5)">
          <span class="padding5X paddingX10">
            <i class="fa fa-comments-o card-comments-o"></i> 我的消息
          </span>
          <span></span>
        </li>
      </ul>
    </div>
    <div class="fixed right18pec bottom100px">
      <a id="toTop" href="#">
        <span class="btn-toTop border-radius btn-circle-shadow">
          <i class="fa fa-chevron-up"></i>
        </span>
      </a>
    </div>
  </div>
</template>

<script>
import { error } from 'util';
export default {
  data() {
    return {
      testVal: null
    };
  },
  mounted() {},
  methods: {
    hanldeClick(type) {
      if(sessionStorage.getItem("userInfo")) {
        switch(type) {
          case 1: 
            this.$router.push({
              path: "/tags"
            });
            break;
          case 2: 
            this.$router.push({
              path: "/star"
            });
            break;
          case 3: 
            this.$router.push({
              path: "/approve"
            });
            break;
          case 4: 
            this.$router.push({
              path: "/myComments"
            });
            break;
          case 5: 
            this.$router.push({
              path: "/myMessages"
            });
            break;
          default:
        }
      }else {
        return this.$message({
          type: "warning",
          message: "请先登录",
          center: true
        });
      }
    }
  }
};
</script>

<style>
</style>

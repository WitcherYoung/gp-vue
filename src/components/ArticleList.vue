<template>
  <div class="article-list">
    <div v-for="(item, index) in articleList" :key="index">
      <div class="article-item flex-row flex-align-center">
        <div class="article-item-img">
          <img :src="item.img" alt="图片">
        </div>
        <div class="column-line"></div>
        <div class="article-item-box flex-column flex-grow1">
          <div class="item-title textAlignL">
            <span @click="readArticle(index,item)">{{item.title}}</span>
          </div>
          <div class="item-sub-title flex-space-between margin5X">
            <div class="sub-title-left flex-row flex-align-center">
              <span><el-tag size="small">{{item.tag}}</el-tag></span>
              <span class="item-time marginLeft10">{{item.time}}</span>
            </div>
            <div class="sub-title-right">
              <!-- <span v-show="!item.isLiked" @click="handleLiked(index,item)"><i class="fa fa-thumbs-o-up"></i></span>
              <span v-show="item.isLiked" @click="handleLiked(index,item)"><i class="fa fa-thumbs-up colorRed"></i></span> -->
              <span><i class="fa fa-thumbs-o-up color409EFF"></i></span>
              <span>{{item.liked}}</span>
            </div>
          </div>
          <div class="item-summary">
            <p class="color898989" @click="readArticle(index,item)">
              {{String.prototype.trim.call(item.summary)}}
            </p>
            <!-- <p class="color898989" @click="readArticle(index,item)" v-html="String.prototype.trim.call(item.summary)"></p> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {

    };
  },
  props: {
    articleList: {
      type: Array,
      default: [
        // {
        //   img: testImg,
        //   title: "title",
        //   tag: "tag",
        //   time: "time",
        //   summary: "summary",
        //   liked: 123
        // }
      ]
    }
  },
  mounted() {
    
  },
  methods: {
    readArticle(index,item) {
      console.log("readArticle ",index,item);
    },
  }
};
</script>

<style>
</style>

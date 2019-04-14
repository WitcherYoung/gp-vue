<template>
  <div class="load-more">
    <div class="load-back padding20X color8c8c8c backColorf4f5f5" @click="handleLoad()">
      <i class="fa fa-refresh" v-show="!isReflash"></i>
      <i class="fa fa-spinner fa-pulse fa-x fa-fw" v-show="isReflash"></i>
      <span class="inline-block marginLeft5">加载更多</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      
    }
  },
  props: {
    isReflash: {
      type: Boolean,
      default: false,
    }
  },
  methods: {
    handleLoad() {
      this.$emit("handleLoad");
      console.log("handleLoad component", this.isReflash);
    }
  }
};
</script>

<style>
</style>

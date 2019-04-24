<template>
  <div class="filter-bar flex-justify-start">
    <div class="text">
      <ul class="filter-select-ul">
        <!-- <li @click="hanldeClick(0)"><span :class="{'filter-select': true, 'filter-selected': isSelected==0}">推荐</span></li> -->
        <li @click="hanldeClick(1)"><span :class="{'filter-select': true, 'filter-selected': isSelected==1}">最新</span></li>
        <li @click="hanldeClick(2)"><span :class="{'filter-select': true, 'filter-selected': isSelected==2}">热门</span></li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return { }
  },
  props: {
    isSelected: {
      type: Number,
      default: 1
    }
  },
  mounted() {

  },
  methods: {
    hanldeClick(filterType) {
      this.$emit("hanldeClick", filterType);
    },
  }
};
</script>

<style>
</style>

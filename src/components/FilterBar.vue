<template>
  <div class="filter-bar flex-justify-start">
    <div class="text">
      <ul class="filter-select-ul">
        <li @click="hanldeClick('recommend')"><span :class="{'filter-select': true, 'filter-selected': isSelected=='recommend'}">推荐</span></li>
        <li @click="hanldeClick('latest')"><span :class="{'filter-select': true, 'filter-selected': isSelected=='latest'}">最新</span></li>
        <li @click="hanldeClick('popular')"><span :class="{'filter-select': true, 'filter-selected': isSelected=='popular'}">热门</span></li>
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
      type: String,
      default: "recommend"
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

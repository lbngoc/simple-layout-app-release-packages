<template>
  <div class="release-list">
    <sui-segment class="loading-container" v-if="!items || items.length == 0">
      <sui-dimmer active inverted >
        <sui-loader content="Loading..." />
      </sui-dimmer>
    </sui-segment>
    <sui-accordion exclusive styled v-if="items && items.length > 0">
      <release-item v-for="(item, index) in items" :key="index" :release="item" :is-active="index === 0" />
    </sui-accordion>
  </div>
</template>

<script>
import ReleaseItem from "./ReleaseItem.vue";
export default {
  name: "release-list",
  props: ["items"],
  components: {
    ReleaseItem
  },
  created: () => {
    // console.log("Release list is loaded.");
  }
};
</script>

<style>
.loading-container {
  height: 5em;
  height: 25vh;
}
</style>

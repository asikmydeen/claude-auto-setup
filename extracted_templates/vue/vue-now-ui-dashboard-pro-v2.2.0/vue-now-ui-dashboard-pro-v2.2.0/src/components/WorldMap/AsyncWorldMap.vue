<template>
  <world-map :data="data"></world-map>
</template>
<script>
/*  We lazy load (async) the VectorMaps component because it contains 2 big libraries (jquery and jquery vector maps)
      If the component is not loaded within 200ms, we display a loading component in the meanwhile.
      This way, we don't bloat the main bundle with 2 unnecessary libs that we only need for this page :)
   */

import { defineAsyncComponent } from "vue";
import { LoadingPanel } from "../index";

const WorldMap = defineAsyncComponent({
  loader: () => import("./WorldMap.vue"),
  loadingComponent: LoadingPanel,
  delay: 200,
});

export default {
  components: {
    WorldMap,
  },
  props: {
    data: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
};
</script>
<style></style>

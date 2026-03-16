<script setup>
import { useStore } from "vuex";
const store = useStore();

const closeSidebarOnRouteChange = () => {
  store.state.isPinned = false;
};

defineProps({
  to: {
    type: [Object, String],
    required: true,
  },
  miniIcon: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
});
</script>
<template>
  <li class="nav-item">
    <router-link class="nav-link" :to="to" @click="closeSidebarOnRouteChange">
      <span class="sidenav-mini-icon"> {{ miniIcon }} </span>
      <span class="sidenav-normal"> {{ text }} </span>
    </router-link>
  </li>
</template>

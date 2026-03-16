<template>
  <div
    class="card card-background align-items-start mt-4"
    :class="`card-background-mask-${color}`"
  >
    <div
      class="full-background cursor-pointer"
      style="
        background-image: url('https://images.unsplash.com/photo-1604213410393-89f141bb96b8?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTA5fHxuYXR1cmV8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60');
      "
    ></div>

    <div class="card-body">
      <h5 class="text-white mb-0">{{ song.title }}</h5>
      <p class="text-white text-sm">{{ song.singer }}</p>
      <div class="d-flex mt-4 pt-2">
        <material-button
          color="white"
          variant="outline"
          class="rounded-circle p-2 mb-0"
          type="button"
        >
          <i
            class="p-2 material-icons"
            :class="isRTL ? 'skip_next' : 'skip_previous'"
            >skip_next</i
          >
        </material-button>
        <material-button
          color="white"
          variant="outline"
          class="rounded-circle p-2 mx-2 mb-0"
          type="button"
        >
          <i class="material-icons p-2">play_arrow</i>
        </material-button>
        <material-button
          color="white"
          variant="outline"
          class="rounded-circle p-2 mb-0"
          type="button"
        >
          <i
            class="material-icons p-2"
            :class="isRTL ? 'skip_previous' : 'skip_next'"
            >skip_previous</i
          >
        </material-button>
      </div>
    </div>
  </div>
</template>

<script>
import MaterialButton from "@/components/MaterialButton.vue";
import { mapState } from "vuex";
export default {
  name: "MusicPlayer",
  components: {
    MaterialButton,
  },
  props: {
    color: {
      type: String,
      default: "dark",
    },
    song: {
      type: Object,
      default: () => ({
        title: "Some Kind Of Blues",
        singer: "Deftones",
      }),
      title: String,
      singer: String,
    },
  },
  computed: {
    ...mapState(["isRTL"]),
  },
};
</script>

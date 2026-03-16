<template>
  <v-list class="px-3">
    <v-list-item v-for="item in pages" :key="item.title" class="mb-0 ps-0">
      <v-btn
        :ripple="false"
        text
        class="text-body text-capitalize ls-0"
        depressed
        link
        :to="item.link"
      >
        <v-icon size="16">
          {{ item.icon }} text-primary text-gradient me-3
        </v-icon>
        {{ item.title }}
        <v-spacer></v-spacer>
      </v-btn>
    </v-list-item>
  </v-list>
</template>
<script>
export default {
  name: "app-bar-authentication",
  data() {
    return {
      pages: [
        {
          title: "Kanban",
          icon: "ni ni-single-copy-04",
          link: "/pages/applications/kanban",
        },
        {
          title: "Wizard",
          icon: "ni ni-laptop",
          link: "/pages/applications/wizard",
        },
        {
          title: "DataTables",
          icon: "ni ni-badge",
          link: "/pages/applications/datatables",
        },
        {
          title: "Calendar",
          icon: "ni ni-notification-70",
          link: "/pages/applications/calendar",
        },
      ],
    };
  },
};
</script>

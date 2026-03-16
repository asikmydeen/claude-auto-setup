<template>
  <v-card class="card-shadow border-radius-xl">
    <div class="px-4 pt-4 pb-0">
      <p class="font-weight-bold text-h6 text-typo mb-0">Sales by Country</p>
    </div>
    <v-card-text class="px-0 py-2">
      <v-list class="py-0">
        <v-list-item
          v-for="(chat, index) in countries"
          :key="chat.title"
          class="px-4 py-2"
          :class="{ 'border-bottom': index != countries.length - 1 }"
        >
          <v-img
            :alt="`${chat.title} avatar`"
            :src="chat.avatar"
            max-width="20px"
            class="me-6"
          ></v-img>

          <v-list-item-content>
            <span class="text-xs font-weight-bold text-body"> Country: </span>
            <v-list-item-title
              v-text="chat.country"
              class="text-typo font-weight-bold text-sm mb-0"
            ></v-list-item-title>
          </v-list-item-content>

          <v-list-item-content class="text-center">
            <span class="text-xs font-weight-bold text-body"> Sales: </span>
            <v-list-item-title
              v-text="chat.sales"
              class="text-typo font-weight-bold text-sm mb-0"
            ></v-list-item-title>
          </v-list-item-content>

          <v-list-item-content class="text-center">
            <span class="text-xs font-weight-bold text-body"> Value: </span>
            <v-list-item-title
              v-text="chat.value"
              class="text-typo font-weight-bold text-sm mb-0"
            ></v-list-item-title>
          </v-list-item-content>

          <v-list-item-content class="text-center">
            <span class="text-xs font-weight-bold text-body"> Value: </span>
            <v-list-item-title
              v-text="chat.bounce"
              class="text-typo font-weight-bold text-sm mb-0"
            ></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card-text>
  </v-card>
</template>
<script>
export default {
  name: "sales-country",
  data() {
    return {
      countries: [
        {
          avatar: require("@/assets/img/icons/flags/US.png"),
          country: "United States",
          sales: "2.500",
          value: "$230,900",
          bounce: "29.9%",
        },
        {
          avatar: require("@/assets/img/icons/flags/DE.png"),
          country: "Germany",
          sales: "3.900",
          value: "$440,000",
          bounce: "40.22%",
        },
        {
          avatar: require("@/assets/img/icons/flags/GB.png"),
          country: "Great Britain",
          sales: "1.400",
          value: "$190,700",
          bounce: "23.44%",
        },
        {
          avatar: require("@/assets/img/icons/flags/BR.png"),
          country: "Brasil",
          sales: "562",
          value: "$143,960",
          bounce: "32.14%",
        },
      ],
    };
  },
};
</script>

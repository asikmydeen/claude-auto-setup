<template>
  <v-container>
    <v-row>
      <v-col cols="6" class="py-1">
        <div
          class="
            py-12
            h-100
            w-100
            d-flex
            border-radius-lg
            position-relative
            dropdown-image
          "
          :style="`background-image: url(${require('../../assets/img/curved-images/curved8.jpg')}); background-size: cover;`"
        >
          <div
            class="mask bg-gradient-primary border-radius-lg opacity-8"
          ></div>
          <div
            class="
              d-flex
              justify-content-center
              align-center
              text-center text-white
              font-weight-bold
              w-100
              z-index-1
              flex-column
            "
          >
            <v-avatar
              color="bg-white"
              class="shadow"
              width="48"
              height="48"
              min-width="48"
            >
              <v-icon size="20" class="text-primary text-gradient">
                ni ni-diamond
              </v-icon>
            </v-avatar>
            <span class="text-lg mt-2">Explore our<br />utilities pages</span>
          </div>
        </div>
      </v-col>
      <v-col cols="6" class="ps-0 d-flex justify-content-center flex-column">
        <v-list class="pt-0">
          <v-list-item
            v-for="item in pages"
            :key="item.title"
            class="mb-0 ps-0"
          >
            <v-btn
              :ripple="false"
              text
              class="text-body text-capitalize ls-0"
              depressed
              link
              :to="item.link"
            >
              {{ item.title }}
              <v-spacer></v-spacer>
            </v-btn>
          </v-list-item>
        </v-list>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  name: "app-bar-authentication",
  data() {
    return {
      pages: [
        {
          title: "Sign Up Basic",
          link: "/pages/authentication/signup/basic",
        },
        {
          title: "Sign Up Cover",
          link: "/pages/authentication/signup/cover",
        },
        {
          title: "Sign Up Illustration",
          link: "/pages/authentication/signup/illustration",
        },
      ],
    };
  },
};
</script>

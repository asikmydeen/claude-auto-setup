<template>
  <v-container>
    <v-row>
      <v-col cols="6" class="position-relative py-0">
        <v-list v-for="item in pages1" :key="item.title" class="px-3">
          <v-subheader class="d-flex align-center mb-0">
            <v-list-item-icon
              class="
                shadow
                border-radius-md
                bg-gradient-primary
                py-1
                px-1
                align-center
                me-2
                mt-3
              "
            >
              <v-img :src="item.image" height="16" width="16" contain> </v-img>
            </v-list-item-icon>
            <span class="text-dark font-weight-bolder text-sm">{{
              item.title
            }}</span>
            <v-spacer></v-spacer>
          </v-subheader>
          <v-list-item
            v-for="item2 in item.links"
            :key="item2.title"
            class="mb-0 ms-4 ps-4"
          >
            <v-btn
              :ripple="false"
              text
              class="text-body text-capitalize ls-0"
              depressed
              link
              :to="item2.link"
            >
              <span class="text-body mb-1">{{ item2.title }}</span>
              <v-spacer></v-spacer>
            </v-btn>
          </v-list-item>
        </v-list>
        <hr class="vertical dark" />
      </v-col>
      <v-col cols="6" class="position-relative py-0">
        <v-list v-for="item in pages2" :key="item.title" class="px-3">
          <v-subheader class="d-flex align-center mb-0">
            <v-list-item-icon
              class="
                shadow
                border-radius-md
                bg-gradient-primary
                py-1
                px-1
                align-center
                me-2
                mt-3
              "
            >
              <v-img :src="item.image" height="16" width="16" contain> </v-img>
            </v-list-item-icon>
            <span class="text-dark font-weight-bolder text-sm">{{
              item.title
            }}</span>
            <v-spacer></v-spacer>
          </v-subheader>
          <v-list-item
            v-for="item2 in item.links"
            :key="item2.title"
            class="mb-0 ms-4 ps-4"
          >
            <v-btn
              :ripple="false"
              text
              class="text-body text-capitalize ls-0"
              depressed
              link
              :to="item2.link"
            >
              <span class="text-body mb-1">{{ item2.title }}</span>
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
      pages1: [
        {
          title: "Products",
          image: require("@/assets/img/icons/shop.svg"),
          links: [
            {
              title: "New Product",
              link: "/pages/ecommerce/products/new-product",
            },
            {
              title: "Edit Product",
              link: "/pages/ecommerce/products/edit-product",
            },
            {
              title: "Product Page",
              link: "/pages/ecommerce/products/product-page",
            },
          ],
        },
      ],
      pages2: [
        {
          title: "Orders",
          image: require("@/assets/img/icons/document.svg"),
          links: [
            {
              title: "Order List",
              link: "/pages/ecommerce/orders/list",
            },
            {
              title: "Order Details",
              link: "pages/ecommerce/orders/details",
            },
          ],
        },
      ],
    };
  },
};
</script>

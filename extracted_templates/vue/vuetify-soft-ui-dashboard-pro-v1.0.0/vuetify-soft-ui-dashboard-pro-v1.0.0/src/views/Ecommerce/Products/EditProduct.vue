<template>
  <div>
    <v-container fluid class="py-8">
      <v-row>
        <v-col lg="6">
          <h4 class="text-h4 text-typo font-weight-bold">
            Make the changes below
          </h4>
          <p class="text-body">
            We’re constantly trying to express ourselves and actualize our
            dreams. If you have the opportunity to play.
          </p>
        </v-col>
        <v-col lg="6" class="text-end my-auto">
          <v-btn
            elevation="0"
            :ripple="false"
            height="43"
            class="
              font-weight-bold
              text-uppercase
              btn-default
              bg-gradient-primary
              py-2
              px-6
              me-2
            "
            color="#5e72e4"
            small
            >Save</v-btn
          >
        </v-col>
      </v-row>
      <v-row>
        <v-col lg="4">
          <v-card class="card-shadow border-radius-xl h-100">
            <div class="card-padding">
              <h5 class="text-h5 text-typo font-weight-bolder">
                Product Image
              </h5>
              <v-img
                class="w-100 border-radius-lg shadow-lg mt-4"
                src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
              >
              </v-img>
              <v-btn
                elevation="0"
                :ripple="false"
                height="32"
                class="
                  font-weight-bold
                  text-uppercase
                  btn-default
                  bg-gradient-primary
                  py-2
                  px-6
                  mt-6
                "
                color="#5e72e4"
                small
                >Edit</v-btn
              >
              <v-btn
                elevation="0"
                :ripple="false"
                height="32"
                class="
                  font-weight-bold
                  text-uppercase
                  btn-default btn-outline-default
                  py-2
                  px-6
                  ms-2
                  mt-6
                  shadow-none
                "
                color="transparent"
                small
                >Remove</v-btn
              >
            </div>
          </v-card>
        </v-col>
        <v-col lg="8">
          <v-card class="card-shadow border-radius-xl">
            <div class="card-padding">
              <h5 class="text-h5 text-typo font-weight-bolder">
                Product Information
              </h5>
              <v-row class="mt-0">
                <v-col sm="6" cols="12">
                  <label class="text-xs text-typo font-weight-bolder ms-1"
                    >Name</label
                  >
                  <v-text-field
                    hide-details
                    outlined
                    color="rgba(0,0,0,.6)"
                    light
                    placeholder="Minimal Bar Stool"
                    class="
                      font-size-input
                      placeholder-lighter
                      border border-radius-md
                      mt-2
                    "
                  >
                  </v-text-field>
                </v-col>
                <v-col sm="6" cols="12">
                  <label class="text-xs text-typo font-weight-bolder ms-1"
                    >Weight</label
                  >
                  <v-text-field
                    hide-details
                    outlined
                    color="rgba(0,0,0,.6)"
                    light
                    placeholder="2"
                    class="
                      font-size-input
                      placeholder-lighter
                      border border-radius-md
                      mt-2
                    "
                  >
                  </v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col sm="3" cols="12">
                  <label class="text-xs text-typo font-weight-bolder ms-1"
                    >Collection</label
                  >
                  <v-text-field
                    hide-details
                    outlined
                    color="rgba(0,0,0,.6)"
                    light
                    placeholder="Summer"
                    class="
                      font-size-input
                      placeholder-lighter
                      border border-radius-md
                      mt-2
                    "
                  >
                  </v-text-field>
                </v-col>
                <v-col sm="3" cols="12">
                  <label class="text-xs text-typo font-weight-bolder ms-1"
                    >Price</label
                  >
                  <v-text-field
                    hide-details
                    outlined
                    color="rgba(0,0,0,.6)"
                    light
                    placeholder="$90"
                    class="
                      font-size-input
                      placeholder-lighter
                      border border-radius-md
                      mt-2
                    "
                  >
                  </v-text-field>
                </v-col>
                <v-col sm="6" cols="12">
                  <label class="text-xs text-typo font-weight-bolder ms-1"
                    >Quantity</label
                  >
                  <v-text-field
                    hide-details
                    outlined
                    color="rgba(0,0,0,.6)"
                    light
                    placeholder="50"
                    class="
                      font-size-input
                      placeholder-lighter
                      border border-radius-md
                      mt-2
                    "
                  >
                  </v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col sm="6">
                  <label class="text-xs text-typo font-weight-bolder ms-1"
                    >Description</label
                  >
                  <p class="form-text text-muted text-xs ms-1 d-inline">
                    (optional)
                  </p>
                  <html-editor></html-editor>
                </v-col>
                <v-col sm="6">
                  <label class="text-xs text-typo font-weight-bolder ms-1"
                    >Category</label
                  >
                  <v-select
                    :items="categories"
                    value="Furniture"
                    color="rgba(0,0,0,.6)"
                    class="
                      input-style
                      font-size-input
                      text-light-input
                      placeholder-light
                      border-radius-md
                      select-style
                      mt-2
                      mb-0
                    "
                    outlined
                    single-line
                    height="36"
                  >
                  </v-select>
                  <label class="text-xs text-typo font-weight-bolder ms-1"
                    >Color</label
                  >
                  <v-select
                    :items="colors"
                    value="Black"
                    color="rgba(0,0,0,.6)"
                    class="
                      input-style
                      font-size-input
                      text-light-input
                      placeholder-light
                      border-radius-md
                      select-style
                      mt-2
                      mb-0
                    "
                    outlined
                    single-line
                    height="36"
                  >
                  </v-select>
                </v-col>
              </v-row>
            </div>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col lg="4" cols="12">
          <v-card class="card-shadow border-radius-xl">
            <div class="card-padding">
              <h5 class="text-h5 text-typo font-weight-bolder">Socials</h5>
              <v-row class="mt-2">
                <v-col cols="12">
                  <label class="text-xs text-typo font-weight-bolder ms-1"
                    >Shopify Handle</label
                  >
                  <v-text-field
                    hide-details
                    outlined
                    color="rgba(0,0,0,.6)"
                    light
                    placeholder="@soft"
                    class="
                      font-size-input
                      placeholder-lighter
                      border border-radius-md
                      mt-2
                    "
                  >
                  </v-text-field>
                </v-col>
              </v-row>
              <v-row class="mt-2">
                <v-col cols="12">
                  <label class="text-xs text-typo font-weight-bolder ms-1"
                    >Facebook Account</label
                  >
                  <v-text-field
                    hide-details
                    outlined
                    color="rgba(0,0,0,.6)"
                    light
                    placeholder="https://..."
                    class="
                      font-size-input
                      placeholder-lighter
                      border border-radius-md
                      mt-2
                    "
                  >
                  </v-text-field>
                </v-col>
              </v-row>
              <v-row class="mt-2">
                <v-col cols="12">
                  <label class="text-xs text-typo font-weight-bolder ms-1"
                    >Instagram Account</label
                  >
                  <v-text-field
                    hide-details
                    outlined
                    color="rgba(0,0,0,.6)"
                    light
                    placeholder="https://..."
                    class="
                      font-size-input
                      placeholder-lighter
                      border border-radius-md
                      mt-2
                    "
                  >
                  </v-text-field>
                </v-col>
              </v-row>
            </div>
          </v-card>
        </v-col>
        <v-col lg="8">
          <v-card class="card-shadow border-radius-xl">
            <div class="card-padding">
              <h5 class="text-h5 text-typo font-weight-bolder">Pricing</h5>
              <v-row class="mt-2">
                <v-col cols="3">
                  <label class="text-xs text-typo font-weight-bolder ms-1"
                    >Price</label
                  >
                  <v-text-field
                    hide-details
                    outlined
                    color="rgba(0,0,0,.6)"
                    light
                    placeholder="99.00"
                    class="
                      font-size-input
                      placeholder-lighter
                      border border-radius-md
                      mt-2
                    "
                  >
                  </v-text-field>
                </v-col>
                <v-col cols="4">
                  <label class="text-xs text-typo font-weight-bolder ms-1"
                    >Currency</label
                  >
                  <v-select
                    :items="coins"
                    value="USD"
                    color="rgba(0,0,0,.6)"
                    class="
                      input-style
                      font-size-input
                      text-light-input
                      placeholder-light
                      border-radius-md
                      select-style
                      mt-2
                      mb-0
                    "
                    outlined
                    single-line
                  >
                  </v-select>
                </v-col>
                <v-col cols="5">
                  <label class="text-xs text-typo font-weight-bolder ms-1"
                    >SKU</label
                  >
                  <v-text-field
                    hide-details
                    outlined
                    color="rgba(0,0,0,.6)"
                    light
                    placeholder="71283476591"
                    class="
                      font-size-input
                      placeholder-lighter
                      border border-radius-md
                      mt-2
                    "
                  >
                  </v-text-field>
                </v-col>
              </v-row>
              <v-row class="mt-2">
                <v-col cols="12">
                  <label class="text-xs text-typo font-weight-bolder ms-1"
                    >Tags</label
                  >
                  <v-select
                    :items="tags"
                    class="
                      input-style
                      font-size-input
                      text-light-input
                      placeholder-light
                      select-style
                      mt-3
                    "
                    outlined
                    chips
                    multiple
                    single-line
                    height="46"
                  >
                    <template v-slot:selection="{ item }">
                      <v-chip label color="bg-default" class="py-1 px-2 my-0">
                        <span class="text-white text-caption ls-0">{{
                          item
                        }}</span>
                      </v-chip>
                    </template>
                  </v-select>
                </v-col>
              </v-row>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import HtmlEditor from "./Widgets/HtmlEditor.vue";

export default {
  components: {
    HtmlEditor,
  },
  data() {
    return {
      categories: [
        "Clothing",
        "Electronics",
        "Furniture",
        "Others",
        "Real Estate",
      ],
      colors: ["Black", "Red", "Blue", "Green", "Orange"],
      coins: ["USD", "BTC", "CNY", "EUR"],
      tags: ["Black Friday", "Sale", "Out of stock", "In stock"],
    };
  },
};
</script>

<template>
  <div>
    <v-container fluid>
      <v-row>
        <v-col lg="8" cols="12" class="mx-auto mb-6">
          <v-stepper
            alt-labels
            elevation="0"
            v-model="e1"
            class="bg-transparent overflow-visible"
          >
            <v-stepper-header class="shadow-0">
              <v-stepper-step step="1" color="#344767">
                <span class="text-secondary font-weight-normal"
                  >1. Product Info</span
                >
              </v-stepper-step>

              <v-divider></v-divider>

              <v-stepper-step step="2" color="#344767">
                <span class="text-secondary font-weight-normal">2. Media</span>
              </v-stepper-step>

              <v-divider></v-divider>

              <v-stepper-step step="3" color="#344767">
                <span class="text-secondary font-weight-normal"
                  >3. Socials</span
                >
              </v-stepper-step>

              <v-divider></v-divider>

              <v-stepper-step step="4" color="#344767">
                <span class="text-secondary font-weight-normal"
                  >4. Pricing</span
                >
              </v-stepper-step>
            </v-stepper-header>

            <v-stepper-items
              class="border-radius-xl overflow-hidden shadow-lg mt-8"
            >
              <v-stepper-content
                step="1"
                class="bg-white border-radius-xl px-4 pt-4"
              >
                <v-card>
                  <div>
                    <h5 class="font-weight-bolder text-h5 text-typo mb-0">
                      Product Information
                    </h5>
                    <v-row class="mt-2">
                      <v-col sm="6" cols="12">
                        <label class="text-xs text-typo font-weight-bolder ms-1"
                          >Name</label
                        >
                        <v-text-field
                          hide-details
                          outlined
                          color="rgba(0,0,0,.6)"
                          light
                          placeholder="eg. Off-White"
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
                          placeholder="eg. 42"
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
                      <v-col sm="6" cols="12" class="mb-sm-0 mb-16">
                        <label class="text-xs text-typo font-weight-bolder ms-1"
                          >Description</label
                        >
                        <p class="form-text text-muted text-xs ms-1 d-inline">
                          (optional)
                        </p>
                        <html-editor></html-editor>
                      </v-col>
                      <v-col sm="6" cols="12">
                        <label class="text-xs text-typo font-weight-bolder ms-1"
                          >Category</label
                        >
                        <v-select
                          :items="categories"
                          value="Clothing"
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
                          height="38"
                        >
                        </v-select>
                        <label class="text-xs text-typo font-weight-bolder ms-1"
                          >Sizes</label
                        >
                        <v-select
                          :items="sizes"
                          value="Medium"
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
                          height="38"
                        >
                        </v-select>
                      </v-col>
                    </v-row>
                  </div>
                  <div class="text-end">
                    <v-btn
                      :ripple="false"
                      :elevation="0"
                      class="
                        font-weight-bold
                        text-xs
                        btn-default
                        bg-gradient-default
                        py-5
                        px-6
                        mt-6
                        mb-2
                        me-2
                      "
                      color="primary"
                      @click="e1 = 2"
                    >
                      Next
                    </v-btn>
                  </div>
                </v-card>
              </v-stepper-content>

              <v-stepper-content
                step="2"
                class="bg-white border-radius-xl px-4 pt-4"
              >
                <v-card>
                  <div>
                    <h5 class="font-weight-bolder text-h5 text-typo mb-0">
                      Media
                    </h5>
                    <v-row class="mt-2">
                      <v-col cols="12">
                        <label class="text-xs text-typo font-weight-bolder ms-1"
                          >Product images</label
                        >
                        <dropzone v-model="fileSingle"></dropzone>
                      </v-col>
                    </v-row>
                  </div>
                  <div class="d-flex">
                    <v-btn
                      :ripple="false"
                      :elevation="0"
                      class="
                        font-weight-bold
                        text-xs text-dark
                        btn-light
                        bg-gradient-light
                        py-5
                        px-6
                        mt-6
                        mb-2
                        ms-2
                      "
                      @click="e1 = 1"
                    >
                      Prev
                    </v-btn>
                    <v-btn
                      :ripple="false"
                      :elevation="0"
                      class="
                        font-weight-bold
                        text-xs
                        btn-default
                        bg-gradient-default
                        py-5
                        px-6
                        mt-6
                        mb-2
                        me-2
                        ms-auto
                      "
                      color="primary"
                      @click="e1 = 3"
                    >
                      Next
                    </v-btn>
                  </div>
                </v-card>
              </v-stepper-content>

              <v-stepper-content
                step="3"
                class="bg-white border-radius-xl px-4 pt-4"
              >
                <v-card>
                  <div>
                    <h5 class="font-weight-bolder text-h5 text-typo mb-0">
                      Socials
                    </h5>
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
                  <div class="d-flex">
                    <v-btn
                      :ripple="false"
                      :elevation="0"
                      class="
                        font-weight-bold
                        text-xs text-dark
                        btn-light
                        bg-gradient-light
                        py-5
                        px-6
                        mt-6
                        mb-2
                        ms-2
                      "
                      @click="e1 = 2"
                    >
                      Prev
                    </v-btn>
                    <v-btn
                      :ripple="false"
                      :elevation="0"
                      class="
                        font-weight-bold
                        text-xs
                        btn-default
                        bg-gradient-default
                        py-5
                        px-6
                        mt-6
                        mb-2
                        me-2
                        ms-auto
                      "
                      color="primary"
                      @click="e1 = 4"
                    >
                      Next
                    </v-btn>
                  </div>
                </v-card>
              </v-stepper-content>

              <v-stepper-content
                step="4"
                class="bg-white border-radius-xl px-4 pt-4"
              >
                <v-card height="390px">
                  <div>
                    <h5 class="font-weight-bolder text-h5 text-typo mb-0">
                      Pricing
                    </h5>
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
                          height="38"
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
                            <v-chip
                              label
                              color="bg-default"
                              class="py-1 px-2 my-0"
                            >
                              <span class="text-white text-caption ls-0">{{
                                item
                              }}</span>
                            </v-chip>
                          </template>
                        </v-select>
                      </v-col>
                    </v-row>
                  </div>
                  <div class="d-flex">
                    <v-btn
                      :ripple="false"
                      class="
                        font-weight-bold
                        placeholder-lighter
                        text-xs text-dark
                        btn-light
                        bg-gradient-light
                        py-5
                        px-6
                        mt-6
                        mb-0
                      "
                      @click="e1 = 3"
                    >
                      Prev
                    </v-btn>
                    <v-btn
                      :ripple="false"
                      class="
                        font-weight-bold
                        text-xs
                        btn-default
                        bg-gradient-default
                        py-5
                        px-6
                        mt-6
                        mb-0
                        ms-auto
                      "
                      color="primary"
                      @click="e1 = 4"
                    >
                      Send
                    </v-btn>
                  </div>
                </v-card>
              </v-stepper-content>
            </v-stepper-items>
          </v-stepper>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import HtmlEditor from "./Widgets/HtmlEditor.vue";
import Dropzone from "./Widgets/Dropzone.vue";

export default {
  components: {
    HtmlEditor,
    Dropzone,
  },
  data() {
    return {
      e1: 1,
      categories: [
        "Clothing",
        "Electronics",
        "Furniture",
        "Others",
        "Real Estate",
      ],
      sizes: ["Small", "Medium", "Large"],
      fileSingle: [],
      coins: ["USD", "BTC", "CNY", "EUR"],
      tags: ["Black Friday", "Sale", "Out of stock", "In stock"],
    };
  },
};
</script>

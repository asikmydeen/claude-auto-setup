<template>
  <v-container fluid>
    <v-row>
      <v-col lg="8" cols="12" class="mx-auto my-8">
        <v-stepper
          alt-labels
          elevation="0"
          v-model="e1"
          class="bg-transparent overflow-visible"
        >
          <v-stepper-header class="shadow-0">
            <v-stepper-step step="1" color="#344767">
              <span class="text-secondary font-weight-normal">User Info</span>
            </v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step step="2" color="#344767">
              <span class="text-secondary font-weight-normal">Address</span>
            </v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step step="3" color="#344767">
              <span class="text-secondary font-weight-normal">Socials</span>
            </v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step step="4" color="#344767">
              <span class="text-secondary font-weight-normal">Profile</span>
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
                    About me
                  </h5>
                  <p class="mb-0 text-sm text-body">Mandatory informations</p>
                  <v-row class="mt-2">
                    <v-col sm="6" cols="12">
                      <label class="text-xs text-typo font-weight-bolder ms-1"
                        >First Name</label
                      >
                      <v-text-field
                        hide-details
                        outlined
                        color="rgba(0,0,0,.6)"
                        light
                        placeholder="eg. Michael"
                        class="
                          font-size-input
                          placeholder-lighter
                          text-light-input
                          border border-radius-md
                          mt-2
                        "
                      >
                      </v-text-field>
                    </v-col>
                    <v-col sm="6" cols="12">
                      <label class="text-xs text-typo font-weight-bolder ms-1"
                        >Last Name</label
                      >
                      <v-text-field
                        hide-details
                        outlined
                        color="rgba(0,0,0,.6)"
                        light
                        placeholder="eg. Prior"
                        class="
                          font-size-input
                          placeholder-lighter
                          text-light-input
                          border border-radius-md
                          mt-2
                        "
                      >
                      </v-text-field>
                    </v-col>
                  </v-row>

                  <v-row class="mt-2">
                    <v-col sm="6" cols="12">
                      <label class="text-xs text-typo font-weight-bolder ms-1"
                        >Company</label
                      >
                      <v-text-field
                        hide-details
                        outlined
                        color="rgba(0,0,0,.6)"
                        light
                        placeholder="eg. Creative Tim"
                        class="
                          font-size-input
                          placeholder-lighter
                          text-light-input
                          border border-radius-md
                          mt-2
                        "
                      >
                      </v-text-field>
                    </v-col>
                    <v-col sm="6" cols="12">
                      <label class="text-xs text-typo font-weight-bolder ms-1"
                        >Email Address</label
                      >
                      <v-text-field
                        hide-details
                        outlined
                        color="rgba(0,0,0,.6)"
                        light
                        placeholder="eg. soft@dashboard.com"
                        class="
                          font-size-input
                          placeholder-lighter
                          text-light-input
                          border border-radius-md
                          mt-2
                        "
                      >
                      </v-text-field>
                    </v-col>
                  </v-row>

                  <v-row class="mt-2">
                    <v-col sm="6" cols="12">
                      <label class="text-xs text-typo font-weight-bolder ms-1"
                        >Password</label
                      >
                      <v-text-field
                        hide-details
                        outlined
                        color="rgba(0,0,0,.6)"
                        light
                        placeholder="******"
                        class="
                          font-size-input
                          placeholder-lighter
                          text-light-input
                          border border-radius-md
                          mt-2
                        "
                      >
                      </v-text-field>
                    </v-col>
                    <v-col sm="6" cols="12">
                      <label class="text-xs text-typo font-weight-bolder ms-1"
                        >Repeat Password</label
                      >
                      <v-text-field
                        hide-details
                        outlined
                        color="rgba(0,0,0,.6)"
                        light
                        placeholder="******"
                        class="
                          font-size-input
                          placeholder-lighter
                          text-light-input
                          border border-radius-md
                          mt-2
                        "
                      >
                      </v-text-field>
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
                  <h5 class="font-weight-bolder text-h5 text-typo mb-7">
                    Address
                  </h5>
                  <v-row class="mt-2">
                    <v-col cols="12">
                      <label class="text-xs text-typo font-weight-bolder ms-1"
                        >Address 1</label
                      >
                      <v-text-field
                        hide-details
                        outlined
                        color="rgba(0,0,0,.6)"
                        light
                        placeholder="eg. Street 111"
                        class="
                          font-size-input
                          placeholder-lighter
                          text-light-input
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
                        >Address 2</label
                      >
                      <v-text-field
                        hide-details
                        outlined
                        color="rgba(0,0,0,.6)"
                        light
                        placeholder="eg. Street 221"
                        class="
                          font-size-input
                          placeholder-lighter
                          text-light-input
                          border border-radius-md
                          mt-2
                        "
                      >
                      </v-text-field>
                    </v-col>
                  </v-row>
                  <v-row class="mt-2">
                    <v-col sm="6" cols="12">
                      <label class="text-xs text-typo font-weight-bolder ms-1"
                        >City</label
                      >
                      <v-text-field
                        hide-details
                        outlined
                        color="rgba(0,0,0,.6)"
                        light
                        placeholder="eg. Tokyo"
                        class="
                          font-size-input
                          placeholder-lighter
                          text-light-input
                          border border-radius-md
                          mt-2
                        "
                      >
                      </v-text-field>
                    </v-col>
                    <v-col sm="3" cols="12">
                      <label class="text-xs text-typo font-weight-bolder ms-1"
                        >State</label
                      >
                      <v-text-field
                        hide-details
                        outlined
                        color="rgba(0,0,0,.6)"
                        light
                        placeholder="..."
                        class="
                          font-size-input
                          placeholder-lighter
                          text-light-input
                          border border-radius-md
                          mt-2
                        "
                      >
                      </v-text-field>
                    </v-col>
                    <v-col sm="3" cols="12">
                      <label class="text-xs text-typo font-weight-bolder ms-1"
                        >Zip</label
                      >
                      <v-text-field
                        hide-details
                        outlined
                        color="rgba(0,0,0,.6)"
                        light
                        placeholder="7 letters"
                        class="
                          font-size-input
                          placeholder-lighter
                          text-light-input
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
              <v-card height="390px">
                <div>
                  <h5 class="font-weight-bolder text-h5 text-typo mb-7">
                    Socials
                  </h5>
                  <v-row class="mt-2">
                    <v-col cols="12">
                      <label class="text-xs text-typo font-weight-bolder ms-1"
                        >Twitter Handle</label
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
                          text-light-input
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
                          text-light-input
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
                          text-light-input
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
                      mb-0
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
                      mb-0
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
              <v-card>
                <div>
                  <h5 class="font-weight-bolder text-h5 text-typo mb-7">
                    Profile
                  </h5>
                  <v-row class="mt-2">
                    <v-col cols="12">
                      <label class="text-xs text-typo font-weight-bolder ms-1"
                        >Public Email</label
                      >
                      <v-text-field
                        hide-details
                        outlined
                        color="rgba(0,0,0,.6)"
                        light
                        placeholder="Use an address you don't use frequently"
                        class="
                          font-size-input
                          placeholder-lighter
                          text-light-input
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
                        >Bio</label
                      >
                      <v-textarea
                        outlined
                        color="rgba(0,0,0,.6)"
                        value="Say a few words about who you are or what you're working on."
                        class="
                          font-size-input
                          border
                          text-light-input
                          border-radius-md
                          mt-2
                        "
                      ></v-textarea>
                    </v-col>
                  </v-row>
                </div>
                <div class="d-flex">
                  <v-btn
                    :ripple="false"
                    :elevation="0"
                    class="
                      font-weight-bold
                      placeholder-lighter
                      text-xs text-dark
                      btn-light
                      bg-gradient-light
                      py-5
                      px-6
                      mt-6
                      mb-2
                      ms-2
                    "
                    @click="e1 = 3"
                  >
                    Prev
                  </v-btn>
                  <v-btn
                    :ripple="false"
                    :elevation="0"
                    class="
                      font-weight-bold
                      text-xs
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
</template>
<script>
export default {
  data() {
    return {
      e1: 1,
    };
  },
};
</script>

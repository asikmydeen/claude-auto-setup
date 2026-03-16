<template>
  <v-card class="card-shadow border-radius-xl mt-6" id="basic">
    <div class="px-6 py-6">
      <h5 class="text-h5 font-weight-bold text-typo">Basic Info</h5>
    </div>
    <div class="px-6 pb-6 pt-0">
      <v-row>
        <v-col cols="6">
          <label class="text-xs text-typo font-weight-bolder ms-1"
            >First Name</label
          >
          <v-text-field
            hide-details
            outlined
            color="rgba(0,0,0,.6)"
            light
            placeholder="Alec"
            class="
              font-size-input
              placeholder-lighter
              border border-radius-md
              text-light-input
              mt-2
            "
          >
          </v-text-field>
        </v-col>
        <v-col cols="6">
          <label class="text-xs text-typo font-weight-bolder ms-1"
            >Last Name</label
          >
          <v-text-field
            hide-details
            outlined
            color="rgba(0,0,0,.6)"
            light
            placeholder="Thompson"
            class="
              font-size-input
              placeholder-lighter
              border border-radius-md
              text-light-input
              mt-2
            "
          >
          </v-text-field>
        </v-col>
      </v-row>
      <v-row class="mt-0">
        <v-col sm="4" cols="12">
          <label class="text-xs text-typo font-weight-bolder ms-1">I'm</label>
          <v-select
            :items="gender"
            value="Male"
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
        <v-col sm="8">
          <v-row>
            <v-col cols="5">
              <label class="text-xs text-typo font-weight-bolder ms-1"
                >Birth Date</label
              >
              <v-select
                :items="months"
                value="January"
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
            <v-col sm="4" cols="3">
              <v-select
                :items="days"
                value="1"
                color="rgba(0,0,0,.6)"
                class="
                  input-style
                  font-size-input
                  text-light-input
                  placeholder-light
                  border-radius-md
                  select-style
                  mt-8
                  mb-0
                "
                outlined
                single-line
                height="36"
              >
              </v-select>
            </v-col>
            <v-col sm="3" cols="4">
              <v-select
                :items="years"
                value="2021"
                color="rgba(0,0,0,.6)"
                class="
                  input-style
                  font-size-input
                  text-light-input
                  placeholder-light
                  border-radius-md
                  select-style
                  mt-8
                  mb-0
                "
                outlined
                single-line
                height="36"
              >
              </v-select>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="6">
          <label class="text-xs text-typo font-weight-bolder ms-1">Email</label>
          <v-text-field
            hide-details
            outlined
            color="rgba(0,0,0,.6)"
            light
            placeholder="example@email.com"
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
        <v-col cols="6">
          <label class="text-xs text-typo font-weight-bolder ms-1"
            >Confirmation Email</label
          >
          <v-text-field
            hide-details
            outlined
            color="rgba(0,0,0,.6)"
            light
            placeholder="example@email.com"
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
      <v-row>
        <v-col cols="6">
          <label class="text-xs text-typo font-weight-bolder ms-1"
            >Your location</label
          >
          <v-text-field
            hide-details
            outlined
            color="rgba(0,0,0,.6)"
            light
            placeholder="Sydney, A"
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
        <v-col cols="6">
          <label class="text-xs text-typo font-weight-bolder ms-1"
            >Phone Number</label
          >
          <v-text-field
            hide-details
            outlined
            color="rgba(0,0,0,.6)"
            light
            placeholder="+40 735 631 620"
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
      <v-row>
        <v-col cols="6">
          <label class="text-xs text-typo font-weight-bolder ms-1"
            >Language</label
          >
          <v-select
            :items="languages"
            value="English"
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
        <v-col cols="6">
          <label class="text-xs text-typo font-weight-bolder ms-1"
            >Skills</label
          >
          <v-select
            :items="skills"
            class="
              input-style
              font-size-input
              text-light-input
              placeholder-light
              border-radius-md
              select-style
              mt-2
            "
            outlined
            chips
            multiple
            single-line
            height="36"
          >
            <template v-slot:selection="{ item }">
              <v-chip label color="bg-default" class="py-1 px-2 my-0">
                <span class="text-white text-caption ls-0">{{ item }}</span>
              </v-chip>
            </template>
          </v-select>
        </v-col>
      </v-row>
    </div>
  </v-card>
</template>
<script>
export default {
  name: "basic-info",
  data() {
    return {
      gender: ["Female", "Male"],
      months: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "Octomber",
        "November",
        "December",
      ],
      days: [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "11",
        "12",
        "13",
        "14",
        "15",
        "16",
        "17",
        "18",
        "19",
        "20",
        "21",
        "22",
        "23",
        "24",
        "25",
        "26",
        "27",
        "28",
        "29",
        "30",
        "31",
      ],
      years: ["2021", "2020", "2019"],
      languages: ["English", "French", "Spanish"],
      skills: ["vuejs", "angular", "react"],
    };
  },
};
</script>

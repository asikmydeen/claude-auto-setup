<template>
  <v-container fluid class="py-6">
    <v-row>
      <v-col lg="4" md="6" cols="12">
        <v-card class="card-shadow border-radius-xl h-100">
          <div class="px-4 pt-4">
            <h6 class="mb-0 text-h6 text-typo font-weight-bold">
              Platform Settings
            </h6>
          </div>
          <div class="px-4 py-4">
            <h6 class="text-uppercase text-body text-xs font-weight-bolder">
              Account
            </h6>
            <v-list>
              <v-list-item-group class="border-radius-sm">
                <v-list-item
                  :ripple="false"
                  v-for="setting in accountSettings"
                  :key="setting.text"
                  class="px-2 border-radius-sm mb-3"
                >
                  <v-switch
                    :ripple="false"
                    class="d-inline-flex mt-0 pt-0 switch ms-auto"
                    v-model="setting.switchState"
                    hide-details
                    color="#3a416ff2"
                    inset
                  ></v-switch>
                  <v-list-item-content class="py-0">
                    <div class="ms-4 text-body text-sm">
                      {{ setting.text }}
                    </div>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-list>
            <h6
              class="text-uppercase text-body text-xs font-weight-bolder mt-4"
            >
              Application
            </h6>
            <v-list>
              <v-list-item-group class="border-radius-sm">
                <v-list-item
                  :ripple="false"
                  v-for="setting in applicationSettings"
                  :key="setting.text"
                  class="px-0 border-radius-sm mb-3"
                >
                  <v-switch
                    :ripple="false"
                    class="d-inline-flex mt-0 pt-0 switch ms-auto"
                    v-model="setting.switchState"
                    hide-details
                    color="#3a416ff2"
                    inset
                  ></v-switch>
                  <v-list-item-content class="py-0">
                    <div class="ms-4 text-body text-sm">
                      {{ setting.text }}
                    </div>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </div>
        </v-card>
      </v-col>
      <v-col lg="4" md="6" cols="12">
        <v-card class="card-shadow border-radius-xl h-100">
          <div class="px-4 pt-4">
            <h6 class="mb-0 text-h6 text-typo font-weight-bold">
              Profile Information
            </h6>
          </div>
          <div class="px-4 py-4">
            <p class="text-sm text-body">
              Hi, I’m Alec Thompson, Decisions: If you can’t decide, the answer
              is no. If two equally difficult paths, choose the one more painful
              in the short term (pain avoidance is creating an illusion of
              equality).
            </p>
            <hr class="horizontal gray-light mt-6 mb-3" />
            <v-list>
              <v-list-item-group class="border-radius-sm">
                <v-list-item :ripple="false" class="px-0 border-radius-sm">
                  <v-list-item-content class="py-0">
                    <div class="ms-4 text-body text-sm">
                      <strong class="text-dark">Full Name:</strong>
                      &nbsp; Alec M. Thompson
                    </div>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item :ripple="false" class="px-0 border-radius-sm">
                  <v-list-item-content class="py-0">
                    <div class="ms-4 text-body text-sm">
                      <strong class="text-dark">Mobile:</strong>
                      &nbsp; (44) 123 1234 123
                    </div>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item :ripple="false" class="px-0 border-radius-sm">
                  <v-list-item-content class="py-0">
                    <div class="ms-4 text-body text-sm">
                      <strong class="text-dark">Email:</strong>
                      &nbsp; alecthompson@mail.com
                    </div>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item :ripple="false" class="px-0 border-radius-sm">
                  <v-list-item-content class="py-0">
                    <div class="ms-4 text-body text-sm">
                      <strong class="text-dark">Location:</strong>
                      &nbsp; USA
                    </div>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item :ripple="false" class="px-0 border-radius-sm">
                  <v-list-item-content class="py-0">
                    <div class="ms-4 text-body text-sm">
                      <strong class="text-dark">Social:</strong>
                      &nbsp;
                      <v-icon color="#344e86" class="mt-n1 ps-1 pe-2"
                        >fab fa-facebook fa-lg</v-icon
                      >
                      <v-icon color="#3ea1ec" class="mt-n1 ps-1 pe-2"
                        >fab fa-twitter fa-lg</v-icon
                      >
                      <v-icon color="#0e456d" class="mt-n1 ps-1 pe-2"
                        >fab fa-instagram fa-lg</v-icon
                      >
                    </div>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </div>
        </v-card>
      </v-col>
      <v-col lg="4" cols="12">
        <v-card class="card-shadow border-radius-xl h-100">
          <div class="px-4 pt-4">
            <h6 class="mb-0 text-h6 text-typo font-weight-bold">
              Conversations
            </h6>
          </div>
          <div class="px-4 py-4">
            <v-list>
              <v-list-item-group class="border-radius-sm">
                <v-list-item
                  :ripple="false"
                  v-for="conversation in conversations"
                  :key="conversation.text"
                  class="px-0 border-radius-sm mb-2"
                >
                  <v-avatar
                    width="48"
                    height="48"
                    class="shadow border-radius-lg me-4"
                  >
                    <img
                      :src="conversation.avatar"
                      alt="Avatar"
                      class="border-radius-lg"
                    />
                  </v-avatar>
                  <v-list-item-content>
                    <div class="d-flex align-center">
                      <div>
                        <h6
                          class="
                            mb-0
                            text-sm text-sm text-typo
                            font-weight-bold
                          "
                        >
                          {{ conversation.user }}
                        </h6>
                        <p class="mb-0 text-xs text-body">
                          {{ conversation.message }}
                        </p>
                      </div>
                      <div class="ms-auto">
                        <v-btn
                          :ripple="false"
                          small
                          text
                          width="auto"
                          class="pe-4 ps-0 mb-0 text-primary font-weight-bolder"
                        >
                          Reply
                        </v-btn>
                      </div>
                    </div>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </div>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-card class="card-shadow border-radius-xl">
          <div class="px-4 pt-4">
            <h6 class="mb-1 text-typo text-h6 font-weight-bold">Projects</h6>
            <p class="text-sm text-body">Architects design houses</p>
          </div>
          <div class="px-4 py-4">
            <v-row>
              <v-col v-for="card in cards" :key="card.title" lg="3" md="6">
                <v-card>
                  <div class="position-relative">
                    <a class="d-block shadow-xl border-radius-xl">
                      <v-img :src="card.image" class="shadow border-radius-xl">
                      </v-img>
                    </a>
                  </div>
                  <div class="px-1 pt-6">
                    <p class="text-gradient text-default mb-2 text-sm">
                      {{ card.title }}
                    </p>
                    <a href="javascript:;" class="text-decoration-none">
                      <h5 class="text-h5 font-weight-bold text-typo mb-2">
                        {{ card.style }}
                      </h5>
                    </a>
                    <p class="mb-6 text-sm text-body">
                      {{ card.description }}
                    </p>
                    <div class="d-flex align-center justify-space-between">
                      <v-btn
                        outlined
                        color="#cb0c9f"
                        class="font-weight-bolder py-4 px-5"
                        small
                      >
                        View Project
                      </v-btn>
                      <span class="avatar-group d-flex">
                        <v-tooltip
                          bottom
                          color="#212529"
                          v-for="avatar in card.avatars"
                          :key="avatar.name"
                        >
                          <template v-slot:activator="{ on, attrs }">
                            <v-avatar
                              v-bind="attrs"
                              v-on="on"
                              size="24"
                              class="border border-white ms-n3"
                            >
                              <img :src="avatar.image" alt="Avatar" />
                            </v-avatar>
                          </template>
                          <span>{{ avatar.name }}</span>
                        </v-tooltip>
                      </span>
                    </div>
                  </div>
                </v-card>
              </v-col>
              <v-col lg="3" md="6">
                <v-card class="border-radius-xl overflow-hidden border h-100">
                  <div
                    class="
                      px-4
                      py-4
                      d-flex
                      flex-column
                      justify-center
                      text-center
                      h-100
                    "
                  >
                    <a href="javascript:;" class="text-decoration-none">
                      <i
                        class="fa fa-plus text-secondary mb-3"
                        aria-hidden="true"
                      ></i>
                      <h5 class="text-h5 text-secondary font-weight-bold">
                        New project
                      </h5>
                    </a>
                  </div>
                </v-card>
              </v-col>
            </v-row>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  name: "Profile-Overview",
  data: function () {
    return {
      accountSettings: [
        {
          switchState: true,
          text: "Email me when someone follows me",
        },
        {
          switchState: false,
          text: "Email me when someone answers on...",
        },
        {
          switchState: true,
          text: "Email me when someone mentions me...",
        },
      ],
      applicationSettings: [
        {
          switchState: false,
          text: "New launches and projects",
        },
        {
          switchState: true,
          text: "Monthly product updates",
        },
        {
          switchState: false,
          text: "Subscribe to newsletter",
        },
      ],
      conversations: [
        {
          avatar: require("@/assets/img/kal-visuals-square.jpg"),
          user: "Sophie B.",
          message: "Hi! I need more information..",
        },
        {
          avatar: require("@/assets/img/marie.jpg"),
          user: "Anne Marie",
          message: "Awesome work, can you..",
        },
        {
          avatar: require("@/assets/img/ivana-square.jpg"),
          user: "Ivanna",
          message: "About files I can..",
        },
        {
          avatar: require("@/assets/img/team-4.jpg"),
          user: "Peterson",
          message: "Have a great afternoon..",
        },
        {
          avatar: require("@/assets/img/team-3.jpg"),
          user: "Nick Daniel",
          message: "Hi! I need more information..",
        },
      ],
      cards: [
        {
          image: require("@/assets/img/home-decor-1.jpg"),
          title: "Project #2",
          style: "Modern",
          description:
            "As Uber works through a huge amount of internal management turmoil.",
          avatars: [
            {
              image: require("@/assets/img/team-1.jpg"),
              name: "Elena Morison",
            },
            {
              image: require("@/assets/img/team-2.jpg"),
              name: "Ryan Milly",
            },
            {
              image: require("@/assets/img/team-3.jpg"),
              name: "Nick Daniel",
            },
            {
              image: require("@/assets/img/team-4.jpg"),
              name: "Peterson",
            },
          ],
        },
        {
          image: require("@/assets/img/home-decor-2.jpg"),
          title: "Project #1",
          style: "Scandinavian",
          description:
            "Music is something that every person has his or her own specific opinion about.",
          avatars: [
            {
              image: require("@/assets/img/team-3.jpg"),
              name: "Nick Daniel",
            },
            {
              image: require("@/assets/img/team-4.jpg"),
              name: "Peterson",
            },
            {
              image: require("@/assets/img/team-1.jpg"),
              name: "Elena Morison",
            },
            {
              image: require("@/assets/img/team-2.jpg"),
              name: "Ryan Milly",
            },
          ],
        },
        {
          image: require("@/assets/img/home-decor-3.jpg"),
          title: "Project #3",
          style: "Minimalist",
          description:
            "Different people have different taste, and various types of music.",
          avatars: [
            {
              image: require("@/assets/img/team-4.jpg"),
              name: "Peterson",
            },
            {
              image: require("@/assets/img/team-3.jpg"),
              name: "Nick Daniel",
            },
            {
              image: require("@/assets/img/team-2.jpg"),
              name: "Ryan Milly",
            },
            {
              image: require("@/assets/img/team-1.jpg"),
              name: "Elena Morison",
            },
          ],
        },
      ],
    };
  },
};
</script>

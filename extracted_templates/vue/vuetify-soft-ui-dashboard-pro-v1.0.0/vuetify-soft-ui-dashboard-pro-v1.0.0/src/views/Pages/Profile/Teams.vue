<template>
  <v-container fluid class="py-6">
    <v-row>
      <v-col cols="12">
        <v-card class="card-shadow border-radius-xl overflow-scroll">
          <div class="px-4 py-4 d-flex">
            <v-col lg="1" md="2" sm="3" cols="4" class="text-center">
              <v-avatar size="58" class="bg-gradient-primary">
                <v-icon>fas fa-plus text-white</v-icon>
              </v-avatar>
              <p class="mb-0 text-sm text-body mt-2">Add story</p>
            </v-col>
            <v-col
              v-for="avatar in stories"
              :key="avatar.user"
              lg="1"
              md="2"
              sm="3"
              cols="4"
              class="text-center"
            >
              <v-avatar size="58" class="border border-primary px-1 py-1">
                <v-img :src="avatar.image" width="50" height="50"> </v-img>
              </v-avatar>
              <p class="mb-0 text-sm text-body mt-2">{{ avatar.user }}</p>
            </v-col>
          </div>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col lg="8" cols="12">
        <v-card class="card-shadow border-radius-xl">
          <div class="border-bottom d-flex align-center px-4 py-4">
            <div class="d-flex align-center">
              <a href="javascript:;" class="text-decoration-none">
                <v-avatar size="48" rounded>
                  <v-img
                    src="@/assets/img/team-4.jpg"
                    alt="profile-image"
                  ></v-img>
                </v-avatar>
              </a>
              <div class="mx-4">
                <a
                  href="javascript:;"
                  class="text-dark font-weight-600 text-sm text-decoration-none"
                  >John Snow</a
                >
                <small class="d-block text-muted">3 days ago</small>
              </div>
            </div>
            <div class="text-end ms-auto">
              <v-btn
                outlined
                color="#fff"
                class="font-weight-bolder bg-gradient-primary py-4 px-7"
                small
              >
                <v-icon size="8">fas fa-plus pe-2</v-icon> Follow
              </v-btn>
            </div>
          </div>
          <div class="px-4 py-4">
            <p class="mb-6 text-body">
              Personal profiles are the perfect way for you to grab their
              attention and persuade recruiters to continue reading your CV
              because you’re telling them from the off exactly why they should
              hire you.
            </p>
            <v-img
              src="https://images.unsplash.com/photo-1552581234-26160f608093?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2100&q=80"
              class="border-radius-lg shadow-lg"
            >
            </v-img>
            <v-row class="align-center px-2 mt-6 mb-2">
              <v-col sm="6">
                <div class="d-flex">
                  <div class="d-flex align-center">
                    <v-icon size="16"
                      >ni ni-like-2 me-1 text-body cursor-pointer</v-icon
                    >
                    <span class="text-sm text-body me-4">150</span>
                  </div>
                  <div class="d-flex align-center">
                    <v-icon size="16"
                      >ni ni-chat-round me-1 text-body cursor-pointer</v-icon
                    >
                    <span class="text-sm text-body me-4">36</span>
                  </div>
                  <div class="d-flex align-center">
                    <v-icon size="16"
                      >ni ni-curved-next me-1 text-body cursor-pointer</v-icon
                    >
                    <span class="text-sm text-body me-4">12</span>
                  </div>
                </div>
              </v-col>
              <v-col sm="6">
                <div class="d-flex align-center">
                  <div class="d-flex align-items-center ms-auto">
                    <v-avatar size="24" class="border border-white ms-n2">
                      <img src="@/assets/img/team-5.jpg" alt="Avatar" />
                    </v-avatar>
                    <v-avatar size="24" class="border border-white ms-n2">
                      <img src="@/assets/img/team-2.jpg" alt="Avatar" />
                    </v-avatar>
                    <v-avatar size="24" class="border border-white ms-n2">
                      <img src="@/assets/img/team-1.jpg" alt="Avatar" />
                    </v-avatar>
                  </div>
                  <small class="ps-2 font-weight-bold text-body"
                    >and 30+ more</small
                  >
                </div>
              </v-col>
            </v-row>
            <div class="mb-1">
              <hr class="horizontal dark mt-1 mb-5" />
              <div class="d-flex">
                <div class="flex-shrink-0">
                  <v-avatar>
                    <v-img src="@/assets/img/bruce-mars.jpg"></v-img>
                  </v-avatar>
                </div>
                <div class="flex-grow-1 ms-4">
                  <h5 class="text-h5 text-typo font-weight-bold mt-0 mb-2">
                    Michael Lewis
                  </h5>
                  <p class="text-sm text-body">
                    I always felt like I could do anything. That’s the main
                    thing people are controlled by! Thoughts- their perception
                    of themselves!
                  </p>
                  <div class="d-flex align-center">
                    <v-icon size="16"
                      >ni ni-like-2 me-1 mt-0 cursor-pointer text-body</v-icon
                    >
                    <span class="text-sm me-2 text-body">3 likes</span>
                    <v-icon size="16"
                      >ni ni-curved-next me-1 mt-0 cursor-pointer
                      text-body</v-icon
                    >
                    <span class="text-sm me-2 text-body">2 shares</span>
                  </div>
                </div>
              </div>

              <div class="d-flex mt-5">
                <div class="flex-shrink-0">
                  <v-avatar>
                    <v-img src="@/assets/img/team-5.jpg"></v-img>
                  </v-avatar>
                </div>
                <div class="flex-grow-1 ms-4">
                  <h5 class="text-h5 text-typo font-weight-bold mt-0 mb-2">
                    Jessica Stones
                  </h5>
                  <p class="text-sm text-body">
                    Society has put up so many boundaries, so many limitations
                    on what’s right and wrong that it’s almost impossible to get
                    a pure thought out. It’s like a little kid, a little boy.
                  </p>
                  <div class="d-flex align-center">
                    <v-icon size="16"
                      >ni ni-like-2 me-1 mt-0 cursor-pointer text-body</v-icon
                    >
                    <span class="text-sm me-2 text-body">10 likes</span>
                    <v-icon size="16"
                      >ni ni-curved-next me-1 mt-0 cursor-pointer
                      text-body</v-icon
                    >
                    <span class="text-sm me-2 text-body">1 share</span>
                  </div>
                </div>
              </div>

              <div class="d-flex mt-6">
                <div class="flex-shrink-0">
                  <v-avatar>
                    <v-img src="@/assets/img/team-4.jpg"></v-img>
                  </v-avatar>
                </div>
                <div class="flex-grow-1 ms-4">
                  <v-text-field
                    outlined
                    placeholder="Write your comment"
                    class="border"
                  >
                  </v-text-field>
                </div>
              </div>
            </div>
          </div>
        </v-card>
      </v-col>
      <v-col lg="4" cols="12">
        <v-card
          class="card-shadow border-radius-xl mb-6"
          v-for="card in cards"
          :key="card.title"
        >
          <div class="px-4 py-4">
            <v-row class="align-center">
              <v-col cols="9">
                <h5
                  class="
                    text-h5
                    font-weight-bold
                    mb-1
                    text-gradient text-primary
                  "
                >
                  <a href="javascript:;" class="text-decoration-none">{{
                    card.title
                  }}</a>
                </h5>
              </v-col>
              <v-col cols="3" class="text-end">
                <v-menu
                  transition="slide-y-transition"
                  offset-y
                  offset-x
                  min-width="150"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      icon
                      :ripple="false"
                      class="text-secondary"
                      v-bind="attrs"
                      v-on="on"
                      small
                    >
                      <v-icon size="16">fas fa-ellipsis-v</v-icon>
                    </v-btn>
                  </template>

                  <v-list class="py-0">
                    <v-list-item class="list-item-hover-active">
                      <v-list-item-content class="pa-0">
                        <v-list-item-title
                          class="
                            text-body-2
                            ls-0
                            text-typo
                            font-weight-600
                            mb-0
                          "
                        >
                          Edit Team
                        </v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                    <v-list-item class="list-item-hover-active">
                      <v-list-item-content class="pa-0">
                        <v-list-item-title
                          class="
                            text-body-2
                            ls-0
                            text-typo
                            font-weight-600
                            mb-0
                          "
                        >
                          Add Member
                        </v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                    <v-list-item class="list-item-hover-active">
                      <v-list-item-content class="pa-0">
                        <v-list-item-title
                          class="
                            text-body-2
                            ls-0
                            text-typo
                            font-weight-600
                            mb-0
                          "
                        >
                          See Details
                        </v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                    <hr class="horizontal dark" />
                    <v-list-item class="list-item-hover-active">
                      <v-list-item-content class="pa-0">
                        <v-list-item-title
                          class="text-danger ls-0 font-weight-600 mb-0"
                        >
                          Remove Team
                        </v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </v-col>
            </v-row>
            <p class="text-body mt-3">{{ card.description }}</p>
            <div class="d-flex">
              <p class="mb-0 text-body">Industry:</p>
              <v-btn
                elevation="0"
                small
                :ripple="false"
                height="21"
                class="
                  border-radius-md
                  font-weight-bolder
                  px-3
                  py-3
                  badge-font-size
                  ms-auto
                  text-body
                "
                color="#e4e8ed"
                >{{ card.industry }}</v-btn
              >
            </div>
            <hr class="horizontal dark my-4" />
            <div class="d-flex">
              <p class="mb-0 text-body">Rating:</p>
              <div class="rating ms-auto">
                <v-icon size="16">fas fa-star text-body</v-icon>
                <v-icon size="16">fas fa-star text-body ms-1</v-icon>
                <v-icon size="16">fas fa-star text-body ms-1</v-icon>
                <v-icon size="16">fas fa-star text-body ms-1</v-icon>
                <v-icon size="16" v-if="card.rating == 'partial'"
                  >fas fa-star-half-alt text-body ms-1</v-icon
                >
                <v-icon size="16" v-if="card.rating == 'full'"
                  >fas fa-star text-body ms-1</v-icon
                >
              </div>
            </div>
            <hr class="horizontal dark my-4" />
            <div class="d-flex">
              <p class="mb-0 text-body">Members:</p>
              <span class="avatar-group d-flex ms-auto">
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

        <v-card
          class="card-shadow border-radius-xl mb-6"
          v-for="(card, i) in brands"
          :key="i"
        >
          <div class="px-4 py-4">
            <div class="d-flex">
              <v-avatar>
                <v-img :src="card.img"></v-img>
              </v-avatar>
              <div class="ms-2 my-auto">
                <h6 class="mb-0 text-h6 text-typo font-weight-bold">
                  {{ card.title }}
                </h6>
                <p class="text-xs mb-0 text-body">{{ card.hour }}</p>
              </div>
            </div>
            <p class="text-body mt-3">{{ card.description }}</p>
            <div class="d-flex">
              <p class="mb-0 text-body"><b>Meeting ID</b>: {{ card.id }}</p>
            </div>
            <hr class="horizontal dark my-4" />
            <div class="d-flex">
              <v-btn
                :elevation="0"
                color="#cb0c9f"
                class="
                  font-weight-bolder
                  btn-success
                  bg-gradient-success
                  py-4
                  px-8
                "
                small
              >
                Join
              </v-btn>
              <span class="avatar-group d-flex ms-auto">
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
    </v-row>
  </v-container>
</template>
<script>
export default {
  name: "Teams",
  data: function () {
    return {
      stories: [
        {
          image: require("@/assets/img/team-1.jpg"),
          user: "Abbie W",
        },
        {
          image: require("@/assets/img/team-2.jpg"),
          user: "Boris U",
        },
        {
          image: require("@/assets/img/team-3.jpg"),
          user: "Kay R",
        },
        {
          image: require("@/assets/img/team-4.jpg"),
          user: "Tom M",
        },
        {
          image: require("@/assets/img/team-5.jpg"),
          user: "Nicole N",
        },
        {
          image: require("@/assets/img/marie.jpg"),
          user: "Marie P",
        },
        {
          image: require("@/assets/img/bruce-mars.jpg"),
          user: "Bruce M",
        },
        {
          image: require("@/assets/img/ivana-squares.jpg"),
          user: "Sandra A",
        },
        {
          image: require("@/assets/img/kal-visuals-square.jpg"),
          user: "Katty L",
        },
        {
          image: require("@/assets/img/ivana-square.jpg"),
          user: "Emma O",
        },
        {
          image: require("@/assets/img/team-9.jpeg"),
          user: "Tao G",
        },
      ],
      cards: [
        {
          title: "Digital Marketing",
          description:
            "A group of people who collectively are responsible for all of the work necessary to produce working, validated assets.",
          industry: "Martketing Team",
          rating: "partial",
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
          title: "Design",
          description:
            "Because it's about motivating the doers. Because I’m here to follow my dreams and inspire other people to follow their dreams, too.",
          industry: "Design Team",
          rating: "full",
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
              image: require("@/assets/img/team-1.jpg"),
              name: "Elena Morison",
            },
            {
              image: require("@/assets/img/team-2.jpg"),
              name: "Ryan Milly",
            },
          ],
        },
      ],
      brands: [
        {
          img: require("@/assets/img/small-logos/logo-slack.svg"),
          title: "Slack Meet",
          hour: "11:00 AM",
          id: "902-128-281",
          description: "You have an upcoming meet for Marketing Planning",
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
          img: require("@/assets/img/small-logos/logo-invision.svg"),
          title: "Invision",
          hour: "4:50 PM",
          id: "111-968-981",
          description:
            "You have an upcoming video call for Soft Design at 5:00 PM.",
          avatars: [
            {
              image: require("@/assets/img/team-3.jpg"),
              name: "Nick Daniel",
            },
            {
              image: require("@/assets/img/team-1.jpg"),
              name: "Elena Morison",
            },
            {
              image: require("@/assets/img/team-2.jpg"),
              name: "Ryan Milly",
            },
            {
              image: require("@/assets/img/team-4.jpg"),
              name: "Peterson",
            },
          ],
        },
      ],
    };
  },
};
</script>

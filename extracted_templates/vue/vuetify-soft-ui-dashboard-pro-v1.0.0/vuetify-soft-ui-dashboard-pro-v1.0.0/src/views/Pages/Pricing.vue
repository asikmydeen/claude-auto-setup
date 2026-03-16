<template>
  <v-row class="justify-center d-flex mt-n16">
    <v-col lg="4" v-for="plan in plans" :key="plan.title">
      <v-card class="card-shadow border-radius-xl">
        <div class="px-6 pt-6 pb-4 text-center">
          <v-btn
            elevation="0"
            small
            :ripple="false"
            height="21"
            class="
              border-radius-xl
              font-weight-bolder
              px-3
              py-3
              badge-font-size
              ms-auto
              text-dark
            "
            color="#e9ecef"
            >{{ plan.title }}</v-btn
          >
          <h1 class="text-h1 text-typo font-weight-bold mt-1">
            <small>$</small>{{ plan.price }}
          </h1>

          <v-list class="py-6 text-lg-start text-center" color="transparent">
            <v-list-item
              v-for="item in plan.features"
              :key="item.title"
              class="px-0 py-0"
            >
              <v-list-item-avatar
                :size="24"
                color="#fff"
                class="my-0 me-4 shadow"
                :class="`bg-gradient-` + item.color"
              >
                <v-icon size="9" class="text-white">{{ item.icon }}</v-icon>
              </v-list-item-avatar>

              <v-list-item-content class="text-left">
                <v-list-item-title
                  v-text="item.title"
                  class="text-body-1 ls-0 text-muted"
                ></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
          <v-btn
            elevation="0"
            :ripple="false"
            height="43"
            class="
              font-weight-bold
              btn-primary
              py-3
              text-xs
              px-6
              ls-0
              w-100
              border-radius-md
            "
            :class="`bg-gradient-` + plan.buttonColor"
          >
            {{ plan.buttonText }}
            <v-icon size="12">fas fa-arrow-right ms-2</v-icon>
          </v-btn>
        </div>
      </v-card>
    </v-col>

    <v-col cols="8" class="mx-auto text-center mt-10">
      <h6 class="opacity-5 text-h6 text-typo font-weight-bold">
        More than 50+ brands trust Soft
      </h6>
    </v-col>
    <v-col cols="12" class="mb-6">
      <v-row class="mt-1">
        <v-col
          lg="2"
          md="4"
          cols="6"
          class="mb-6"
          v-for="brand in brands"
          :key="brand.name"
        >
          <v-img
            :alt="brand.name"
            :src="brand.image"
            width="200px"
            class="opacity-9"
          ></v-img>
        </v-col>
      </v-row>
    </v-col>

    <v-col md="6" class="mt-16 mx-auto text-center">
      <h2 class="text-typo text-h2 font-weight-bolder mb-2">
        Frequently Asked Questions
      </h2>
      <p class="text-body">
        A lot of people don't appreciate the moment until it’s passed. I'm not
        trying my hardest, and I'm not trying to do
      </p>
    </v-col>

    <v-col md="10" class="mx-auto">
      <v-expansion-panels flat color="#ddd">
        <v-expansion-panel
          v-for="panel in panels"
          :key="panel.title"
          class="bg-transparent"
        >
          <v-expansion-panel-header>
            <h5 class="text-h5 font-weight-bold text-typo">
              {{ panel.title }}
            </h5>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <p class="text-body text-sm opacity-8">{{ panel.description }}</p>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-col>
  </v-row>
</template>
<script>
export default {
  name: "pricing",
  data() {
    return {
      plans: [
        {
          title: "Starter",
          price: "119",
          buttonColor: "default",
          buttonText: "Join",
          features: [
            {
              title: "2 team members",
              icon: "fas fa-check",
              color: "success",
            },
            {
              title: "20GB Cloud storage",
              icon: "fas fa-check",
              color: "success",
            },
            {
              title: "Integration help",
              icon: "fas fa-minus",
              color: "secondary",
            },
            {
              title: "Sketch Files",
              icon: "fas fa-minus",
              color: "secondary",
            },
            {
              title: "API Access",
              icon: "fas fa-minus",
              color: "secondary",
            },
            {
              title: "Complete documentation",
              icon: "fas fa-minus",
              color: "secondary",
            },
          ],
        },
        {
          title: "Premium",
          price: "159",
          buttonColor: "primary",
          buttonText: "Try Premium",
          features: [
            {
              title: "10 team members",
              icon: "fas fa-check",
              color: "success",
            },
            {
              title: "40GB Cloud storage",
              icon: "fas fa-check",
              color: "success",
            },
            {
              title: "Integration help",
              icon: "fas fa-check",
              color: "success",
            },
            {
              title: "Sketch Files",
              icon: "fas fa-check",
              color: "success",
            },
            {
              title: "API Access",
              icon: "fas fa-minus",
              color: "secondary",
            },
            {
              title: "Complete documentation",
              icon: "fas fa-minus",
              color: "secondary",
            },
          ],
        },
        {
          title: "Enterprise",
          price: "399",
          buttonColor: "default",
          buttonText: "Join",
          features: [
            {
              title: "Unlimited team members",
              icon: "fas fa-check",
              color: "success",
            },
            {
              title: "100GB Cloud storage",
              icon: "fas fa-check",
              color: "success",
            },
            {
              title: "Integration help",
              icon: "fas fa-check",
              color: "success",
            },
            {
              title: "Sketch Files",
              icon: "fas fa-check",
              color: "success",
            },
            {
              title: "API Access",
              icon: "fas fa-check",
              color: "success",
            },
            {
              title: "Complete documentation",
              icon: "fas fa-check",
              color: "success",
            },
          ],
        },
      ],
      brands: [
        {
          name: "coinbase",
          image: require("@/assets/img/logos/gray-logos/logo-coinbase.svg"),
        },
        {
          name: "nasa",
          image: require("@/assets/img/logos/gray-logos/logo-nasa.svg"),
        },
        {
          name: "netflix",
          image: require("@/assets/img/logos/gray-logos/logo-netflix.svg"),
        },
        {
          name: "pinterest",
          image: require("@/assets/img/logos/gray-logos/logo-pinterest.svg"),
        },
        {
          name: "spotify",
          image: require("@/assets/img/logos/gray-logos/logo-spotify.svg"),
        },
        {
          name: "vodafone",
          image: require("@/assets/img/logos/gray-logos/logo-vodafone.svg"),
        },
      ],
      panels: [
        {
          title: "How do I order?",
          description:
            "We’re not always in the position that we want to be at. We’re constantly growing. We’re constantly making mistakes. We’re constantly trying to express ourselves and actualize our dreams. If you have the opportunity to play this game of life you need to appreciate every moment. A lot of people don’t appreciate the moment until it’s passed.",
        },
        {
          title: "How can i make the payment?",
          description:
            "It really matters and then like it really doesn’t matter. What matters is the people who are sparked by it. And the people who are like offended by it, it doesn’t matter. Because it's about motivating the doers. Because I’m here to follow my dreams and inspire other people to follow their dreams, too. We’re not always in the position that we want to be at. We’re constantly growing. We’re constantly making mistakes. We’re constantly trying to express ourselves and actualize our dreams. If you have the opportunity to play this game of life you need to appreciate every moment. A lot of people don’t appreciate the moment until it’s passed.",
        },
        {
          title: "How much time does it take to receive the order?",
          description:
            "The time is now for it to be okay to be great. People in this world shun people for being great. For being a bright color. For standing out. But the time is now to be okay to be the greatest you. Would you believe in what you believe in, if you were the only one who believed it? If everything I did failed - which it doesn't, it actually succeeds - just the fact that I'm willing to fail is an inspiration. People are so scared to lose that they don't even try. Like, one thing people can't say is that I'm not trying, and I'm not trying my hardest, and I'm not trying to do the best way I know how.",
        },
        {
          title: "Can I resell the products?",
          description:
            "I always felt like I could do anything. That’s the main thing people are controlled by! Thoughts- their perception of themselves! They're slowed down by their perception of themselves. If you're taught you can’t do anything, you won’t do anything. I was taught I could do everything. If everything I did failed - which it doesn't, it actually succeeds - just the fact that I'm willing to fail is an inspiration. People are so scared to lose that they don't even try. Like, one thing people can't say is that I'm not trying, and I'm not trying my hardest, and I'm not trying to do the best way I know how.",
        },
        {
          title: "Where do I find the shipping details?",
          description:
            "There’s nothing I really wanted to do in life that I wasn’t able to get good at. That’s my skill. I’m not really specifically talented at anything except for the ability to learn. That’s what I do. That’s what I’m here for. Don’t be afraid to be wrong because you can’t learn anything from a compliment. I always felt like I could do anything. That’s the main thing people are controlled by! Thoughts- their perception of themselves! They're slowed down by their perception of themselves. If you're taught you can’t do anything, you won’t do anything. I was taught I could do everything.",
        },
      ],
    };
  },
};
</script>

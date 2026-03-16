<template>
  <v-card>
    <v-card-text class="px-0 py-0">
      <v-simple-table class="table">
        <template v-slot:default>
          <thead>
            <tr>
              <th
                class="
                  text-left text-uppercase text-secondary text-xxs
                  font-weight-bolder
                  opacity-7
                "
              >
                Product
              </th>
              <th
                class="
                  text-left text-uppercase text-secondary text-xxs
                  font-weight-bolder
                  opacity-7
                "
              >
                Price
              </th>
              <th
                class="
                  text-center text-uppercase text-secondary text-xxs
                  font-weight-bolder
                  opacity-7
                "
              >
                Review
              </th>
              <th
                class="
                  text-center text-uppercase text-secondary text-xxs
                  font-weight-bolder
                  opacity-7
                "
              >
                Availability
              </th>
              <th
                class="
                  text-left text-uppercase text-secondary text-xxs
                  font-weight-bolder
                  opacity-7
                "
              >
                Id
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in projects" :key="item.id">
              <td class="border-bottom">
                <v-list class="py-0">
                  <v-list-item class="px-0 py-4">
                    <v-list-item-avatar
                      :size="48"
                      class="my-0 me-4 border-radius-lg"
                    >
                      <v-img :alt="item.imgSrc" :src="item.imgSrc"></v-img>
                    </v-list-item-avatar>

                    <v-list-item-content>
                      <v-list-item-title
                        class="text-typo text-subtitle-2 ls-0 font-weight-bold"
                        >{{ item.project }}</v-list-item-title
                      >
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </td>
              <td class="border-bottom">
                <p class="text-sm text-secondary mb-0">{{ item.price }}</p>
              </td>
              <td class="text-body border-bottom text-center">
                <div class="d-flex align-center">
                  <div class="rating mx-auto">
                    <i class="fas fa-star text-md me-1" aria-hidden="true"></i>
                    <i class="fas fa-star text-md me-1" aria-hidden="true"></i>
                    <i class="fas fa-star text-md me-1" aria-hidden="true"></i>
                    <i class="fas fa-star text-md me-1" aria-hidden="true"></i>
                    <i
                      class="fas text-md"
                      :class="
                        item.lastIcon == 'half' ? 'fa-star-half-alt' : 'fa-star'
                      "
                      aria-hidden="true"
                    >
                    </i>
                  </div>
                </div>
              </td>
              <td class="border-bottom">
                <div class="d-flex align-center">
                  <v-progress-linear
                    class="progress-shadow mx-auto"
                    :value="item.progressValue"
                    rounded
                    background-color="#e9ecef"
                    :color="item.progressColor"
                  ></v-progress-linear>
                </div>
              </td>

              <td class="border-bottom">
                <span class="text-secondary text-sm">{{ item.id }}</span>
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-card-text>
  </v-card>
</template>
<script>
export default {
  name: "light-table",
  data() {
    return {
      projects: [
        {
          id: 230019,
          project: "Christopher Knight Home",
          imgSrc:
            "https://raw.githubusercontent.com/creativetimofficial/public-assets/master/soft-ui-design-system/assets/img/ecommerce/black-chair.jpg",
          price: "$89.53",
          lastIcon: "half",
          progressValue: "80",
          progressColor: "#17ad37",
        },
        {
          id: 87120,
          project: "Bar Height Swivel Barstool",
          imgSrc:
            "https://raw.githubusercontent.com/creativetimofficial/public-assets/master/soft-ui-design-system/assets/img/ecommerce/chair-pink.jpg",
          price: "$99.99",
          lastIcon: "full",
          progressValue: "90",
          progressColor: "#17ad37",
        },
        {
          id: 412301,
          project: "Signature Design by Ashley",
          imgSrc:
            "https://raw.githubusercontent.com/creativetimofficial/public-assets/master/soft-ui-design-system/assets/img/ecommerce/chair-steel.jpg",
          price: "$129.00",
          lastIcon: "half",
          progressValue: "60",
          progressColor: "#f53939",
        },
        {
          id: 199200,
          project: "Modern Square",
          imgSrc:
            "https://raw.githubusercontent.com/creativetimofficial/public-assets/master/soft-ui-design-system/assets/img/ecommerce/chair-wood.jpg",
          price: "$59.99",
          lastIcon: "half",
          progressValue: "30",
          progressColor: "#f53939",
        },
      ],
    };
  },
};
</script>

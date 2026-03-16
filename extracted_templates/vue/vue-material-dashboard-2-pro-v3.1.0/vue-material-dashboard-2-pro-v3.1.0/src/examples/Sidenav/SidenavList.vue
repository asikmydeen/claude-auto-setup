<template>
  <div
    id="sidenav-collapse-main"
    class="w-auto h-auto collapse navbar-collapse max-height-vh-100 h-100"
  >
    <ul class="navbar-nav">
      <li class="nav-item" :class="getRoute() === 'dashboards' ? 'active' : ''">
        <sidenav-collapse
          collapse-ref="brooklynAlice"
          nav-text="Brooklyn Alice"
          :class="getRoute() === 'brooklynAlice' ? 'active' : ''"
        >
          <template #icon>
            <img src="../../assets/img/team-3.jpg" class="avatar" />
          </template>
          <template #list>
            <ul class="nav pe-0">
              <!-- nav links -->
              <sidenav-item
                :to="{ name: 'Profile Overview' }"
                mini-icon="MP"
                text="My Profile"
              />
              <sidenav-item
                :to="{ name: 'Settings' }"
                mini-icon="S"
                text="Settings"
              />
              <sidenav-item
                :to="{ name: 'Signin Basic' }"
                mini-icon="L"
                text="Logout"
              />
            </ul>
          </template>
        </sidenav-collapse>
      </li>
      <hr class="horizontal light mt-2 mb-2" />
      <li class="nav-item" :class="getRoute() === 'dashboards' ? 'active' : ''">
        <sidenav-collapse
          collapse-ref="dashboardsExamples"
          nav-text="Dashboards"
          :class="getRoute() === 'dashboards' ? 'active' : ''"
        >
          <template #icon>
            <i class="material-icons-round opacity-10">dashboard</i>
          </template>
          <template #list>
            <ul class="nav pe-0">
              <!-- nav links -->
              <sidenav-item
                :to="{ name: 'Default' }"
                mini-icon="D"
                text="Analytics"
              />
              <sidenav-item
                :to="{ name: 'Sales' }"
                mini-icon="S"
                text="Sales"
              />
            </ul>
          </template>
        </sidenav-collapse>
      </li>
      <li class="mt-3 nav-item">
        <h6
          class="text-xs ps-4 text-uppercase font-weight-bolder text-white"
          :class="isRTL ? 'me-4' : 'ms-2'"
        >
          PAGES
        </h6>
      </li>
      <li class="nav-item" :class="getRoute() === 'dashboards' ? 'active' : ''">
        <sidenav-collapse
          collapse-ref="pagesExamples"
          nav-text="Pages"
          :class="getRoute() === 'pages' ? 'active' : ''"
        >
          <template #icon>
            <i class="material-icons-round opacity-10">image</i>
          </template>
          <template #list>
            <ul class="nav pe-0">
              <!-- nav links -->
              <sidenav-collapse-item
                refer="profileExample"
                mini-icon="P"
                text="Profile"
              >
                <template #nav-child-item>
                  <sidenav-item
                    :to="{ name: 'Profile Overview' }"
                    mini-icon="P"
                    text="Profile Overview"
                  />
                  <sidenav-item
                    :to="{ name: 'All Projects' }"
                    mini-icon="A"
                    text="All Projects"
                  />
                </template>
              </sidenav-collapse-item>

              <sidenav-collapse-item
                refer="usersExample"
                mini-icon="U"
                text="Users"
              >
                <template #nav-child-item>
                  <sidenav-item
                    :to="{ name: 'New User' }"
                    mini-icon="N"
                    text="New User"
                  />
                </template>
              </sidenav-collapse-item>

              <sidenav-collapse-item
                refer="accountExample"
                mini-icon="A"
                text="Account"
              >
                <template #nav-child-item>
                  <sidenav-item
                    :to="{ name: 'Settings' }"
                    mini-icon="S"
                    text="Settings"
                  />
                  <sidenav-item
                    :to="{ name: 'Billing' }"
                    mini-icon="B"
                    text="Billing"
                  />
                  <sidenav-item
                    :to="{ name: 'Invoice' }"
                    mini-icon="I"
                    text="Invoice"
                  />
                </template>
              </sidenav-collapse-item>

              <sidenav-collapse-item
                refer="projectsExample"
                mini-icon="P"
                text="Projects"
              >
                <template #nav-child-item>
                  <sidenav-item
                    :to="{ name: 'Timeline' }"
                    mini-icon="T"
                    text="Timeline"
                  />
                </template>
              </sidenav-collapse-item>

              <sidenav-item
                :to="{ name: 'Pricing Page' }"
                mini-icon="P"
                text="Pricing Page"
              />
              <sidenav-item :to="{ name: 'RTL' }" mini-icon="R" text="RTL" />
              <sidenav-item
                :to="{ name: 'Widgets' }"
                mini-icon="W"
                text="Widgets"
              />
              <sidenav-item
                :to="{ name: 'Charts' }"
                mini-icon="C"
                text="Charts"
              />
              <sidenav-item
                :to="{ name: 'Notifications' }"
                mini-icon="N"
                text="Notifications"
              />
            </ul>
          </template>
        </sidenav-collapse>
      </li>

      <li class="nav-item" :class="getRoute() === 'dashboards' ? 'active' : ''">
        <sidenav-collapse
          collapse-ref="applicationsExamples"
          nav-text="Applications"
          :class="getRoute() === 'applications' ? 'active' : ''"
        >
          <template #icon>
            <i class="material-icons-round opacity-10">apps</i>
          </template>
          <template #list>
            <ul class="nav pe-0">
              <!-- nav links -->

              <sidenav-item
                :to="{ name: 'Kanban' }"
                mini-icon="K"
                text="Kanban"
              />
              <sidenav-item
                :to="{ name: 'Wizard' }"
                mini-icon="W"
                text="Wizard"
              />
              <sidenav-item
                :to="{ name: 'Data Tables' }"
                mini-icon="D"
                text="Data Tables"
              />
              <sidenav-item
                :to="{ name: 'Calendar' }"
                mini-icon="C"
                text="Calendar"
              />
            </ul>
          </template>
        </sidenav-collapse>
      </li>

      <li class="nav-item" :class="getRoute() === 'dashboards' ? 'active' : ''">
        <sidenav-collapse
          collapse-ref="ecommerceExamples"
          nav-text="Ecommerce"
          :class="getRoute() === 'ecommerce' ? 'active' : ''"
        >
          <template #icon>
            <i class="material-icons-round opacity-10">shopping_basket</i>
          </template>
          <template #list>
            <ul class="nav pe-0">
              <!-- nav links -->

              <sidenav-collapse-item
                refer="productsExample"
                mini-icon="P"
                text="Products"
              >
                <template #nav-child-item>
                  <sidenav-item
                    :to="{ name: 'New Product' }"
                    mini-icon="N"
                    text="New Product"
                  />
                  <sidenav-item
                    :to="{ name: 'Edit Product' }"
                    mini-icon="E"
                    text="Edit Product"
                  />
                  <sidenav-item
                    :to="{ name: 'Product Page' }"
                    mini-icon="P"
                    text="Product page"
                  />
                </template>
              </sidenav-collapse-item>

              <sidenav-collapse-item
                refer="ordersExample"
                mini-icon="O"
                text="Orders"
              >
                <template #nav-child-item>
                  <sidenav-item
                    :to="{ name: 'Order List' }"
                    mini-icon="O"
                    text="Order List"
                  />
                  <sidenav-item
                    :to="{ name: 'Order Details' }"
                    mini-icon="O"
                    text="Order Details"
                  />
                </template>
              </sidenav-collapse-item>
            </ul>
          </template>
        </sidenav-collapse>
      </li>

      <li class="nav-item" :class="getRoute() === 'dashboards' ? 'active' : ''">
        <sidenav-collapse
          collapse-ref="authExamples"
          nav-text="Authentication"
          :class="getRoute() === 'authentication' ? 'active' : ''"
        >
          <template #icon>
            <i class="material-icons-round opacity-10">content_paste</i>
          </template>
          <template #list>
            <ul class="nav pe-0">
              <!-- nav links -->
              <sidenav-collapse-item
                refer="signinExample"
                mini-icon="S"
                text="Sign In"
              >
                <template #nav-child-item>
                  <sidenav-item
                    :to="{ name: 'Signin Basic' }"
                    mini-icon="B"
                    text="Basic"
                  />
                  <sidenav-item
                    :to="{ name: 'Signin Cover' }"
                    mini-icon="C"
                    text="Cover"
                  />
                  <sidenav-item
                    :to="{ name: 'Signin Illustration' }"
                    mini-icon="I"
                    text="Illustration"
                  />
                </template>
              </sidenav-collapse-item>

              <sidenav-collapse-item
                refer="signupExample"
                mini-icon="S"
                text="Sign Up"
              >
                <template #nav-child-item>
                  <sidenav-item
                    :to="{ name: 'Signup Cover' }"
                    mini-icon="C"
                    text="Cover"
                  />
                </template>
              </sidenav-collapse-item>

              <sidenav-collapse-item
                refer="resetExample"
                mini-icon="R"
                text="Reset Password"
              >
                <template #nav-child-item>
                  <sidenav-item
                    :to="{ name: 'Reset Cover' }"
                    mini-icon="C"
                    text="Cover"
                  />
                </template>
              </sidenav-collapse-item>
            </ul>
          </template>
        </sidenav-collapse>
      </li>
      <li class="mt-3 nav-item">
        <hr class="horizontal light mt-0" />
        <h6
          class="text-xs ps-4 ms-2 text-uppercase font-weight-bolder text-white"
          :class="isRTL ? 'me-4' : 'ms-2'"
        >
          DOCS
        </h6>
      </li>
      <li class="nav-item" :class="getRoute() === 'dashboards' ? 'active' : ''">
        <sidenav-collapse
          collapse-ref="basicExamples"
          nav-text="Basic"
          icon="dashboard"
          :class="getRoute() === 'basic' ? 'active' : ''"
        >
          <template #icon>
            <i class="material-icons-round opacity-10">upcoming</i>
          </template>
          <template #list>
            <ul class="nav pe-0">
              <!-- nav links -->
              <sidenav-collapse-item
                refer="gettingStartedExample"
                mini-icon="G"
                text="Getting Started"
              >
                <template #nav-child-item>
                  <li
                    class="nav-item"
                    :class="getRoute() === 'dashboards' ? 'active' : ''"
                  >
                    <a
                      class="nav-link"
                      href="https://www.creative-tim.com/learning-lab/vue/quick-start/material-dashboard/"
                      target="_blank"
                    >
                      <span class="text-xs sidenav-mini-icon">Q</span>
                      <span class="sidenav-normal me-3 ms-3 ps-1 text-white"
                        >Quick Start</span
                      >
                    </a>
                  </li>
                  <li
                    class="nav-item"
                    :class="getRoute() === 'dashboards' ? 'active' : ''"
                  >
                    <a
                      class="nav-link"
                      href="https://www.creative-tim.com/learning-lab/vue/license/material-dashboard/"
                      target="_blank"
                    >
                      <span class="text-xs sidenav-mini-icon">L</span>
                      <span class="sidenav-normal me-3 ms-3 ps-1 text-white"
                        >License</span
                      >
                    </a>
                  </li>
                  <li
                    class="nav-item"
                    :class="getRoute() === 'dashboards' ? 'active' : ''"
                  >
                    <a
                      class="nav-link"
                      href="https://www.creative-tim.com/learning-lab/vue/overview/material-dashboard/"
                      target="_blank"
                    >
                      <span class="text-xs sidenav-mini-icon">C</span>
                      <span class="sidenav-normal me-3 ms-3 ps-1 text-white"
                        >Contents</span
                      >
                    </a>
                  </li>
                  <li
                    class="nav-item"
                    :class="getRoute() === 'dashboards' ? 'active' : ''"
                  >
                    <a
                      class="nav-link"
                      href="https://www.creative-tim.com/learning-lab/vue/build-tools/material-dashboard/"
                      target="_blank"
                    >
                      <span class="text-xs sidenav-mini-icon">B</span>
                      <span class="sidenav-normal me-3 ms-3 ps-1 text-white"
                        >Build Tools</span
                      >
                    </a>
                  </li>
                </template>
              </sidenav-collapse-item>

              <sidenav-collapse-item
                refer="foundationExample"
                mini-icon="F"
                text="Foundation"
              >
                <template #nav-child-item>
                  <li
                    class="nav-item"
                    :class="getRoute() === 'dashboards' ? 'active' : ''"
                  >
                    <a
                      class="nav-link"
                      href="https://www.creative-tim.com/learning-lab/vue/colors/material-dashboard/"
                      target="_blank"
                    >
                      <span class="text-xs sidenav-mini-icon">C</span>
                      <span class="sidenav-normal me-3 ms-3 ps-1 text-white"
                        >Colors</span
                      >
                    </a>
                  </li>
                  <li
                    class="nav-item"
                    :class="getRoute() === 'dashboards' ? 'active' : ''"
                  >
                    <a
                      class="nav-link"
                      href="https://www.creative-tim.com/learning-lab/vue/grid/material-dashboard/"
                      target="_blank"
                    >
                      <span class="text-xs sidenav-mini-icon">G</span>
                      <span class="sidenav-normal me-3 ms-3 ps-1 text-white"
                        >Grid</span
                      >
                    </a>
                  </li>
                  <li
                    class="nav-item"
                    :class="getRoute() === 'dashboards' ? 'active' : ''"
                  >
                    <a
                      class="nav-link"
                      href="https://www.creative-tim.com/learning-lab/vue/typography/material-dashboard/"
                      target="_blank"
                    >
                      <span class="text-xs sidenav-mini-icon">T</span>
                      <span class="sidenav-normal me-3 ms-3 ps-1 text-white"
                        >Typography</span
                      >
                    </a>
                  </li>
                  <li
                    class="nav-item"
                    :class="getRoute() === 'dashboards' ? 'active' : ''"
                  >
                    <a
                      class="nav-link"
                      href="https://www.creative-tim.com/learning-lab/vue/icons/material-dashboard/"
                      target="_blank"
                    >
                      <span class="text-xs sidenav-mini-icon">I</span>
                      <span class="sidenav-normal me-3 ms-3 ps-1 text-white"
                        >Icons</span
                      >
                    </a>
                  </li>
                </template>
              </sidenav-collapse-item>
            </ul>
          </template>
        </sidenav-collapse>
      </li>
      <li class="nav-item" :class="getRoute() === 'dashboards' ? 'active' : ''">
        <sidenav-collapse
          collapse-ref="componentsExamples"
          nav-text="Components"
          :class="getRoute() === 'components' ? 'active' : ''"
        >
          <template #icon>
            <i class="material-icons-round opacity-10">view_in_ar</i>
          </template>
          <template #list>
            <ul class="nav pe-0">
              <!-- nav links -->
              <li
                class="nav-item"
                :class="getRoute() === 'dashboards' ? 'active' : ''"
              >
                <a
                  class="nav-link"
                  href="https://www.creative-tim.com/learning-lab/vue/alerts/material-dashboard/"
                  target="_blank"
                >
                  <span class="sidenav-mini-icon text-white">A</span>
                  <span class="sidenav-normal me-3 ms-3 ps-1 text-white"
                    >Alerts</span
                  >
                </a>
              </li>
              <li
                class="nav-item"
                :class="getRoute() === 'dashboards' ? 'active' : ''"
              >
                <a
                  class="nav-link"
                  href="https://www.creative-tim.com/learning-lab/vue/badge/material-dashboard/"
                  target="_blank"
                >
                  <span class="sidenav-mini-icon text-white">B</span>
                  <span class="sidenav-normal me-3 ms-3 ps-1 text-white"
                    >Badge</span
                  >
                </a>
              </li>
              <li
                class="nav-item"
                :class="getRoute() === 'dashboards' ? 'active' : ''"
              >
                <a
                  class="nav-link"
                  href="https://www.creative-tim.com/learning-lab/vue/buttons/material-dashboard/"
                  target="_blank"
                >
                  <span class="sidenav-mini-icon text-white">B</span>
                  <span class="sidenav-normal me-3 ms-3 ps-1 text-white"
                    >Buttons</span
                  >
                </a>
              </li>
              <li
                class="nav-item"
                :class="getRoute() === 'dashboards' ? 'active' : ''"
              >
                <a
                  class="nav-link"
                  href="https://www.creative-tim.com/learning-lab/vue/cards/material-dashboard/"
                  target="_blank"
                >
                  <span class="sidenav-mini-icon text-white">C</span>
                  <span class="sidenav-normal me-3 ms-3 ps-1 text-white"
                    >Card</span
                  >
                </a>
              </li>
              <li
                class="nav-item"
                :class="getRoute() === 'dashboards' ? 'active' : ''"
              >
                <a
                  class="nav-link"
                  href="https://www.creative-tim.com/learning-lab/vue/carousel/material-dashboard/"
                  target="_blank"
                >
                  <span class="sidenav-mini-icon text-white">C</span>
                  <span class="sidenav-normal me-3 ms-3 ps-1 text-white"
                    >Carousel</span
                  >
                </a>
              </li>
              <li
                class="nav-item"
                :class="getRoute() === 'dashboards' ? 'active' : ''"
              >
                <a
                  class="nav-link"
                  href="https://www.creative-tim.com/learning-lab/vue/collapse/material-dashboard/"
                  target="_blank"
                >
                  <span class="sidenav-mini-icon text-white">C</span>
                  <span class="sidenav-normal me-3 ms-3 ps-1 text-white"
                    >Collapse</span
                  >
                </a>
              </li>
              <li
                class="nav-item"
                :class="getRoute() === 'dashboards' ? 'active' : ''"
              >
                <a
                  class="nav-link"
                  href="https://www.creative-tim.com/learning-lab/vue/dropdowns/material-dashboard/"
                  target="_blank"
                >
                  <span class="sidenav-mini-icon text-white">D</span>
                  <span class="sidenav-normal me-3 ms-3 ps-1 text-white"
                    >Dropdowns</span
                  >
                </a>
              </li>
              <li
                class="nav-item"
                :class="getRoute() === 'dashboards' ? 'active' : ''"
              >
                <a
                  class="nav-link"
                  href="https://www.creative-tim.com/learning-lab/vue/forms/material-dashboard/"
                  target="_blank"
                >
                  <span class="sidenav-mini-icon text-white">F</span>
                  <span class="sidenav-normal me-3 ms-3 ps-1 text-white"
                    >Forms</span
                  >
                </a>
              </li>
              <li
                class="nav-item"
                :class="getRoute() === 'dashboards' ? 'active' : ''"
              >
                <a
                  class="nav-link"
                  href="https://www.creative-tim.com/learning-lab/vue/modal/material-dashboard/"
                  target="_blank"
                >
                  <span class="sidenav-mini-icon text-white">M</span>
                  <span class="sidenav-normal me-3 ms-3 ps-1 text-white"
                    >Modal</span
                  >
                </a>
              </li>
              <li
                class="nav-item"
                :class="getRoute() === 'dashboards' ? 'active' : ''"
              >
                <a
                  class="nav-link"
                  href="https://www.creative-tim.com/learning-lab/vue/navs/material-dashboard/"
                  target="_blank"
                >
                  <span class="sidenav-mini-icon text-white">N</span>
                  <span class="sidenav-normal me-3 ms-3 ps-1 text-white"
                    >Navs</span
                  >
                </a>
              </li>
              <li
                class="nav-item"
                :class="getRoute() === 'dashboards' ? 'active' : ''"
              >
                <a
                  class="nav-link"
                  href="https://www.creative-tim.com/learning-lab/vue/navbar/material-dashboard/"
                  target="_blank"
                >
                  <span class="sidenav-mini-icon text-white">N</span>
                  <span class="sidenav-normal me-3 ms-3 ps-1 text-white"
                    >Navbar</span
                  >
                </a>
              </li>
              <li
                class="nav-item"
                :class="getRoute() === 'dashboards' ? 'active' : ''"
              >
                <a
                  class="nav-link"
                  href="https://www.creative-tim.com/learning-lab/vue/pagination/material-dashboard/"
                  target="_blank"
                >
                  <span class="sidenav-mini-icon text-white">P</span>
                  <span class="sidenav-normal me-3 ms-3 ps-1 text-white"
                    >Pagination</span
                  >
                </a>
              </li>
              <li
                class="nav-item"
                :class="getRoute() === 'dashboards' ? 'active' : ''"
              >
                <a
                  class="nav-link"
                  href="https://www.creative-tim.com/learning-lab/vue/popovers/material-dashboard/"
                  target="_blank"
                >
                  <span class="sidenav-mini-icon text-white">P</span>
                  <span class="sidenav-normal me-3 ms-3 ps-1 text-white"
                    >Popovers</span
                  >
                </a>
              </li>
              <li
                class="nav-item"
                :class="getRoute() === 'dashboards' ? 'active' : ''"
              >
                <a
                  class="nav-link"
                  href="https://www.creative-tim.com/learning-lab/vue/progress/material-dashboard/"
                  target="_blank"
                >
                  <span class="sidenav-mini-icon text-white">P</span>
                  <span class="sidenav-normal me-3 ms-3 ps-1 text-white"
                    >Progress</span
                  >
                </a>
              </li>
              <li
                class="nav-item"
                :class="getRoute() === 'dashboards' ? 'active' : ''"
              >
                <a
                  class="nav-link"
                  href="https://www.creative-tim.com/learning-lab/vue/spinners/material-dashboard/"
                  target="_blank"
                >
                  <span class="sidenav-mini-icon text-white">S</span>
                  <span class="sidenav-normal me-3 ms-3 ps-1 text-white"
                    >Spinners</span
                  >
                </a>
              </li>
              <li
                class="nav-item"
                :class="getRoute() === 'dashboards' ? 'active' : ''"
              >
                <a
                  class="nav-link"
                  href="https://www.creative-tim.com/learning-lab/vue/tables/material-dashboard/"
                  target="_blank"
                >
                  <span class="sidenav-mini-icon text-white">T</span>
                  <span class="sidenav-normal me-3 ms-3 ps-1 text-white"
                    >Tables</span
                  >
                </a>
              </li>
              <li
                class="nav-item"
                :class="getRoute() === 'dashboards' ? 'active' : ''"
              >
                <a
                  class="nav-link"
                  href="https://www.creative-tim.com/learning-lab/vue/tooltips/material-dashboard/"
                  target="_blank"
                >
                  <span class="sidenav-mini-icon text-white">T</span>
                  <span class="sidenav-normal me-3 ms-3 ps-1 text-white"
                    >Tooltips</span
                  >
                </a>
              </li>
            </ul>
          </template>
        </sidenav-collapse>
      </li>
      <li class="nav-item" :class="getRoute() === 'dashboards' ? 'active' : ''">
        <sidenav-collapse
          nav-text="Changelog"
          :collapse="false"
          url="#"
          :aria-controls="''"
          collapse-ref="https://github.com/creativetimofficial/ct-vue-material-dashboard-2-pro/blob/main/CHANGELOG.md"
        >
          <template #icon>
            <i class="material-icons-round opacity-10">receipt_long</i>
          </template>
        </sidenav-collapse>
      </li>
    </ul>
  </div>
</template>
<script>
import SidenavItem from "./SidenavItem.vue";
import SidenavCollapse from "./SidenavCollapse.vue";
import SidenavCollapseItem from "./SidenavCollapseItem.vue";
import { mapState } from "vuex";
export default {
  name: "SidenavList",
  components: {
    SidenavItem,
    SidenavCollapse,
    SidenavCollapseItem
  },
  data() {
    return {
      title: "Soft UI Dashboard PRO",
      controls: "dashboardsExamples",
      isActive: "active"
    };
  },
  computed: {
    ...mapState(["isRTL"])
  },
  methods: {
    getRoute() {
      const routeArr = this.$route.path.split("/");
      return routeArr[1];
    }
  }
};
</script>

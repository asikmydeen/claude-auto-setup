<template>
  <div>
    <base-nav
      v-model="showMenu"
      type="white"
      :transparent="true"
      menu-classes="justify-content-end"
      class="auth-navbar fixed-top"
    >
      <div slot="brand" class="navbar-wrapper">
        <a class="navbar-brand" href="#" v-if="title">{{ title }}</a>
      </div>

      <ul class="navbar-nav">
        <router-link class="nav-item" tag="li" to="/dashboard">
          <a class="nav-link text-primary">
            <i class="tim-icons icon-minimal-left"></i> Back to Dashboard
          </a>
        </router-link>
        <router-link class="nav-item" tag="li" to="/register">
          <a class="nav-link">
            <i class="tim-icons icon-laptop"></i> Register
          </a>
        </router-link>

        <router-link class="nav-item" tag="li" to="/login">
          <a class="nav-link">
            <i class="tim-icons icon-single-02"></i> Login
          </a>
        </router-link>

        <router-link class="nav-item" tag="li" to="/pricing">
          <a class="nav-link"> <i class="tim-icons icon-coins"></i> Pricing </a>
        </router-link>

        <router-link class="nav-item" tag="li" to="/lock">
          <a class="nav-link">
            <i class="tim-icons icon-lock-circle"></i> Lock
          </a>
        </router-link>
      </ul>
    </base-nav>

    <div class="wrapper wrapper-full-page">
      <div class="full-page" :class="pageClass">
        <div class="content">
          <router-view></router-view>
        </div>
        <footer class="footer">
          <div class="container-fluid">
            <nav>
              <ul class="nav">
                <li class="nav-item">
                  <a
                    href="https://www.creative-tim.com"
                    target="_blank"
                    rel="noopener"
                    class="nav-link"
                  >
                    Creative Tim
                  </a>
                </li>
                <li class="nav-item">
                  <a
                    href="http://presentation.creative-tim.com"
                    target="_blank"
                    rel="noopener"
                    class="nav-link"
                  >
                    About Us
                  </a>
                </li>
                <li class="nav-item">
                  <a
                    href="http://blog.creative-tim.com"
                    target="_blank"
                    rel="noopener"
                    class="nav-link"
                  >
                    Blog
                  </a>
                </li>
              </ul>
            </nav>
            <div class="copyright">
              &copy; 2019, made with
              <i class="tim-icons icon-heart-2"></i> by
              <a
                href="https://www.creative-tim.com/?ref=pdf-vuejs"
                target="_blank"
                rel="noopener"
                >Creative Tim</a
              >
              for a better web.
            </div>
          </div>
        </footer>
      </div>
    </div>
  </div>
</template>
<script>
import BaseNav from "@/components/BaseNav";
export default {
  components: {
    BaseNav
  },
  data() {
    return {
      showMenu: false,
      pageClass: "login-page"
    };
  },
  computed: {
    title() {
      return `${this.$route.name} Page`;
    }
  },
  methods: {
    toggleNavbar() {
      document.body.classList.toggle("nav-open");
      this.showMenu = !this.showMenu;
    },
    closeMenu() {
      document.body.classList.remove("nav-open");
      this.showMenu = false;
    },
    setPageClass() {
      this.pageClass = `${this.$route.name}-page`.toLowerCase();
    }
  },
  beforeDestroy() {
    this.closeMenu();
  },
  beforeRouteUpdate(to, from, next) {
    if (this.showMenu) {
      this.closeMenu();
      setTimeout(() => {
        next();
      }, this.menuTransitionDuration);
    } else {
      next();
    }
  },
  mounted() {
    this.setPageClass();
  },
  watch: {
    $route() {
      this.setPageClass();
    }
  }
};
</script>
<style></style>

<script>
  import { scale } from "svelte/transition";
  import BaseNav from "../../components/Navbar/BaseNav.svelte";
  // export let backgroundColor = "black";
  let showMenu = false;
  let menuTransitionDuration = 250;
  let pageTransitionDuration = 200;
  let year = new Date().getFullYear();
  export let noBodyBackground;
  import { Route } from "svelte-router-spa";
  export let currentRoute;

  updateBackground();

  if (window.innerWidth > 992) {
    showMenu = true;
  } else {
    showMenu = false;
  }
  window.addEventListener("resize", () => {
    if (window.innerWidth > 992) {
      showMenu = true;
    } else {
      showMenu = false;
    }
  });

  function toggleNavbar() {
    document.body.classList.toggle("nav-open");
    showMenu = !showMenu;
    if (showMenu === true) {
      showMenu = false;
    }
  }

  function closeMenu() {
    document.body.classList.remove("nav-open");
    showMenu = false;
  }

  function setBackgroundColor() {
    document.body.classList.add("bg-default");
  }

  function removeBackgroundColor() {
    document.body.classList.remove("bg-default");
  }

  function updateBackground() {
    if (noBodyBackground) {
      setBackgroundColor();
    } else {
      removeBackgroundColor();
    }
  }
</script>

<style lang="scss">
  @keyframes zoomIn8 {
    from {
      opacity: 0;
      transform: scale3d(0.8, 0.8, 0.8);
    }
    100% {
      opacity: 1;
    }
  }

  @keyframes zoomOut8 {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
      transform: scale3d(0.8, 0.8, 0.8);
    }
  }
</style>

<div>
  <BaseNav
    model="showMenu"
    type="light"
    transparent="true"
    menuClasses="justify-content-end navbar-collapse"
    topClasses="navbar-horizontal navbar-main"
    show={showMenu === false ? false : true}
    expand="lg">
    <div slot="brand" class="navbar-wrapper">
      <a class="navbar-brand" href="/">
        <img src="../img/brand/white.png" alt="navbar brand" />
      </a>
    </div>

    <div class="navbar-collapse-header">
      <div class="row">
        <div class="col-6 collapse-brand">
          <a href="/">
            <img src="../img/brand/red.png" alt="image" />
          </a>
        </div>
        <div class="col-6 collapse-close">
          <button
            type="button"
            class="navbar-toggler"
            on:click={() => toggleNavbar()}>
            <span />
            <span />
          </button>
        </div>
      </div>
    </div>

    <ul class="navbar-nav mr-auto">
      <li class="nav-item">
        <a href="/dashboard" class="nav-link">
          Dashboard
        </a>
      </li>
      <li class="nav-item">
        <a href="/pricing" class="nav-link">
          Pricing
        </a>
      </li>
      <li class="nav-item">
        <a href="/login" class="nav-link">
          Login
        </a>
      </li>
      <li class="nav-item">
        <a href="/register" class="nav-link">
          Register
        </a>
      </li>
      <li class="nav-item">
        <a href="/lock" class="nav-link">
          Lock
        </a>
      </li>
    </ul>
    <hr class="d-lg-none" />

    <ul class="navbar-nav align-items-lg-center ml-lg-auto">
      <li
        class="nav-item"
        data-toggle="tooltip"
        data-original-title="Like us on Facebook">
        <a
          href="https://www.facebook.com/creativetim"
          target="_blank"
          class="nav-link-icon nav-link">
          <i class="fab fa-facebook-square" />
          <span class="nav-link-inner--text d-lg-none">Facebook</span>
        </a>
      </li>
      <li
        class="nav-item"
        data-toggle="tooltip"
        data-original-title="Follow us on Instagram">
        <a
          href="https://www.instagram.com/creativetimofficial"
          target="_blank"
          class="nav-link-icon nav-link">
          <i class="fab fa-instagram" />
          <span class="nav-link-inner--text d-lg-none">Instagram</span>
        </a>
      </li>
      <li
        class="nav-item"
        data-toggle="tooltip"
        data-original-title="Follow us on Twitter">
        <a
          href="https://twitter.com/creativetim"
          target="_blank"
          class="nav-link-icon nav-link">
          <i class="fab fa-twitter-square" />
          <span class="nav-link-inner--text d-lg-none">Twitter</span>
        </a>
      </li>
      <li
        class="nav-item"
        data-toggle="tooltip"
        data-original-title="Star us on Github">
        <a
          href="https://github.com/creativetimofficial"
          target="_blank"
          class="nav-link-icon nav-link">
          <i class="fab fa-github" />
          <span class="nav-link-inner--text d-lg-none">Github</span>
        </a>
      </li>
      <!-- This item dont have <b-nav-item> because they add class 'nav-link' which is not needed here -->
      <li class="nav-item d-none d-lg-block ml-lg-4">
        <a
          href="https://www.creative-tim.com/product/argon-dashboard-pro-svelte"
          target="_blank"
          class="btn btn-neutral btn-icon">
          <span class="btn-inner--icon">
            <i class="fas fa-shopping-cart mr-1" />
          </span>
          <span class="nav-link-inner--text">Purchase now</span>
        </a>
      </li>
    </ul>
  </BaseNav>

  <div class="main-content">
    <Route {currentRoute} />
  </div>

  <footer class="py-5" id="footer-main">
    <div class="container">
      <div class="row align-items-center justify-content-xl-between">
        <div class="col-xl-6">
          <div class="copyright text-center text-xl-left text-muted">
            © {year}
            <a
              href="https://www.creative-tim.com"
              class="font-weight-bold ml-1"
              target="_blank">
              Creative Tim
            </a>
          </div>
        </div>
        <div class="col-xl-6">
          <ul
            class="nav nav-footer justify-content-center justify-content-xl-end">
            <li class="nav-item">
              <a
                href="https://www.creative-tim.com"
                target="_blank"
                class="nav-link">
                Creative Tim
              </a>
            </li>
            <li class="nav-item">
              <a
                href="https://www.creative-tim.com/presentation"
                target="_blank"
                class="nav-link">
                About Us
              </a>
            </li>
            <li class="nav-item">
              <a
                href="http://blog.creative-tim.com"
                target="_blank"
                class="nav-link">
                Blog
              </a>
            </li>
            <li class="nav-item">
              <a
                href="https://www.creative-tim.com/license"
                target="_blank"
                class="nav-link">
                License
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
</div>

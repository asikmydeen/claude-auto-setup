<template>
  <div class="container-fluid">
    <div
      class="page-header min-height-300 border-radius-xl mt-4"
      style="
        background-image: url('https://images.unsplash.com/photo-1531512073830-ba890ca4eba2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80');
      "
    >
      <span class="mask bg-gradient-success opacity-6"></span>
    </div>
    <div class="card card-body mx-3 mx-md-4 mt-n6">
      <div class="row gx-4">
        <div class="col-auto">
          <div class="avatar avatar-xl position-relative">
            <img
              src="../../../assets/img/bruce-mars.jpg"
              alt="profile_image"
              class="shadow-sm w-100 border-radius-lg"
            />
          </div>
        </div>
        <div class="col-auto my-auto">
          <div class="h-100">
            <h5 class="mb-1">Charles Smith</h5>
            <p class="mb-0 font-weight-normal text-sm">CEO / Co-Founder</p>
          </div>
        </div>
        <div
          class="col-lg-4 col-md-6 my-sm-auto ms-sm-auto me-sm-0 mx-auto mt-3"
        >
          <div class="nav-wrapper position-relative end-0">
            <ul class="p-1 nav nav-pills nav-fill" role="tablist">
              <li class="nav-item">
                <a
                  class="px-0 py-1 mb-0 nav-link active"
                  data-bs-toggle="tab"
                  href="javascript:;"
                  role="tab"
                  aria-selected="true"
                >
                  <i class="material-icons text-lg position-relative">home</i>
                  <span class="ms-1">App</span>
                </a>
              </li>
              <li class="nav-item">
                <a
                  class="px-0 py-1 mb-0 nav-link"
                  data-bs-toggle="tab"
                  href="javascript:;"
                  role="tab"
                  aria-selected="false"
                >
                  <i class="material-icons text-lg position-relative">email</i>
                  <span class="ms-1">Messages</span>
                </a>
              </li>
              <li class="nav-item">
                <a
                  class="px-0 py-1 mb-0 nav-link"
                  data-bs-toggle="tab"
                  href="javascript:;"
                  role="tab"
                  aria-selected="false"
                >
                  <i class="material-icons text-lg position-relative"
                    >settings</i
                  >
                  <span class="ms-1">Settings</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="py-4 container-fluid">
    <section class="py-3">
      <div class="row mb-4 mb-md-0">
        <div class="col-md-8 me-auto my-auto text-left">
          <h5>Some of Our Awesome Projects</h5>
          <p>
            This is the paragraph where you can write more details about your
            projects. Keep you user engaged by
            <br />providing meaningful information.
          </p>
        </div>
        <div class="col-lg-4 col-md-12 my-auto text-end">
          <button
            type="button"
            class="btn bg-gradient-success mb-0 mt-0 mt-md-n9 mt-lg-0"
          >
            <i class="material-icons text-white position-relative text-md pe-2"
              >add</i
            >Add New
          </button>
        </div>
      </div>
      <div class="mt-2 row mt-lg-4">
        <div class="mt-4 mb-3 col-lg-4 col-md-6">
          <complex-project-card
            :image="slackLogo"
            title="Slack Bot"
            description="If everything I did failed - which it doesn&#39;t, I think that
                it actually succeeds."
            date-time="02.03.22"
            :members="[team3, team4, team2, team3, team4]"
            :dropdown="[
              {
                label: 'Action',
                route: 'javascript:;',
              },
              {
                label: 'Another action',
                route: 'javascript:;',
              },
              {
                label: 'Something else here',
                route: 'javascript:;',
              },
            ]"
          />
        </div>
        <div class="mt-4 mb-3 col-lg-4 col-md-6">
          <complex-project-card
            :image="spotifyLogo"
            title="Premium support"
            description="Pink is obviously a better color. Everyone’s born confident, and
                everything’s taken away from you."
            date-time="22.11.21"
            :members="[team4, team3, team2]"
            :dropdown="[
              {
                label: 'Action',
                route: 'javascript:;',
              },
              {
                label: 'Another action',
                route: 'javascript:;',
              },
              {
                label: 'Something else here',
                route: 'javascript:;',
              },
            ]"
          />
        </div>
        <div class="mt-4 mb-3 col-lg-4 col-md-6">
          <complex-project-card
            :image="xdLogo"
            title="Design tools"
            description="Constantly growing. We’re constantly making mistakes from which
                we learn and improve."
            date-time="06.03.20"
            :members="[team4, team2, team3, team4]"
            :dropdown="[
              {
                label: 'Action',
                route: 'javascript:;',
              },
              {
                label: 'Another action',
                route: 'javascript:;',
              },
            ]"
          />
        </div>
        <div class="mt-4 mb-3 col-lg-4 col-md-6">
          <complex-project-card
            :image="asanaLogo"
            title="Looking great"
            description="You have the opportunity to play this game of life you need to
                appreciate every moment."
            date-time="14.03.24"
            :members="[team3, team4, team2, team3, team4, team2]"
            :dropdown="[
              {
                label: 'Action',
                route: 'javascript:;',
              },
              {
                label: 'Something else here',
                route: 'javascript:;',
              },
            ]"
          />
        </div>
        <div class="mt-4 mb-3 col-lg-4 col-md-6">
          <complex-project-card
            :image="invisionLogo"
            title="Developer First"
            description="For standing out. But the time is now to be okay to be the
                greatest you."
            date-time="16.01.22"
            :members="[team4, team3, team2, team4]"
            :dropdown="[
              {
                label: 'Action',
                route: 'javascript:;',
              },
              {
                label: 'Another action',
                route: 'javascript:;',
              },
            ]"
          />
        </div>
        <div class="mt-4 mb-3 col-lg-4 col-md-6">
          <complex-project-card
            :image="atlassianLogo"
            title="Product Developer"
            description="We strive to embrace and drive change in our industry. We are happy to work at such a project."
            date-time="16.01.22"
            :members="[team4, team3, team2, team4]"
            :dropdown="[
              {
                label: 'Action',
                route: 'javascript:;',
              },
              {
                label: 'Another action',
                route: 'javascript:;',
              },
            ]"
          />
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import team1 from "../../../assets/img/team-1.jpg";
import team2 from "../../../assets/img/team-2.jpg";
import team3 from "../../../assets/img/team-3.jpg";
import team4 from "../../../assets/img/team-4.jpg";
import team5 from "../../../assets/img/team-5.jpg";
import slackLogo from "../../../assets/img/small-logos/logo-slack.svg";
import invisionLogo from "../../../assets/img/small-logos/logo-invision.svg";
import spotifyLogo from "../../../assets/img/small-logos/logo-spotify.svg";
import xdLogo from "../../../assets/img/small-logos/logo-xd.svg";
import asanaLogo from "../../../assets/img/small-logos/logo-asana.svg";
import atlassianLogo from "../../../assets/img/small-logos/logo-atlassian.svg";

import ComplexProjectCard from "./components/ComplexProjectCard.vue";
import setNavPills from "@/assets/js/nav-pills.js";

export default {
  name: "ProfileTeam",
  components: {
    ComplexProjectCard,
  },
  data() {
    return {
      showMenu: false,
      team1,
      team2,
      team3,
      team4,
      team5,
      slackLogo,
      invisionLogo,
      spotifyLogo,
      xdLogo,
      asanaLogo,
      atlassianLogo,
    };
  },

  mounted() {
    this.$store.state.isAbsolute = true;
    setNavPills();
  },
  beforeUnmount() {
    this.$store.state.isAbsolute = false;
  },
};
</script>

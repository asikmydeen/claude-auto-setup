<script>
  import EditProfileForm from "./UserProfile/EditProfileForm.svelte";
  import UserCard from "./UserProfile/UserCard.svelte";
  import ProgressTrackList from "../ProgressTrackList.svelte";
  import Card from "../../../components/Cards/Card.svelte";
  import { fade } from "svelte/transition";
  import { onMount } from "svelte";
  onMount(function() {
    let topmenu = document.getElementsByTagName("nav").item(0);
    topmenu.classList.add("bg-danger");
    topmenu.classList.add("navbar-dark");
    topmenu.classList.remove("navbar-light");
    let search = document.getElementsByTagName("form").item(0);
    search.classList.remove("navbar-search-dark");
    search.classList.add("navbar-search-light");
  });
</script>

<style>
  .profile-header {
    background-image: url(/img/theme/profile-cover.jpg);
    background-size: cover;
    background-position: center top;
    min-height: 500px;
  }
</style>

<div transition:fade={{ duration: 250 }}>
  <div class="header pb-6 d-flex align-items-center profile-header">
    <!-- Mask -->
    <span class="mask bg-gradient-default opacity-8" />
    <!-- Header container -->
    <div class="container-fluid d-flex align-items-center">
      <div class="row">
        <div class="col-lg-7 col-md-10">
          <h1 class="display-2 text-white">Hello Jesse</h1>
          <p class="text-white mt-0 mb-5">
            This is your profile page. You can see the progress you've made with
            your work and manage your projects or assigned tasks
          </p>
          <a href="#!" class="btn btn-neutral">Edit profile</a>
        </div>
      </div>
    </div>
  </div>

  <div class="container-fluid mt--6">
    <div class="row">
      <div class="col-xl-4 order-xl-2">
        <UserCard />

        <!-- Progress track -->
        <Card>
          <h5 slot="header" class="h3 mb-0">Progress track</h5>
          <ProgressTrackList />
        </Card>
      </div>
      <div class="col-xl-8 order-xl-1">
        <div class="row">
          <div class="col-lg-6">
            <Card gradient="info" className="border-0">
              <div class="row">
                <div class="col">
                  <h5
                    class="card-title text-uppercase text-muted mb-0 text-white">
                    Total traffic
                  </h5>
                  <span class="h2 font-weight-bold mb-0 text-white">
                    350,897
                  </span>
                </div>
                <div class="col-md-auto">
                  <div
                    class="icon icon-shape bg-white text-dark rounded-circle
                    shadow">
                    <i class="ni ni-active-40" />
                  </div>
                </div>
              </div>
              <p class="mt-3 mb-0 text-sm">
                <span class="text-white mr-2">
                  <i class="fa fa-arrow-up" />
                  3.48%
                </span>
                <span class="text-nowrap text-light">Since last month</span>
              </p>
            </Card>
          </div>
          <div class="col-lg-6">
            <Card gradient="danger" className="border-0">
              <div class="row">
                <div class="col">
                  <h5
                    class="card-title text-uppercase text-muted mb-0 text-white">
                    Performance
                  </h5>
                  <span class="h2 font-weight-bold mb-0 text-white">
                    49,65%
                  </span>
                </div>
                <div class="col-md-auto">
                  <div
                    class="icon icon-shape bg-white text-dark rounded-circle
                    shadow">
                    <i class="ni ni-spaceship" />
                  </div>
                </div>
              </div>
              <p class="mt-3 mb-0 text-sm">
                <span class="text-white mr-2">
                  <i class="fa fa-arrow-up" />
                  3.48%
                </span>
                <span class="text-nowrap text-light">Since last month</span>
              </p>
            </Card>
          </div>
        </div>

        <EditProfileForm />
      </div>
    </div>
  </div>
</div>

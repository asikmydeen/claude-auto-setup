<script>
  import Card from "../../components/Cards/Card.svelte";
  import BaseButton from "../../components/BaseButton.svelte";
  import BaseInput from "../../Components/Inputs/BaseInput.svelte";
  document.body.classList = "bg-default";
  import { fade, scale } from "svelte/transition";
</script>

<div in:scale={{ y: 200, duration: 500 }} out:scale={{ y: 200, duration: 100 }}>
  <div class="header bg-gradient-danger py-7 py-lg-8 pt-lg-9">
    <div class="container">
      <div class="header-body text-center mb-7">
        <div class="row justify-content-center">
          <div class="px-5 col-md-8 col-lg-6 col-xl-5">
            <h1 class="text-white">Lock screen</h1>
            <p class="text-lead text-white">Better to be safe than sorry.</p>
          </div>
        </div>
      </div>
    </div>
    <div class="separator separator-bottom separator-skew zindex-100">
      <svg
        x="0"
        y="0"
        viewBox="0 0 2560 100"
        preserveAspectRatio="none"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg">
        <polygon points="2560 0 2560 100 0 100" class="fill-default" />
      </svg>
    </div>
  </div>
  <div class="mt--8 pb-5 container">
    <div class="row justify-content-center">
      <div class="col-md-7 col-lg-5">

        <Card className="card ard-profile bg-secondary mt-5" noBody>
          <div class="row justify-content-center">
            <div class="order-lg-2 col-lg-3">
              <div class="card-profile-image">
                <img
                  src="/img/theme/team-4.jpg"
                  class="border-secondary rounded-circle"
                  alt="team-4" />
              </div>
            </div>
          </div>
          <div class="card-body pt-7 px-5">
            <div class="text-center mb-4">
              <h3>Jessica Jones</h3>
            </div>
            <form role="form" class="">
              <BaseInput
                alternative
                prependIcon="ni ni-lock-circle-open"
                type="password"
                name="Password"
                placeholder="Password"
                model="model.password" />
              <div class="text-center">
                <BaseButton type="primary" class="mt-2">Unlock</BaseButton>
              </div>
            </form>
          </div>
        </Card>
      </div>
    </div>
  </div>
</div>

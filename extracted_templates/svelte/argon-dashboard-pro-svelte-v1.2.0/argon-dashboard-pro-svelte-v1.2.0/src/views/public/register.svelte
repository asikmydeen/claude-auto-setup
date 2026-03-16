<script>
  import Card from "../../components/Cards/Card.svelte";
  import BaseButton from "../../components/BaseButton.svelte";
  import BaseInput from "../../Components/Inputs/BaseInput.svelte";
  import BaseCheckbox from "../../components/Inputs/BaseCheckbox.svelte";
  document.body.classList = "bg-default";
  import { fade, scale } from "svelte/transition";
</script>

<div in:scale={{ y: 200, duration: 500 }} out:scale={{ y: 200, duration: 100 }}>
  <div class="header bg-gradient-danger py-7 py-lg-8 pt-lg-9">
    <div class="container container">
      <div class="header-body text-center mb-7">
        <div class="row justify-content-center">
          <div class="px-5 col-md-8 col-lg-6 col-xl-5">
            <h1 class="text-white">Create an account</h1>
            <p class="text-lead text-white">
              Use these awesome forms to login or create new account in your
              project for free.
            </p>
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
      <div class="col-md-8 col-lg-6">
        <Card
          noBody
          className="bg-secondary border-0 mb-0 card"
          headerClasses="bg-transparent pb-5"
          bodyClasses="px-lg-5 py-lg-5">
          <div slot="header">
            <div class="text-muted text-center mt-2 mb-4">
              <small>Sign up with</small>
            </div>
            <div class="text-center">
              <a href="/" class="btn btn-neutral btn-icon mr-4">
                <span class="btn-inner--icon">
                  <img src="img/icons/common/github.svg" alt="" />
                </span>
                <span class="btn-inner--text">Github</span>
              </a>
              <a href="/" class="btn btn-neutral btn-icon">
                <span class="btn-inner--icon">
                  <img src="img/icons/common/google.svg" alt="" />
                </span>
                <span class="btn-inner--text">Google</span>
              </a>
            </div>
          </div>
          <div class="card-body px-lg-5 py-lg-5">
            <div class="text-center text-muted mb-4">
              <small>Or sign in with credentials</small>
            </div>
            <form role="form">
              <BaseInput
                alternative
                class="mb-3"
                prependIcon="ni ni-hat-3"
                placeholder="Name"
                name="Name"
                required />
              <BaseInput
                alternative
                class="mb-3"
                prependIcon="ni ni-email-83"
                placeholder="Email"
                name="Email"
                required />
              <BaseInput
                alternative
                class="mb-3"
                prependIcon="ni ni-lock-circle-open"
                placeholder="password"
                type="password"
                name="Password"
                required />
              <div class="text-muted font-italic">
                <small>
                  password strength:
                  <span class="text-success font-weight-700">strong</span>
                </small>
              </div>
              <div class="row my-4">
                <div class="col-12">
                  <BaseInput required name="Privacy">
                    <BaseCheckbox model="agree">
                      <span class="text-muted">
                        I agree with the
                        <a href="#!">Privacy Policy</a>
                      </span>
                    </BaseCheckbox>
                  </BaseInput>
                </div>
              </div>
              <div class="text-center">
                <BaseButton
                  type="primary"
                  nativeType="submit"
                  className="mt-4"
                  on:click={e => e.preventDefault()}>
                  Create account
                </BaseButton>
              </div>
            </form>
          </div>
        </Card>
      </div>
    </div>
  </div>
</div>

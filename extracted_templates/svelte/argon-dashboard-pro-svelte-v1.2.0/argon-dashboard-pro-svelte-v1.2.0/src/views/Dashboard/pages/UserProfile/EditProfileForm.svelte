<script>
  let user = {
    company: "Creative Code Inc.",
    username: "michael23",
    email: "",
    firstName: "Mike",
    lastName: "Andrew",
    address: "Bld Mihail Kogalniceanu, nr. 8 Bl 1, Sc 1, Ap 09",
    city: "New York",
    country: "USA",
    postalCode: "",
    aboutMe: `Lamborghini Mercy, Your chick she so thirsty, I'm in that two seat Lambo.`
  };
  function updateProfile(e) {
    e.preventDefault();
    alert("Your data: " + JSON.stringify(user));
  }

  import Card from "../../../../components/Cards/Card.svelte";
  import BaseInput from "../../../../components/Inputs/BaseInput.svelte";
</script>

<div>
  <Card>
    <div class="row align-items-center" slot="header">
      <div class="col-8">
        <h3 class="mb-0">Edit profile</h3>
      </div>
      <div class="col-4 text-right">
        <a href="#!" class="btn btn-sm btn-primary">Settings</a>
      </div>
    </div>

    <form action="" on:submit={e => updateProfile(e)}>
      <h6 class="heading-small text-muted mb-4">User information</h6>
      <div class="pl-lg-4">
        <div class="row">
          <div class="col-lg-6">
            <BaseInput
              type="text"
              label="Username"
              placeholder="Username"
              model="user.username" />
          </div>
          <div class="col-lg-6">
            <BaseInput
              type="email"
              label="Email address"
              placeholder="mike@email.com"
              model="user.email" />
          </div>
        </div>
        <div class="row">
          <div class="col-lg-6">
            <BaseInput
              type="text"
              label="First Name"
              placeholder="First Name"
              model="user.firstName" />
          </div>
          <div class="col-lg-6">
            <BaseInput
              type="text"
              label="Last Name"
              placeholder="Last Name"
              model="user.lastName" />
          </div>
        </div>
      </div>
      <hr class="my-4" />

      <!-- Address -->
      <h6 class="heading-small text-muted mb-4">Contact information</h6>

      <div class="pl-lg-4">
        <div class="row">
          <div class="col-md-12">
            <BaseInput
              type="text"
              label="Address"
              placeholder="Home Address"
              model="user.address" />
          </div>
        </div>
        <div class="row">
          <div class="col-lg-4">
            <BaseInput
              type="text"
              label="City"
              placeholder="City"
              model="user.city" />
          </div>
          <div class="col-lg-4">
            <BaseInput
              type="text"
              label="Country"
              placeholder="Country"
              model="user.country" />
          </div>
          <div class="col-lg-4">
            <BaseInput
              label="Postal Code"
              placeholder="ZIP Code"
              model="user.postalCode" />
          </div>
        </div>
      </div>

      <hr class="my-4" />
      <!-- Description -->
      <h6 class="heading-small text-muted mb-4">About me</h6>
      <div class="pl-lg-4">
        <div class="form-group">
          <div role="group" class="form-group mb-0">
            <label for="about-form-textaria" class="d-block form-control-label">
              About Me
            </label>
            <div class="bv-no-focus-ring">
              <textarea
                id="about-form-textaria"
                placeholder="A few words about you ..."
                rows="4"
                wrap="soft"
                class="form-control" />
            </div>
          </div>
        </div>
      </div>
    </form>
  </Card>
</div>

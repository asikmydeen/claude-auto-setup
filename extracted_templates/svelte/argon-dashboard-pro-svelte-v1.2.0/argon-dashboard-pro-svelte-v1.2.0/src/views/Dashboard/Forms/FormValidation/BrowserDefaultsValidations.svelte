<script>
  import BaseButton from "../../../../components/BaseButton.svelte";
  import Card from "../../../../components/Cards/Card.svelte";
  import BaseInput from "../../../../components/Inputs/BaseInput.svelte";
  import BaseCheckbox from "../../../../components/Inputs/BaseCheckbox.svelte";

  let model = {
    firstName: "Mark",
    lastName: "Otto",
    username: "",
    city: "",
    state: "",
    zip: "",
    agree: false
  };

  async function submit() {
    console.log("submited");
  }
</script>

<Card>
  <!-- Card header -->
  <h3 slot="header" class="mb-0">Browser defaults</h3>

  <!-- Card body -->
  <div class="row">
    <div class="col-lg-8">
      <p class="mb-0">
        Not interested in custom validation feedback messages or writing
        JavaScript to change form behaviors? All good, you can use the browser
        defaults. Try submitting the form below. Depending on your browser and
        OS, you’ll see a slightly different style of feedback.
        <br />
        <br />
        While these feedback styles cannot be styled with CSS, you can still
        customize the feedback text through JavaScript.
      </p>
    </div>
  </div>
  <hr />
  <form class="needs-validation" on:submit={submit}>
    <div class="form-row">
      <div class="col-md-4">
        <BaseInput
          label="First name"
          name="First name"
          placeholder="First name"
          required={true}
          value={model.firstName} />
      </div>
      <div class="col-md-4">
        <BaseInput
          label="Last name"
          name="Last name"
          placeholder="Last name"
          required={true}
          value={model.lastName} />

      </div>
      <div class="col-md-4">
        <BaseInput
          label="Username"
          name="Username"
          placeholder="Username"
          required={true}
          value={model.username} />

      </div>
    </div>
    <div class="form-row">
      <div class="col-md-6">
        <BaseInput
          label="City"
          name="City"
          placeholder="City"
          required
          value={model.city} />
      </div>
      <div class="col-md-3">
        <BaseInput
          label="State"
          name="State"
          placeholder="State"
          required
          value={model.state} />
      </div>
      <div class="col-md-3">
        <BaseInput
          label="Zip"
          name="Zip"
          placeholder="Zip"
          required
          value={model.zip} />
      </div>
    </div>
    <BaseInput>
       <BaseCheckbox model={model.agree}>
              Agree to terms and conditions
       </BaseCheckbox>
    </BaseInput>
    <BaseButton type="primary" nativeType="submit">Submit form</BaseButton>
  </form>
</Card>

<script>
  import BaseInput from "../../../../components/Inputs/BaseInput.svelte";
  import BaseCheckbox from "../../../../components/Inputs/BaseCheckbox.svelte";
  import BaseButton from "../../../../components/BaseButton.svelte";
  import Card from "../../../../components/Cards/Card.svelte";

  import { Form, Input, Select, Choice } from "sveltejs-forms";
  import * as yup from "yup";

  let model = {
    firstName: "Mark",
    lastName: "Otto",
    username: "",
    city: "",
    state: "",
    zip: "",
    agree: false
  };

  function handleSubmit({ detail: { values, setSubmitting, resetForm } }) {
    setTimeout(() => {
      setSubmitting(false);
      resetForm({
        firstName: "Mark",
        lastName: "Otto",
        username: "",
        city: "",
        state: "",
        zip: "",
        terms: false
      });
    });
  }

  function handleReset() {}

  const schema = yup.object().shape({
    firstName: yup.string().required("The First Name field is required"),
    lastName: yup.string().required("The Last Name field is required"),
    username: yup.string().required("The Username field is required"),
    city: yup.string().required("The City field is required"),
    state: yup.string().required("The State field is required"),
    zip: yup.string().required("The Zip field is required"),
    terms: yup.boolean().oneOf([true], "The Terms field is required")
  });
</script>

<Card>
  <!-- Card header -->
  <h3 slot="header" class="mb-0">Custom styles</h3>

  <!-- Card body -->
  <div class="row">
    <div class="col-lg-8">
      <p class="mb-0">
        For custom form validation messages, you’ll need to provide error
        messages to your
        <code>&lt;base-input&gt;</code>
        components. This disables the browser default feedback tooltips, but
        still provides access to the form validation APIs in JavaScript.
        <br />
        <br />
        When attempting to submit, you’ll see the
        <code>.is-valid</code>
        and
        <code>.is-invalid</code>
        classes applied to your form controls.
      </p>
    </div>
  </div>
  <hr />

  <Form
    class="needs-validation"
    {schema}
    validateOnBlur={false}
    validateOnChange={false}
    on:submit={handleSubmit}
    on:reset={handleReset}
    let:isSubmitting
    let:isValid>
    <div class="form-row">
      <div class="col-md-4">
        <Input
          name="firstName"
          label="First name"
          value={model.firstName}
          placeholder="First name"
          succesMessage="Looks good!"
          rules="required" />
      </div>
      <div class="col-md-4">
        <Input
          name="lastName"
          label="Last name"
          value={model.lastName}
          placeholder="Last name"
          rules="required"
          succesMessage="Looks good!" />
      </div>
      <div class="col-md-4">
        <Input
          name="username"
          label="Username"
          value={model.username}
          placeholder="Username"
          rules="required" />
      </div>
    </div>
    <div class="form-row">
      <div class="col-md-6">
        <Input
          name="city"
          label="City"
          value={model.city}
          placeholder="City"
          rules="required" />
      </div>
      <div class="col-md-3">
        <Input
          name="state"
          label="State"
          value={model.state}
          placeholder="State"
          rules="required" />
      </div>
      <div class="col-md-3">
        <Input
          name="zip"
          label="Zip"
          value={model.zip}
          placeholder="Zip"
          rules="required" />
      </div>
    </div>

    <Input
      type="checkbox"
      checkbox={true}
      name="terms"
      value={model.agree}
      checkboxMessage="Agree to terms and conditions" />

    <button
      type="submit"
      class="btn btn-primary text-white"
      disabled={isSubmitting}>
      Submit Form
    </button>
  </Form>
</Card>

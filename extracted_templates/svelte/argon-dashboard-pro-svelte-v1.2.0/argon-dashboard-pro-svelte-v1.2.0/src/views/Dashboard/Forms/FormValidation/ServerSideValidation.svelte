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
        FirstName: "Mark",
        LastName: "Otto",
        Username: "",
        City: "",
        State: "",
        Zip: "",
        Terms: false
      });
    });
  }

  function handleReset() {}

  const schema = yup.object().shape({
    FirstName: yup.string().required("The First Name field is required"),
    LastName: yup.string().required("The Last Name field is required"),
    Username: yup.string().required("The Username field is required"),
    City: yup.string().required("The City field is required"),
    State: yup.string().required("The State field is required"),
    Zip: yup.string().required("The Zip field is required"),
    Terms: yup.boolean().oneOf([true], "The Terms field is required")
  });
</script>

<Card>
  <!-- Card header -->
  <h3 slot="header" class="mb-0">Server side validation</h3>

  <!-- Card body -->
  <div class="row">
    <div class="col-lg-8">
      <p class="mb-0">
        We recommend using client side validation, but in case you require
        server side, you can indicate invalid and valid form fields with
        <code>.is-invalid</code>
        and
        <code>.is-valid</code>
        . Note that
        <code>.invalid-feedback</code>
        is also supported with these classes.
      </p>
    </div>
  </div>
  <hr />

  <Form
    class="needs-validation"
    {schema}
    validateOnBlur={true}
    validateOnChange={true}
    on:submit={handleSubmit}
    on:reset={handleReset}
    let:isSubmitting
    let:isValid>
    <div class="form-row">
      <div class="col-md-4">
        <Input
          name="FirstName"
          label="First name"
          value={model.firstName}
          placeholder="First name"
          succesMessage="Looks good!"
          rules="required"
          showInvalid={true} />
      </div>
      <div class="col-md-4">
        <Input
          name="LastName"
          label="Last name"
          value={model.lastName}
          placeholder="Last name"
          rules="required"
          succesMessage="Looks good!"
          showInvalid={true} />
      </div>
      <div class="col-md-4">
        <Input
          name="Username"
          label="Username"
          value={model.username}
          placeholder="Username"
          rules="required"
          showInvalid={true} />
      </div>
    </div>
    <div class="form-row">
      <div class="col-md-6">
        <Input
          name="City"
          label="City"
          value={model.city}
          placeholder="City"
          rules="required"
          showInvalid={true} />
      </div>
      <div class="col-md-3">
        <Input
          name="State"
          label="State"
          value={model.state}
          placeholder="State"
          rules="required"
          showInvalid={true} />
      </div>
      <div class="col-md-3">
        <Input
          name="Zip"
          label="Zip"
          value={model.zip}
          placeholder="Zip"
          rules="required"
          showInvalid={true} />
      </div>
    </div>

    <Input
      type="checkbox"
      checkbox={true}
      name="Terms"
      value={model.agree}
      checkboxMessage="Agree to terms and conditions" showInvalid={true} />

    <button
      type="submit"
      class="btn btn-primary text-white"
      disabled={isSubmitting}>
      Submit Form
    </button>
  </Form>
</Card>

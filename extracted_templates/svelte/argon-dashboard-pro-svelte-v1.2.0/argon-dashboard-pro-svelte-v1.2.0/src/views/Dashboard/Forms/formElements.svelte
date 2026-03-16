<script>
  import BaseHeader from "../../../components/BaseHeader.svelte";
  import BaseButton from "../../../components/BaseButton.svelte";
  import Card from "../../../components/Cards/Card.svelte";
  import BaseInput from "../../../components/Inputs/BaseInput.svelte";
  import FileInput from "../../../components/Inputs/FileInput.svelte";
  import BaseCheckbox from "../../../components/Inputs/BaseCheckbox.svelte";
  import BaseRadio from "../../../components/Inputs/BaseRadio.svelte";
  import RouteBreadcrumb from "../../../components/Breadcrumb/RouteBreadcrumb.svelte";
  import { fade } from "svelte/transition";
  export let name = "Form elements";
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
  let checkboxes = {
    unchecked: false,
    checked: true,
    uncheckedDisabled: false,
    checkedDisabled: true
  };

  let radios = {
    radio1: "unchecked",
    radio2: "checked"
  };

  function updateRadio1() {
    radios.radio1 = "checked";
    radios.radio2 = "unchecked";
  }

  function updateRadio2() {
    radios.radio2 = "checked";
    radios.radio1 = "unchecked";
  }
</script>

<div style="transform-origin: center top;" transition:fade={{ duration: 250 }}>
  <BaseHeader className="pb-6">
    <div class="row align-items-center py-4">
      <div class="col-lg-6 col-7">
        <h6 class="h2 text-white d-inline-block mb-0">{name}</h6>
        <nav aria-label="breadcrumb" class="d-none d-md-inline-block ml-md-4">
          <RouteBreadcrumb {name} />
        </nav>
      </div>
      <div class="col-lg-6 col-5 text-right">
        <BaseButton size="sm" type="neutral" className="mr-1">New</BaseButton>
        <BaseButton size="sm" type="neutral">Filters</BaseButton>
      </div>
    </div>
  </BaseHeader>
  <div class="container-fluid mt--6">
    <Card noBody className="mb-4 card">
      <!-- Card header -->
      <div slot="header">
        <h3 class="mb-0">Form group in grid</h3>
      </div>
      <!-- Card body -->
      <div class="card-body">
        <!-- Form groups used in grid -->
        <div class="row">
          <div class="col-md-4">
            <BaseInput
              label="One of three cols"
              placeholder="One of three cols" />
          </div>
          <div class="col-md-4">
            <BaseInput
              label="One of three cols"
              placeholder="One of three cols" />
          </div>
          <div class="col-md-4">
            <BaseInput
              label="One of three cols"
              placeholder="One of three cols" />
          </div>
        </div>
        <div class="row">
          <div class="col-sm-6 col-md-3">
            <BaseInput
              label="One of four cols"
              placeholder="One of four cols" />
          </div>
          <div class="col-sm-6 col-md-3">
            <BaseInput
              label="One of four cols"
              placeholder="One of four cols" />
          </div>
          <div class="col-sm-6 col-md-3">
            <BaseInput
              label="One of four cols"
              placeholder="One of four cols" />
          </div>
          <div class="col-sm-6 col-md-3">
            <BaseInput
              label="One of four cols"
              placeholder="One of four cols" />
          </div>
        </div>
        <div class="row">
          <div class="col-md-6">
            <BaseInput label="One of two cols" placeholder="One of two cols" />
          </div>
          <div class="col-md-6">
            <BaseInput label="One of two cols" placeholder="One of two cols" />
          </div>
        </div>
      </div>
    </Card>
    <div class="row">
      <div class="col-lg-6">
        <div class="card-wrapper">
          <Card noBody className="card">
            <div slot="header">
              <h3 class="mb-0">Form controls</h3>
            </div>
            <div class="card-body">
              <form>
                <BaseInput
                  label="Email address"
                  placeholder="name@example.com" />

                <BaseInput label="Example select">
                  <select class="form-control">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </select>
                </BaseInput>

                <BaseInput label="Example multiple select">
                  <select multiple class="form-control">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </select>
                </BaseInput>

                <BaseInput label="Example texarea">
                  <textarea
                    class="form-control"
                    id="exampleFormControlTextarea3"
                    row="3" />
                </BaseInput>
              </form>
            </div>
          </Card>
          <!-- HTML5 inputs -->
          <Card noBody className="card">
            <!-- Card header -->
            <div slot="header">
              <h3 class="mb-0">HTML5 inputs</h3>
            </div>
            <!-- Card body -->
            <div class="card-body">
              <form>
                <div class="row form-group">
                  <label class="col-md-2 col-form-label form-control-label">
                    Text
                  </label>
                  <div class="col-md-10">
                    <BaseInput placeholder="Jon Snow" />
                  </div>
                </div>
                <div class="row form-group">
                  <label
                    for="example-search-input"
                    class="col-md-2 col-form-label form-control-label">
                    Search
                  </label>
                  <div class="col-md-10">
                    <BaseInput
                      id="example-search-input"
                      placeholder="Tell me your secret..." />
                  </div>
                </div>
                <div class="row form-group">
                  <label
                    for="example-email-input"
                    class="col-md-2 col-form-label form-control-label">
                    Email
                  </label>
                  <div class="col-md-10">
                    <BaseInput
                      type="email"
                      autocomplete="username email"
                      placeholder="argon@example.com"
                      id="example-email-input" />
                  </div>
                </div>
                <div class="row form-group">
                  <label
                    for="example-tel-input"
                    class="col-md-2 col-form-label form-control-label">
                    Phone
                  </label>
                  <div class="col-md-10">
                    <BaseInput
                      type="tel"
                      placeholder="40-(770)-888-444"
                      id="example-tel-input" />
                  </div>
                </div>
                <div class="row form-group">
                  <label
                    for="example-password-input"
                    class="col-md-2 col-form-label form-control-label">
                    Phone
                  </label>
                  <div class="col-md-10">
                    <BaseInput
                      type="password"
                      autocomplete="current-password"
                      placeholder="password"
                      id="example-password-input" />
                  </div>
                </div>
                <div class="row form-group">
                  <label
                    for="example-number-input"
                    class="col-md-2 col-form-label form-control-label">
                    Number
                  </label>
                  <div class="col-md-10">
                    <BaseInput
                      type="number"
                      placeholder="23"
                      id="example-number-input" />
                  </div>
                </div>
                <div class="row form-group">
                  <label
                    for="example-datetime-local-input"
                    class="col-md-2 col-form-label form-control-label">
                    Datetime
                  </label>
                  <div class="col-md-10">
                    <BaseInput
                      type="datetime-local"
                      value="2018-11-23T10:30:00"
                      id="example-datetime-local-input" />
                  </div>
                </div>
                <div class="row form-group">
                  <label
                    for="example-date-input"
                    class="col-md-2 col-form-label form-control-label">
                    Date
                  </label>
                  <div class="col-md-10">
                    <BaseInput
                      type="date"
                      value="2018-11-23"
                      id="example-date-input" />
                  </div>
                </div>
                <div class="row form-group">
                  <label
                    for="example-month-input"
                    class="col-md-2 col-form-label form-control-label">
                    Month
                  </label>
                  <div class="col-md-10">
                    <BaseInput
                      type="month"
                      value="2018-11"
                      id="example-month-input" />
                  </div>
                </div>
                <div class="row form-group">
                  <label
                    for="example-week-input"
                    class="col-md-2 col-form-label form-control-label">
                    Week
                  </label>
                  <div class="col-md-10">
                    <BaseInput
                      type="week"
                      value="2018-W23"
                      id="example-week-input" />
                  </div>
                </div>
                <div class="row form-group">
                  <label
                    for="example-time-input"
                    class="col-md-2 col-form-label form-control-label">
                    Time
                  </label>
                  <div class="col-md-10">
                    <BaseInput
                      type="time"
                      value="10:30:00"
                      id="example-time-input" />
                  </div>
                </div>
                <div class="row form-group">
                  <label
                    for="example-color-input"
                    class="col-md-2 col-form-label form-control-label">
                    Color
                  </label>
                  <div class="col-md-10">
                    <BaseInput
                      type="color"
                      value="#5e72e4"
                      id="example-color-input" />
                  </div>
                </div>
              </form>
            </div>
          </Card>
        </div>
      </div>
      <div class="col-lg-6">
        <div class="card-wrapper">
          <!-- Sizes -->
          <Card noBody className="card">
            <!-- Card header -->
            <div slot="header">
              <h3 class="mb-0">Sizes</h3>
            </div>
            <!-- Card body -->
            <div class="card-body">
              <BaseInput
                label="Large input"
                inputClasses="form-control-lg"
                placeholder=".form-control-lg" />
              <BaseInput label="Default input" placeholder="Default input" />
              <BaseInput
                label="Small input"
                inputClasses="form-control-sm"
                placeholder=".form-control-sm" />
            </div>
          </Card>
          <!-- Textareas -->
          <Card noBody className="card">
            <!-- Card header -->
            <div slot="header">
              <h3 class="mb-0">Text inputs</h3>
            </div>
            <!-- Card body -->
            <div class="card-body">
              <form>
                <BaseInput label="Basic texarea">
                  <textarea
                    class="form-control"
                    id="exampleFormControlTextarea1"
                    rows="3" />
                </BaseInput>
                <BaseInput label="Unresizable textarea">
                  <textarea
                    class="form-control"
                    id="exampleFormControlTextarea2"
                    rows="3"
                    resize="none" />
                </BaseInput>
              </form>
            </div>
          </Card>
          <!-- Selects -->
          <Card noBody className="card">
            <!-- Card header -->
            <div slot="header">
              <h3 class="mb-0">Select</h3>
            </div>
            <!-- Card body -->
            <div class="card-body">
              <form>
                <BaseInput label="Basic select">
                  <select class="form-control" id="exampleFormControlSelect1">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </select>
                </BaseInput>
                <BaseInput label="Basic select">
                  <select
                    class="form-control"
                    id="exampleFormControlSelect2"
                    disabled>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </select>
                </BaseInput>
                <BaseInput label="Multiple select">
                  <select
                    multiple
                    class="form-control"
                    id="exampleFormControlSelect3">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </select>
                </BaseInput>
                <BaseInput class="form-group" label="Disabled multiple select">
                  <select
                    multiple
                    class="form-control"
                    id="exampleFormControlSelect4"
                    disabled>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </select>
                </BaseInput>
              </form>
            </div>
          </Card>
          <!-- File browser -->
          <Card noBody className="card">
            <div slot="header">
              <h3 class="mb-0">File browser</h3>
            </div>
            <!-- Card body -->
            <div class="card-body">
              <form>
                <FileInput />
              </form>
            </div>
          </Card>
          <!-- Checkboxes and radios -->
          <Card noBody className="card">
            <!-- Card header -->
            <div slot="header">
              <h3 class="mb-0">Checkboxes and radios</h3>
            </div>
            <!-- Card body -->
            <div class="card-body">
              <form>
                <div class="row">
                  <div class="col-md-6">
                    <BaseCheckbox model={checkboxes.unchecked} class="mb-3">
                      Unchecked
                    </BaseCheckbox>

                    <BaseCheckbox model={checkboxes.checked} class="mb-3">
                      Checked
                    </BaseCheckbox>

                    <BaseCheckbox
                      model={checkboxes.unchecked}
                      disabled
                      class="mb-3">
                      Disabled Unchecked
                    </BaseCheckbox>

                    <BaseCheckbox
                      model={checkboxes.checked}
                      disabled
                      class="mb-3">
                      Disabled Checked
                    </BaseCheckbox>
                  </div>
                  <div class="col-md-6">
                    <BaseRadio
                      model={radios.radio1}
                      name={radios.radio1}
                      on:click={updateRadio1}
                      class="mb-3">
                      Unchecked
                    </BaseRadio>
                    <BaseRadio
                      model={radios.radio1}
                      name={radios.radio2}
                      on:click={updateRadio2}
                      class="mb-3">
                      Checked
                    </BaseRadio>
                    <BaseRadio
                      model={radios.radio2}
                      disabled
                      name="unchecked"
                      class="mb-3">
                      Unchecked
                    </BaseRadio>
                    <BaseRadio
                      model={radios.radio2}
                      disabled
                      name="Checked"
                      class="mb-3">
                      Checked
                    </BaseRadio>
                  </div>
                </div>
              </form>
            </div>
          </Card>
        </div>
      </div>
    </div>
  </div>
</div>

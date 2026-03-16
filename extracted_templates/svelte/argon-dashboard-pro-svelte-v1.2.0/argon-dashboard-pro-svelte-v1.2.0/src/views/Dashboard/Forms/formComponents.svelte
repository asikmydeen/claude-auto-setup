<script>
  import HtmlEditor from "../../../components/Inputs/HtmlEditor.svelte";
  import TagsInput from "../../../components/Inputs/TagsInput.svelte";
  import DropzoneFileUpload from "../../../components/Inputs/DropzoneFileUpload.svelte";
  import BaseSlider from "../../../components/BaseSlider.svelte";
  import BaseHeader from "../../../components/BaseHeader.svelte";
  import RouteBreadcrumb from "../../../components/Breadcrumb/RouteBreadcrumb.svelte";
  import BaseButton from "../../../components/BaseButton.svelte";
  import Card from "../../../components/Cards/Card.svelte";
  import BaseSwitch from "../../../components/BaseSwitch.svelte";
  import BaseInput from "../../../components/Inputs/BaseInput.svelte";
  import MultiSelect from "../../../components/Inputs/MultiSelect.svelte";
  import { clickOutside } from "../../../components/clickOutside.js";
  import { onMount } from "svelte";
  import Flatpickr from "svelte-flatpickr";
  import { fade } from "svelte/transition";
  onMount(function() {
    let topmenu = document.getElementsByTagName("nav").item(0);
    topmenu.classList.add("bg-danger");
    topmenu.classList.add("navbar-dark");
    topmenu.classList.remove("navbar-light");
    let search = document.getElementsByTagName("form").item(0);
    search.classList.remove("navbar-search-dark");
    search.classList.add("navbar-search-light");
  });
  import "~@flatpickr/dist/flatpickr.css";
  import "~@flatpickr/dist/themes/light.css";

  let date = null;
  const flatpickrOptions = {
    enableTime: true,
    onChange: (selectedDates, dateStr, instance) => {}
  };

  const flatpickrOptionsRange = {
    mode: "range",
    enableTime: true,
    onChange: (selectedDates, dateStr, instance) => {}
  };
  function handleChange(selectedDates, dateStr, instance) {}

  let suffix = false;
  export let name = "Form components";
  let selectOptions = [
    {
      label: "Alerts",
      value: "Alerts"
    },
    {
      label: "Badges",
      value: "Badges"
    },
    {
      label: "Buttons",
      value: "Buttons"
    },
    {
      label: "Cards",
      value: "Cards"
    },
    {
      label: "Forms",
      value: "Forms"
    },
    {
      label: "Modals",
      value: "Modals"
    }
  ];
  let selects = {
    simple: "Badges",
    multiple: ["Alerts", "Buttons"]
  };
  let dates = {
    simple: new Date(),
    range: "2019-04-19 to 2019-04-24"
  };
  let inputs = {
    tags: ["BUCHAREST", "IASI", "TIMISOARA"],
    fileSingle: [],
    fileMultiple: []
  };
  let switches = {
    off: false,
    primary: true,
    default: true,
    danger: true,
    warning: true,
    success: true,
    info: true
  };
  let sliders = {
    simple: 50,
    range: [200, 400]
  };

  let itemSelected = selectOptions[1].label;

  function handleClickOutside(event) {
    suffix = false;
  }
</script>

<div transition:fade={{ duration: 250 }}>
  <BaseHeader className="pb-6">
    <div class="row align-items-center py-4">
      <div class="col-lg-6 col-7">
        <h6 class="h2 text-white d-inline-block mb-0">{name}</h6>
        <nav aria-label="breadcrumb" class="d-none d-md-inline-block ml-md-4">
          <RouteBreadcrumb {name} />
        </nav>
      </div>
      <div class="col-lg-6 col-5 text-right">
        <BaseButton size="sm" type="neutral">New</BaseButton>
        <BaseButton size="sm" type="neutral">Filters</BaseButton>
      </div>
    </div>
  </BaseHeader>

  <div class="container-fluid mt--6">
    <div class="row">
      <div class="col-lg-6">
        <div class="card-wrapper">
          <!-- Input groups -->
          <Card>
            <!-- Card header -->
            <h3 slot="header" class="mb-0">Input groups</h3>
            <!-- Card body -->
            <form>
              <!-- Input groups with icon -->
              <div class="row">
                <div class="col-md-6">
                  <BaseInput
                    prependIcon="fas fa-user"
                    placeholder="Your name" />
                </div>
                <div class="col-md-6">
                  <BaseInput
                    prependIcon="fas fa-envelope"
                    placeholder="Email" />
                </div>
              </div>
              <div class="row">
                <div class="col-md-6">
                  <BaseInput
                    appendIcon="fas fa-map-marker"
                    placeholder="Location" />
                </div>
                <div class="col-md-6">
                  <BaseInput
                    appendIcon="fas fa-eye"
                    placeholder="Password"
                    type="password" />
                </div>
              </div>
              <!-- Input groups with icon -->
              <div class="row">
                <div class="col-md-6">
                  <BaseInput
                    prependIcon="fas fa-credit-card"
                    placeholder="Payment Method">
                    <small slot="append" class="font-weight-bold">USD</small>
                  </BaseInput>
                </div>
                <div class="col-md-6">
                  <BaseInput
                    appendIcon="fas fa-phone"
                    prependIcon="fas fa-globe-americas"
                    placeholder="Phone" />
                </div>
              </div>
            </form>
          </Card>
          <!-- Dropdowns -->
          <Card>
            <!-- Card header -->
            <h3 slot="header" class="mb-0">Selects</h3>
            <!-- Card body -->
            <form>
              <div class="row">
                <div class="col-md-6">
                  <div
                    class="el-select select-primary pagination-select"
                    use:clickOutside
                    on:click_outside={handleClickOutside}
                    style="padding-left: 15px;">
                    <!---->
                    <div
                      class="el-input el-input--suffix {suffix === true ? 'is-focus' : ''}">
                      <!---->
                      <label class="form-control-label">Simple select</label>
                      <input
                        type="text"
                        id="search"
                        on:click={() => (suffix = true)}
                        readonly="readonly"
                        autocomplete="off"
                        placeholder={itemSelected}
                        class="el-input__inner text-dark" />
                      <!---->
                      <span
                        class="el-input__suffix"
                        style="max-height: 43px; top: 40%;">
                        <span class="el-input__suffix-inner">
                          <i
                            class="el-select__caret el-input__icon
                            el-icon-arrow-up {suffix === true ? 'is-reverse' : ''}" />
                          <!---->
                          <!---->
                        </span>
                        <!---->
                      </span>
                      <!---->
                    </div>
                    <div
                      class="el-select-dropdown el-popper"
                      style="display: {suffix === false ? 'none' : ''};
                      min-width: 96%; z-index: 100000;">
                      <div class="el-scrollbar" style="">
                        <div
                          class="el-select-dropdown__wrap el-scrollbar__wrap"
                          style="margin-bottom: -17px; margin-right: -17px;">
                          <ul
                            class="el-scrollbar__view el-select-dropdown__list">
                            <!---->
                            {#each selectOptions as option}
                              <li
                                class="el-select-dropdown__item select-primary {itemSelected === option.label ? 'selected' : ''}"
                                on:click={() => ((suffix = false), (itemSelected = option.label))}>
                                <span>{option.label}</span>
                              </li>
                            {/each}
                          </ul>
                        </div>
                        <div class="el-scrollbar__bar is-horizontal">
                          <div
                            class="el-scrollbar__thumb"
                            style="transform: translateX(0%);" />
                        </div>
                        <div class="el-scrollbar__bar is-vertical">
                          <div
                            class="el-scrollbar__thumb"
                            style="transform: translateY(0%);" />
                        </div>
                      </div>
                      <!---->
                    </div>
                  </div>
                </div>
                <div class="col-md-6">
                  <BaseInput label="Multiple Select">
                    <MultiSelect id="options" value={['Alerts', 'Buttons']}>
                      {#each selectOptions as option}
                        <option
                          value={option.value}
                          class="el-tag el-tag--info el-tag--small v-enter-to">
                          {option.label}
                        </option>
                      {/each}
                    </MultiSelect>
                  </BaseInput>
                </div>

              </div>
            </form>
          </Card>
          <!-- Datepicker -->
          <Card noBod>
            <!-- Card header -->
            <div class="card-header">
              <h3 class="mb-0">Datepicker</h3>
            </div>
            <!-- Card body -->
            <div class="card-body">
              <form>
                <div class="row w-100 mx-0">
                  <div class="col-md-6">
                    <BaseInput label="Date picker">
                      <Flatpickr
                        options={flatpickrOptions}
                        class="form-control datepicker bg-white"
                        bind:value={date}
                        dateFormat="Y-m-d"
                        placeholder={dates.simple}
                        on:change={event => handleChange(event)} />
                    </BaseInput>
                  </div>
                  <div class="col-md-6">
                    <BaseInput label="Range picker">
                      <Flatpickr
                        options={flatpickrOptionsRange}
                        class="form-control datepicker bg-white"
                        defaultDate={dates.range}
                        placeholder={dates.range}
                        dateFormat="Y-m-d"
                        on:change={event => handleChange(event)} />
                    </BaseInput>
                  </div>
                </div>
              </form>
            </div>
          </Card>

          <!-- Text editor -->
          <Card noBody>
            <!-- Card header -->
            <div class="card-header">
              <h3 class="mb-0">Text editor</h3>
            </div>
            <!-- Card body -->
            <div class="card-body">
              <form>
                <HtmlEditor />
              </form>
            </div>
          </Card>
        </div>
      </div>
      <div class="col-lg-6">
        <div class="card-wrapper">
          <Card>
            <!--Card Header-->
            <h3 slot="header" class="mb-0">Tags</h3>
            <TagsInput
              model={inputs.tags}
              placeholder="Add new Tag"
              class="test" />
          </Card>

          <Card>
            <!--Card Header-->
            <h3 slot="header" class="mb-0">Toggle buttons</h3>
            <!--Card Body-->
            <BaseSwitch className="mr-1" onText="On" offText="Off" />
            <BaseSwitch
              className="mr-1"
              model={switches.primary}
              type="primary" />
            <BaseSwitch
              className="mr-1"
              model={switches.default}
              type="default" />
            <BaseSwitch
              className="mr-1"
              model={switches.danger}
              type="danger" />
            <BaseSwitch
              className="mr-1"
              model={switches.warning}
              type="warning" />
            <BaseSwitch
              className="mr-1"
              model={switches.success}
              type="success" />
            <BaseSwitch className="mr-1" model={switches.info} type="info" />
          </Card>

          <Card>
            <!--Card Header-->
            <h3 slot="header" class="mb-0">Sliders</h3>
            <!--Card Body-->

            <BaseSlider model={sliders.simple} min={0} value={50} max={100} />

            <div class="row mt-3">
              <div class="col-6">
                <span class="range-slider-value">{sliders.simple}</span>
              </div>
            </div>

            <BaseSlider
              className="mt-5"
              model={sliders.range}
              min={0}
              value={200}
              max={400} />

            <div class="row mt-3">
              <div class="col-6">
                <span class="range-slider-value">{sliders.range[0]}</span>
              </div>
              <div class="col-6 text-right">
                <span class="range-slider-value value-high">
                  {sliders.range[1]}
                </span>
              </div>
            </div>
          </Card>

          <Card>
            <!--Card Header-->
            <h3 slot="header" class="mb-0">Dropzone</h3>
            <!--Card Body-->

            <DropzoneFileUpload model={inputs.fileSingle} multiple={false} />
            <DropzoneFileUpload model={inputs.fileMultiple} multiple={true} />
          </Card>
        </div>
      </div>
    </div>
  </div>
</div>

<script>
  import projects from "./../projects";
  import Card from "../../../../components/Cards/Card.svelte";
  import BaseButton from "../../../../components/BaseButton.svelte";
  import Badge from "../../../../components/Badge.svelte";
  import BaseProgress from "../../../../components/BaseProgress.svelte";
  import SvelteTable from "svelte-table";
  import BaseDropdown from "../../../../components/BaseDropdown.svelte";
  import { fly } from "svelte/transition";
  let currentPage = 1;

  function onEdit(row) {
    alert(`You want to edit ${row.name}`);
  }

  function onDelete(row) {
    alert(`You want to delete ${row.name}`);
  }

  import { onMount } from "svelte";
  import jQuery from "jquery";
  import "datatables.net-dt/css";
  import dt from "datatables.net";
  import dtCss from "datatables.net-dt";
  dt(jQuery);
  let tableElement;
  onMount(() =>
    jQuery(tableElement).DataTable({
      order: [[1, "asc"]],
      paging: false,
      searching: false,
      ordering: true,
      info: false,
      responsive: true
    })
  );
</script>

<style>
.pagevisitsthead {
    background: #f6f9fc;
    color: #8898aa;
    height: 42px;
    font-size: 0.65rem !important;
    text-transform: uppercase !important;
    letter-spacing: 1px !important;
    border-top: 1px solid #ebeef5;
  }

  .pagevisitsthead tr th {
    padding-top: 0px;
    padding-bottom: 0px;
    font-weight: 600;
  }

  .pagevisitsTbody tr td {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
    padding-top: 1rem;
    padding-bottom: 1rem;
    border-top: 1px solid #e9ecef;
  }

  tbody tr {
    border-top: 1px solid #ebeef5;
  }

  thead tr td {
    padding-top: 0px;
    padding-bottom: 0px;
    padding-left: 1.5rem;
    padding-right: 1.5rem;
    width: auto;
    min-width: auto;
    white-space: nowrap;
  }

  table tbody tr {
    transition: all 0.3s ease-in-out;
  }

  table tbody tr:hover {
    background-color: transparent !important;
    transition: all 0.3s ease-in-out;
  }

  table tbody tr td {
    width: auto;
    min-width: auto;
    white-space: nowrap;
    box-sizing: border-box;
    white-space: normal;
    word-break: break-all;
    line-height: 23px;
    text-align: left;
    color: #525f7f;
    font-size: 0.8125rem;
    white-space: nowrap;
  }
  .dataTables_info {
    display: none;
  }
  .thead-light {
    background: #f6f9fc;
    color: #8898aa;
    font-size: 0.65rem !important;
    text-transform: uppercase !important;
    letter-spacing: 1px !important;
  }
  .tbody {
    font-size: 0.8125rem !important;
  }
  .thBorder {
    border-bottom: 1px solid #ebeef5;
  }
  .thPadding {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
    padding: 1rem;
  }
  .font-weight-bold {
    font-size: 0.8125rem;
  }
  .thead {
    border-top: 1px solid #ebeef5;
  }
  .dataTables-wrapper {
    width: 100%;
  }

  table tbody tr {
    transition: all 0.3s ease-in-out;
  }

  table tbody tr:hover {
    background-color: transparent !important;
    transition: all 0.3s ease-in-out;
  }

  .bgTransparent {
    background-color: transparent !important;
  }
</style>

<div>
  <Card noBody className="bg-transparent">
    <div class="card-header border-0 bg-transparent">
      <div class="row">
        <div class="col-6">
          <h3 class="mb-0">Translucent Table</h3>
        </div>
      </div>
    </div>
    <div class="row w-100 mx-0">
      <table
        bind:this={tableElement}
        class="table-responsive align-items-center w-100
        border-bottom-0" style="width:100%;">
        <thead
          class="border-top pagevisitsthead">
          <tr class="">
            <th
              class=""
              style="min-width: 310px; width: 30%"
              rowspan="1"
              colspan="1">
              Project
              <span class="caret-wrapper">
                <i class="sort-caret ascending" />
                <i class="sort-caret descending" />
              </span>
            </th>
            <th
              class=""
              style="min-width: 140px; width: 10%"
              rowspan="1"
              colspan="1">
              Budget
              <span class="caret-wrapper">
                <i class="sort-caret ascending" />
                <i class="sort-caret descending" />
              </span>
            </th>
            <th
              class=""
              style="min-width: 170px; width: 10%"
              rowspan="1"
              colspan="1">
              Status
              <span class="caret-wrapper">
                <i class="sort-caret ascending" />
                <i class="sort-caret descending" />
              </span>
            </th>
            <th
              class=""
              style="min-width: 190px; width: 10%"
              rowspan="1"
              colspan="1">
              Users
            </th>
            <th
              class=""
              style="min-width: 240px; width: 30%"
              rowspan="1"
              colspan="1">
              Completion
              <span class="caret-wrapper">
                <i class="sort-caret ascending" />
                <i class="sort-caret descending" />
              </span>
            </th>
            <th
              class=""
              style="min-width: 180px; width: 10%"
              rowspan="1"
              colspan="1" />
          </tr>
        </thead>
        <tbody class="tbody pagevisitsTbody">
          {#each projects as project, i}
            <tr
              class="">
              <td
                class="thPadding"
                rowspan="1"
                colspan="1"
                style="min-width: 310px width: 30%">
                <div class="media align-items-center">
                  <a href="#!" class="avatar rounded-circle mr-3">
                    <img alt="Image placeholder" src={project.img} />
                  </a>
                  <div class="media-body">
                    <span class="font-weight-600 name mb-0 text-sm">
                      {project.title}
                    </span>
                  </div>
                </div>
              </td>
              <td
                class="thPadding"
                rowspan="1"
                colspan="1"
                style="min-width: 140px; width: 10%">
                {project.budget}
              </td>
              <td
                class="thPadding"
                rowspan="1"
                colspan="1"
                style="min-width: 170px; width: 10%">
                <Badge className="badge-dot mr-4">
                  <i class={`bg-${project.statusType}`} />
                  <span class="status">{project.status}</span>
                </Badge>
              </td>
              <td
                class="thPadding"
                rowspan="1"
                colspan="1"
                style="min-width: 190px; width: 10%">
                <div class="avatar-group">
                  <a
                    href="#!"
                    class="avatar avatar-sm rounded-circle"
                    data-toggle="tooltip"
                    data-original-title="Ryan Tompson">
                    <img
                      alt="Image placeholder"
                      src="../../img/theme/team-1.jpg" />
                  </a>
                  <a
                    href="#!"
                    data-toggle="tooltip"
                    class="avatar avatar-sm rounded-circle"
                    data-original-title="Romina Hadid">
                    <img
                      alt="Image placeholder"
                      src="../../img/theme/team-2.jpg" />
                  </a>
                  <a
                    href="#!"
                    data-toggle="tooltip"
                    class="avatar avatar-sm rounded-circle"
                    data-original-title="Alexander Smith">
                    <img
                      alt="Image placeholder"
                      src="../../img/theme/team-3.jpg" />
                  </a>
                  <a
                    href="#!"
                    data-toggle="tooltip"
                    class="avatar avatar-sm rounded-circle"
                    data-original-title="Jessica Doe">
                    <img
                      alt="Image placeholder"
                      src="../../img/theme/team-4.jpg" />
                  </a>
                </div>
              </td>
              <td class="thPadding" style="min-width: 240px; width: 30%">
                <div class="d-xl-flex align-items-center">
                  <span class="completion mr-2">{project.completion}%</span>
                  <div
                    class="my-auto d-xl-flex align-items-center"
                    style="width: {project.completion}%">
                    <BaseProgress
                      progressClasses="mb-0"
                      type={project.statusType}
                      value={project.completion} />
                  </div>
                </div>
              </td>
              <td
                class="thPadding d-xl-flex justify-content-center"
                style="min-width: 180px; width: 10%">
                <BaseDropdown
                  menuOnRight
                  tagClasses="nav-item"
                  tag="li"
                  titleTag="a"
                  titleClasses="nav-link pr-0"
                  isOpen="false">
                  <span
                    class="btn btn-sm btn-icon-only text-light nav-link mr-0"
                    slot="title-container"
                    id="dropdownMenuButton"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false">
                    <i class="fas fa-ellipsis-v mt-2" />
                  </span>

                  <div class="dropdown-item" href="#!">
                    Action
                  </div>
                  <div class="dropdown-item" href="#!">
                    Another action
                  </div>
                  <div class="dropdown-item" href="#!">
                    Something else here
                  </div>
                </BaseDropdown>
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </Card>
</div>

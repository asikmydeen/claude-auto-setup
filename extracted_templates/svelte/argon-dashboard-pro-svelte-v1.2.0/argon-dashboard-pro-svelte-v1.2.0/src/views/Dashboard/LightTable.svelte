<script>
  import Card from "../../components/Cards/Card.svelte";
  import BaseButton from "../../components/BaseButton.svelte";
  import Badge from "../../components/Badge.svelte";
  import BaseProgress from "../../components/BaseProgress.svelte";
  import SvelteTable from "svelte-table";
  import BaseDropdown from "../../components/BaseDropdown.svelte";
  import { fly } from "svelte/transition";
  let currentPage = 1;

  let projects = [
    {
      img: "../img/theme/bootstrap.jpg",
      title: "Argon Design System",
      budget: "$2500 USD",
      status: "pending",
      statusType: "warning",
      completion: 60
    },
    {
      img: "../img/theme/angular.jpg",
      title: "Angular Now UI Kit PRO",
      budget: "$1800 USD",
      status: "completed",
      statusType: "success",
      completion: 100
    },
    {
      img: "../img/theme/sketch.jpg",
      title: "Black Dashboard",
      budget: "$3150 USD",
      status: "delayed",
      statusType: "danger",
      completion: 72
    },
    {
      img: "../img/theme/react.jpg",
      title: "React Material Dashboard",
      budget: "$4400 USD",
      status: "on schedule",
      statusType: "info",
      completion: 90
    },
    {
      img: "../img/theme/vue.jpg",
      title: "Vue Paper UI Kit PRO",
      budget: "$2200 USD",
      status: "completed",
      statusType: "success",
      completion: 100
    },
    {
      img: "../img/theme/bootstrap.jpg",
      title: "Argon Design System",
      budget: "$2500 USD",
      status: "pending",
      statusType: "warning",
      completion: 60
    },
    {
      img: "../img/theme/angular.jpg",
      title: "Angular Now UI Kit PRO",
      budget: "$1800 USD",
      status: "completed",
      statusType: "success",
      completion: 100
    },
    {
      img: "../img/theme/sketch.jpg",
      title: "Black Dashboard",
      budget: "$3150 USD",
      status: "delayed",
      statusType: "danger",
      completion: 72
    },
    {
      img: "../img/theme/vue.jpg",
      title: "Vue Paper UI Kit PRO",
      budget: "$2200 USD",
      status: "completed",
      statusType: "success",
      completion: 100
    }
  ];

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
</style>

<div>
  <Card noBody>
    <div class="card-header border-0">
      <div class="row">
        <div class="col-6">
          <h3 class="mb-0">Light Table</h3>
        </div>
      </div>
    </div>
    <div class="row w-100 mx-0">
      <table
        bind:this={tableElement}
        class="table-responsive table-flush align-items-center w-100
        border-bottom-0" style="width:100%">
        <thead
          class="w-100 pagevisitsthead">
          <tr class="">
            <th
              style="min-width: 310px"
              rowspan="1"
              colspan="1">
              Project
              <span class="caret-wrapper">
                <i class="sort-caret ascending" />
                <i class="sort-caret descending" />
              </span>
            </th>
            <th
              style="min-width: 140px;"
              rowspan="1"
              colspan="1">
              Budget
              <span class="caret-wrapper">
                <i class="sort-caret ascending" />
                <i class="sort-caret descending" />
              </span>
            </th>
            <th
              style="min-width: 170px;"
              rowspan="1"
              colspan="1">
              Status
              <span class="caret-wrapper">
                <i class="sort-caret ascending" />
                <i class="sort-caret descending" />
              </span>
            </th>
            <th
              style="min-width: 190px;"
              rowspan="1"
              colspan="1">
              Users
            </th>
            <th
              style="min-width: 240px;"
              rowspan="1"
              colspan="1">
              Completion
              <span class="caret-wrapper">
                <i class="sort-caret ascending" />
                <i class="sort-caret descending" />
              </span>
            </th>
            <th
              style="min-width: 180px;"
              rowspan="1"
              colspan="1" />
          </tr>
        </thead>
        <tbody class="pagevisitsTbody">
          {#each projects as project, i}
            <tr>
              <td
                rowspan="1"
                colspan="1"
                style="min-width: 310px">
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
                rowspan="1"
                colspan="1"
                style="min-width: 140px; width: 170px;">
                {project.budget}
              </td>
              <td
                rowspan="1"
                colspan="1"
                style="min-width: 170px;">
                <Badge className="badge-dot mr-4">
                  <i class={`bg-${project.statusType}`} />
                  <span class="status">{project.status}</span>
                </Badge>
              </td>
              <td
                rowspan="1"
                colspan="1"
                style="min-width: 190px;">
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
              <td style="min-width: 240px">
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
                class="d-xl-flex justify-content-center"
                style="min-width: 180px">
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

                  <div class="dropdown-item" href="#!">Action</div>
                  <div class="dropdown-item" href="#!">Another action</div>
                  <div class="dropdown-item" href="#!">Something else here</div>
                </BaseDropdown>
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </Card>
</div>

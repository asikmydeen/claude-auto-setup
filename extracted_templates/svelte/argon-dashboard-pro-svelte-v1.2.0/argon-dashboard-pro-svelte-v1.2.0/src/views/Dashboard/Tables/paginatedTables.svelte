<script>
  import { fade } from "svelte/transition";
  import RouteBreadcrumb from "../../../components/Breadcrumb/RouteBreadcrumb.svelte";
  import BaseHeader from "../../../components/BaseHeader.svelte";
  import BaseButton from "../../../components/BaseButton.svelte";
  import Card from "../../../components/Cards/Card.svelte";
  import BaseCheckbox from "../../../components/Inputs/BaseCheckbox.svelte";
  import clientPaginationMixin from "./PaginatedTables/clientPaginationMixin";
  import Swal from "sweetalert2/dist/sweetalert2.js";
  import users from "./users2";
  export let name = "Paginated tables";
  import { onMount } from "svelte";
  import jQuery from "jquery";
  import "datatables.net-dt/css";
  import dt from "datatables.net";
  import dtCss from "datatables.net-dt";
  import { clickOutside } from "../../../components/clickOutside.js";
  let search = false;
  let currentPage = 1;
  dt(jQuery);
  let tableElement;
  let table;
  let suffix = false;
  let lengthMenu = [5, 10, 15, 50];
  let perPage = 10;
  let total = users.length;
  let info;
  onMount(
    () =>
      (table = jQuery(tableElement).DataTable({
        order: [[1, "asc"]],
        paging: true,
        searching: true,
        ordering: true,
        info: true,
        responsive: true,
        autoWidth: false,
        lengthMenu: [5, 10, 25, 50],
        pageLength: perPage
      })),
    function() {
      let topmenu = document.getElementsByTagName("nav").item(0);
      topmenu.classList.add("bg-danger");
      topmenu.classList.add("navbar-dark");
      topmenu.classList.remove("navbar-light");
      let search = document.getElementsByTagName("form").item(0);
      search.classList.remove("navbar-search-dark");
      search.classList.add("navbar-search-light");
    }
  );

  let mixins = clientPaginationMixin;
  let propsToSearch = ["name", "email", "age"];
  let tableColumns = [
    {
      type: "selection"
    },
    {
      prop: "name",
      label: "Name",
      minWidth: 160,
      sortable: true
    },
    {
      prop: "position",
      label: "Position",
      minWidth: 220,
      sortable: true
    },
    {
      prop: "city",
      label: "Office",
      minWidth: 135,
      sortable: true
    },
    {
      prop: "age",
      label: "Age",
      minWidth: 100,
      sortable: true
    },
    {
      prop: "createdAt",
      label: "Start Date",
      minWidth: 150,
      sortable: true
    },
    {
      prop: "salary",
      label: "Salary",
      minWidth: 120,
      sortable: true
    }
  ];
  let tableData = users;
  let selectedRows = [];

  function paginationChange(page) {
    pagination.currentPage = page;
  }

  function handleLike(index, row) {
    Swal.fire({
      title: `you like ${row.name}`,
      buttonStyling: false,
      type: "succes",
      confirmButtonClass: "btn btn-success btn-fill"
    });
  }
  function handleEdit(index, row) {
    Swal.fire({
      title: `You want to edit ${row.name}`,
      buttonsStyling: false,
      confirmButtonClass: "btn btn-info btn-fill"
    });
  }
  function handleDelete(index, row) {
    Swal.fire({
      title: "Are you sure?",
      text: `You won't be able to revert this!`,
      type: "warning",
      showCancelButton: true,
      confirmButtonClass: "btn btn-success btn-fill",
      cancelButtonClass: "btn btn-danger btn-fill",
      confirmButtonText: "Yes, delete it!",
      buttonsStyling: false
    }).then(result => {
      if (result.value) {
        deleteRow(row);
        Swal.fire({
          title: "Deleted!",
          text: `You deleted ${row.name}`,
          type: "success",
          confirmButtonClass: "btn btn-success btn-fill",
          buttonsStyling: false
        });
      }
    });
  }
  function deleteRow(row) {
    let indexToDelete = tableData.findIndex(tableRow => tableRow.id === row.id);
    if (indexToDelete >= 0) {
      tableData.splice(indexToDelete, 1);
    }
  }
  function selectionChange(selectedRows) {
    selectedRows = selectedRows;
  }

  function tableShow(item) {
    table.page.len(item).draw();
    perPage = item;
    suffix = false;
  }

  function handleClickOutside(event) {
    suffix = false;
  }
</script>

<style>
  input#searchTable:focus,
  input#searchTable:active,
  input#searchTable:focus:active,
  input#searchTable:active:focus {
    transition: all 0.2s ease-in-out;
  }

  .thead-light {
    background: #f6f9fc;
    color: #8898aa;
    font-size: 0.65rem !important;
    text-transform: uppercase !important;
    letter-spacing: 1px !important;
    border-top: 1px solid #ebeef5;
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

  table.paginatedTable thead tr {
    border-bottom: 1px solid #ebeef5;
    border-top: 1px solid #ebeef5;
  }

  table.paginatedTable thead tr th,
  table.paginatedTable thead tr td {
    min-height: 40px;
    height: 40px;
    border-bottom: 1px solid #ebeef5;
    border-top: 1px solid #ebeef5;
  }

  table.paginatedTable tbody tr td,
  table.paginatedTable tbody tr th {
    min-height: 40px;
    height: 40px;
  }

  .tdPaginated {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
    padding-top: 1rem;
    padding-bottom: 1rem;
  }

  tbody.tbodyPaginated tr.trPaginated td {
    border-bottom: 1px solid #ebeef5;
  }
</style>

<div class="content" transition:fade={{ duration: 250 }}>
  <BaseHeader className="pb-6">
    <div class="row align-items-center py-4">
      <div class="col-7 col-lg-6">
        <h6 class="h2 text-white d-inline-block mb-0">Paginated tables</h6>
        <nav aria-label="breadcrumb" class="d-none d-md-inline-block ml-md-4">
          <RouteBreadcrumb {name} />
        </nav>
      </div>
      <div class="col-5 col-lg-6 text-right">
        <BaseButton size="sm" type="neutral">New</BaseButton>
        <BaseButton size="sm" type="neutral">Filters</BaseButton>
      </div>
    </div>
  </BaseHeader>
  <div class="container-fluid mt--6">
    <div>
      <Card
        className="no-border-card"
        bodyClasses="px-0 pb-1"
        footerClasses="pb-2">
        <div slot="header">
          <h3 class="mb-0">Paginated tables</h3>
          <p class="text-sm mb-0">
            This is a client side example of paginated tables using element-ui
            tables.
          </p>
        </div>
        <div>
          <div
            class="col-12 d-flex justify-content-center
            justify-content-sm-between flex-wrap px-0">
            <div
              class="el-select select-primary pagination-select"
              use:clickOutside
              on:click_outside={handleClickOutside}
              style="padding-left: 15px;">
              <!---->
              <div
                class="el-input el-input--suffix {suffix === true ? 'is-focus' : ''}">
                <!---->
                <input
                  type="text"
                  id="search"
                  on:click={() => (suffix = true)}
                  readonly="readonly"
                  autocomplete="off"
                  placeholder={perPage}
                  class="el-input__inner text-dark" />
                <!---->
                <span class="el-input__suffix">
                  <span class="el-input__suffix-inner">
                    <i
                      class="el-select__caret el-input__icon el-icon-arrow-up {suffix === true ? 'is-reverse' : ''}" />
                    <!---->
                    <!---->
                  </span>
                  <!---->
                </span>
                <!---->
              </div>
              <div
                class="el-select-dropdown el-popper"
                style="display: {suffix === false ? 'none' : ''}; min-width:
                210px;">
                <div class="el-scrollbar" style="">
                  <div
                    class="el-select-dropdown__wrap el-scrollbar__wrap"
                    style="margin-bottom: -17px; margin-right: -17px;">
                    <ul class="el-scrollbar__view el-select-dropdown__list">
                      <!---->
                      {#each lengthMenu as item}
                        <li
                          class="el-select-dropdown__item select-primary {perPage === item ? 'selected' : ''}"
                          on:click={() => tableShow(item)}>
                          <span>{item}</span>
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
            <div style="padding-right: 15px;">
              <span placeholder="Search...">
                <div class="form-group">
                  <!---->
                  <div class="input-group {search == true ? 'focused' : ''}">
                    <div class="input-group-prepend">
                      <span class="input-group-text">
                        <i class="fas fa-search" />
                      </span>
                    </div>
                    <input
                      on:focus={() => (search = true)}
                      on:blur={() => (search = false)}
                      type="text"
                      placeholder="Search..."
                      on:keyup={table.search(this.value).draw()}
                      id="searchTable"
                      class="form-control"
                      valid="true" />
                    <!---->
                  </div>
                  <div class="valid-feedback" />
                  <!---->
                </div>
              </span>
            </div>
            <table
              bind:this={tableElement}
              class="table-responsive table-flush align-items-center
              border-bottom-0 paginatedTable"
              style="width: 100%">
              <thead class="thead-light">
                <tr>
                  <th
                    class="py-0 pr-0 text-left"
                    style="min-width: 48px; width: 5%; padding-left: 1.5rem;">
                    <BaseCheckbox />
                  </th>
                  {#each tableColumns as column, i}
                    {#if i !== 0}
                      <th
                        class="py-0 {i === 1 ? 'pl-0 text-left' : ''}"
                        style="min-width: {column.minWidth}px; width: 10%;">
                        {column.label}
                        <span class="caret-wrapper">
                          <i class="sort-caret ascending" />
                          <i class="sort-caret descending" />
                        </span>
                      </th>
                    {/if}
                  {/each}
                  <th class="py-0" style="width: 15%;">Actions</th>
                </tr>
              </thead>
              <tbody class="tbodyPaginated">
                {#each tableData as user, i}
                  <tr class="trPaginated">
                    <td
                      colspan="1"
                      rowspan="1"
                      class="tdPaginated pr-0 text-left">
                      <BaseCheckbox />
                    </td>
                    <td
                      colspan="1"
                      rowspan="1"
                      class="tdPaginated pl-0 text-left">
                      {user.name}
                    </td>
                    <td colspan="1" rowspan="1" class="tdPaginated">
                      {user.position}
                    </td>
                    <td colspan="1" rowspan="1" class="tdPaginated">
                      {user.city}
                    </td>
                    <td colspan="1" rowspan="1" class="tdPaginated">
                      {user.age}
                    </td>
                    <td colspan="1" rowspan="1" class="tdPaginated">
                      {user.createdAt}
                    </td>
                    <td colspan="1" rowspan="1" class="tdPaginated">
                      {user.salary}
                    </td>
                    <td colspan="1" rowspan="1" class="tdPaginated">
                      <BaseButton
                        className="like btn-link"
                        type="info"
                        size="sm"
                        on:click={() => handleLike(i, user)}
                        icon>
                        <i class="text-white ni ni-like-2" />
                      </BaseButton>
                      <BaseButton
                        className="edit"
                        type="warning"
                        size="sm"
                        on:click={() => handleEdit(i, user)}
                        icon>
                        <i class="text-white ni ni-ruler-pencil" />
                      </BaseButton>
                      <BaseButton
                        className="remove btn-link"
                        type="danger"
                        size="sm"
                        on:click={() => handleDelete(i, user)}
                        icon>
                        <i class="text-white ni ni-fat-remove" />
                      </BaseButton>
                    </td>
                  </tr>
                {/each}
              </tbody>
            </table>
          </div>
        </div>
      </Card>
    </div>
  </div>
</div>

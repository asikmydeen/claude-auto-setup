<script>
  import users from "./../users";
  import Card from "../../../../components/Cards/Card.svelte";
  import BaseButton from "../../../../components/BaseButton.svelte";
  import BaseSwitch from "../../../../components/BaseSwitch.svelte";
  import SvelteTable from "svelte-table";
  import BaseCheckbox from "../../../../components/Inputs/BaseCheckbox.svelte";
  let position;
  let usersCheckboxTable = JSON.parse(JSON.stringify(users)); // for demo purposes so we don't share same users between different tables
  let currentPage = 1;
  let selectedRows = [];
  let selectAll = false;
  import { onMount } from "svelte";
  import jQuery from "jquery";
  import "datatables.net-dt/css";
  import dt from "datatables.net";
  import dtCss from "datatables.net-dt";
  dt(jQuery);
  let tableElement;
  onMount(() =>
    jQuery(tableElement).DataTable({
      columnDefs: [
        {
          orderable: false,
          className: "select-checkbox",
          targets: 0
        }
      ],
      select: {
        style: "os",
        selector: "td:first-child"
      },
      order: [[1, "asc"]],
      paging: false,
      searching: false,
      ordering: true,
      info: false,
      responsive: true
    })
  );

  function onEdit(row) {
    alert(`You want to edit ${row.name}`);
  }

  function onDelete(row) {
    alert(`You want to delete ${row.name}`);
  }
  function onSelectionChange(selectedRows) {
    selectedRows = selectedRows;
  }

  function selectAllRows() {
    if (selectAll === true) {
      for (var i = 0; i < usersCheckboxTable.length; i++) {
        usersCheckboxTable[i].checked = false;
      }
      selectAll = false;
    } else {
      for (var i = 0; i < usersCheckboxTable.length; i++) {
        usersCheckboxTable[i].checked = true;
      }
      selectAll = true;
    }
  }
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
  .tbody {
    font-size: 0.8125rem !important;
  }
  .font-weight-bold {
    font-size: 0.8125rem;
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
  <Card noBody>
    <div class="card-header border-0">
      <div class="row">
        <div class="col-6">
          <h3 class="mb-0">Checkbox + Labels</h3>
        </div>
        <div class="col-6 text-right">
          <BaseButton type="danger" className="el-tooltip" icon size="sm">
            <span class="btn-inner--icon">
              <i class="fas fa-trash" />
            </span>
            <span class="btn-inner--text">Delete</span>
          </BaseButton>
        </div>
      </div>
    </div>
    <div class="row w-100 mx-0">
      <table
        bind:this={tableElement}
        class="table-responsive table-flush w-100 border-bottom-0"
        style="width:100%">
        <thead class="thead-light w-100 pagevisitsthead">
          <tr class="">
            <th
              class=""
              style="min-width: 48px; width: 5%;"
              rowspan="1"
              colspan="1">
              <BaseCheckbox
                className="ml-2"
                model={selectAll}
                on:click={selectAllRows} />
            </th>
            <th
              class=""
              style="min-width: 220px; width: 35%"
              rowspan="1"
              colspan="1">
              AUTHOR
              <span class="caret-wrapper">
                <i class="sort-caret ascending" />
                <i class="sort-caret descending" />
              </span>
            </th>
            <th
              class="text-center"
              style="min-width: 140px; width: 10%"
              rowspan="1"
              colspan="1">
              CREATED AT
              <span class="caret-wrapper">
                <i class="sort-caret ascending" />
                <i class="sort-caret descending" />
              </span>
            </th>
            <th
              class="text-center"
              style="min-width: 180px; width: 10%;"
              rowspan="1"
              colspan="1">
              PRODUCT
              <span class="caret-wrapper">
                <i class="sort-caret ascending" />
                <i class="sort-caret descending" />
              </span>
            </th>
            <th
              class="text-center"
              style="min-width: 120px; width: 35%;"
              rowspan="1"
              colspan="1">
              ACTIVE
              <span class="caret-wrapper">
                <i class="sort-caret ascending" />
                <i class="sort-caret descending" />
              </span>
            </th>
          </tr>
        </thead>
        <tbody class="tbody pagevisitsTbody">
          {#each usersCheckboxTable as user, i}
            <tr
              class="{i === 0 ? 'table-success' : i === 2 ? 'table-warning' : ''}
              border-top"
              id={user.id}>
              <td
                class="thPadding bgTransparent"
                rowspan="1"
                colspan="1"
                style="min-width: 48px; width:5%;">
                <BaseCheckbox model={user.checked} />
              </td>
              <td
                class="thPadding bgTransparent"
                rowspan="1"
                colspan="1"
                style="min-width: 220px; width:35%;">
                <b>{user.name}</b>
              </td>
              <td
                class="thPadding bgTransparent text-center"
                rowspan="1"
                colspan="1"
                style="min-width: 140px; width: 10%;">
                {user.createdAt}
              </td>
              <td
                class="thPadding bgTransparent"
                rowspan="1"
                colspan="1"
                style="min-width: 180px; width:10%;">
                <a href="#!" class="font-weight-bold">{user.product}</a>
              </td>
              <td
                class="thPadding bgTransparent text-center"
                rowspan="1"
                colspan="1"
                style="min-width: 120px; width: 35%;">
                <div>
                  <BaseSwitch model={user.active} />
                  <div class="d-none">{user.active}</div>
                </div>
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </Card>
</div>

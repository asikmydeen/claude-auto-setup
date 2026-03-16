<script>
  import users from "./../users";
  import Card from "../../../../components/Cards/Card.svelte";
  import BaseButton from "../../../../components/BaseButton.svelte";
  import SvelteTooltip from "svelte-tooltip";

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
</style>

<div>
  <Card noBody>
    <div class="card-header border-0">
      <div class="row">
        <div class="col-6">
          <h3 class="mb-0">Inline actions</h3>
        </div>
        <div class="col-6 text-right">
          <BaseButton type="neutral" className="el-tooltip" icon size="sm">
            <span class="btn-inner--icon">
              <i class="fas fa-user-edit" />
            </span>
            <span class="btn-inner--text">Export</span>
          </BaseButton>
        </div>
      </div>
    </div>
    <div class="row w-100 mx-0">
      <table
        bind:this={tableElement}
        class="table-responsive table-flush w-100 border-bottom-0"style="width:100%;">
        <thead class="border-top thead w-100 pagevisitsthead">
          <tr
            class="thead-light">
            <th
              class="border-bottom-0"
              style="min-width: 310px; width: 40%"
              rowspan="1"
              colspan="1">
              AUTHOR
              <span class="caret-wrapper">
                <i class="sort-caret ascending" />
                <i class="sort-caret descending" />
              </span>
            </th>
            <th
              class="border-bottom-0"
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
              class="border-bottom-0"
              style="min-width: 200px; width: 10%"
              rowspan="1"
              colspan="1">
              PRODUCT
              <span class="caret-wrapper">
                <i class="sort-caret ascending" />
                <i class="sort-caret descending" />
              </span>
            </th>
            <th
              class="border-bottom-0"
              style="min-width: 180px; width: 40%"
              rowspan="1"
              colspan="1" />
          </tr>
        </thead>
        <tbody class="tbody pagevisitsTbody">
          {#each users as user, i}
            <tr
              class="border-top"
              id={user.id}>
              <td
                class="thPadding"
                rowspan="1"
                colspan="1"
                style="min-width: 310px; width: 40%">
                <img
                  src={user.image}
                  alt="avatar"
                  class="rounded-circle avatar mr-3" />
                <b>{user.name}</b>
              </td>
              <td
                class="thPadding"
                rowspan="1"
                colspan="1"
                style="min-width: 140px; width: 10%">
                {user.createdAt}
              </td>
              <td
                class="thPadding"
                rowspan="1"
                colspan="1"
                style="min-width: 200px; width: 10%">
                <a href="#!" class="font-weight-bold">{user.product}</a>
              </td>
              <td
                class="thPadding"
                rowspan="1"
                colspan="1"
                style="min-width: 180px; width: 40%">
                <div>
                  <div class="d-inline" style="color:#fff">
                    <SvelteTooltip tip="Edit" top color="#000">
                      <a
                        href="#!"
                        on:click={() => onEdit(user)}
                        class="table-action"
                        data-original-title="Edit product"
                        data-toggle="tooltip"
                        data-placement="top"
                        title="Edit">
                        <i class="fas fa-user-edit" />
                      </a>
                    </SvelteTooltip>
                  </div>
                  <div class="d-inline" style="color: #fff;">
                    <SvelteTooltip tip="Delete" top color="#000">
                      <a
                        href="#!"
                        on:click={() => onDelete(user)}
                        class="table-action table-action-delete"
                        data-toggle="tooltip"
                        data-placement="top"
                        title="Delete"
                        data-original-title="Delete product">
                        <i class="fas fa-trash" />
                      </a>
                    </SvelteTooltip>
                  </div>
                </div>
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </Card>
</div>

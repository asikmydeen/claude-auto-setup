<script>
  import SvelteTable from "svelte-table";
  import Card from "../../components/Cards/Card.svelte";
  let tableData = [
    {
      page: "/argon/",
      visitors: "4,569",
      unique: "340",
      bounceRate: "46,53%",
      bounceRateDirection: "up"
    },
    {
      page: "/argon/index.html",
      visitors: "3,985",
      unique: "319",
      bounceRate: "46,53%",
      bounceRateDirection: "down"
    },
    {
      page: "/argon/charts.html",
      visitors: "3,513",
      unique: "294",
      bounceRate: "36,49%",
      bounceRateDirection: "down"
    },
    {
      page: "/argon/tables.html",
      visitors: "2,050",
      unique: "147",
      bounceRate: "50,87%",
      bounceRateDirection: "up"
    },
    {
      page: "/argon/profile.html",
      visitors: "1,795",
      unique: "190",
      bounceRate: "46,53%",
      bounceRateDirection: "down"
    }
  ];

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

<Card bodyClasses="p-0" headerClass="border-0">
  <div slot="header">
    <div class="row align-items-center">
      <div class="col">
        <h3 class="mb-0">Page visits</h3>
      </div>
      <div class="col text-right">
        <a href="#!" class="btn btn-sm btn-primary">See all</a>
      </div>
    </div>
  </div>

  <table
    bind:this={tableElement}
    class="table-responsive table-flush align-items-center border-bottom-0"
    style="width: 100%">
    <thead class="w-100 pagevisitsthead">
      <tr>
        <th style="min-width: 200px; width: 20%;">
          page name
          <span class="caret-wrapper">
            <i class="sort-caret ascending" />
            <i class="sort-caret descending" />
          </span>
        </th>
        <th style="min-width: 150px; width: 20%;">
          visitors
          <span class="caret-wrapper">
            <i class="sort-caret ascending" />
            <i class="sort-caret descending" />
          </span>
        </th>
        <th style="min-width: 150px; width: 20%;">
          unique users
          <span class="caret-wrapper">
            <i class="sort-caret ascending" />
            <i class="sort-caret descending" />
          </span>
        </th>
        <th style="min-width: 150px; width: 20%;">
          bounce rate
          <span class="caret-wrapper">
            <i class="sort-caret ascending" />
            <i class="sort-caret descending" />
          </span>
        </th>
      </tr>
    </thead>
    <tbody class="pagevisitsTbody">
      {#each tableData as element}
        <tr>
          <td colspan="1" rowspan="1" style="min-width: 200px; width: 20%;">
            <div class="font-weight-600">{element.page}</div>
          </td>
          <td colspan="1" rowspan="1" style="min-width: 150px; width: 20%;">
            {element.visitors}
          </td>
          <td colspan="1" rowspan="1" style="min-width: 150px; width: 20%;">
            {element.unique}
          </td>
          <td colspan="1" rowspan="1" style="min-width: 150px; width: 20%;">
            <i
              class="fas fa-arrow-up text-success mr-3 {element.bounceRateDirection === 'up' ? 'text-success' : 'text-danger'}" />
            {element.bounceRate}
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
</Card>

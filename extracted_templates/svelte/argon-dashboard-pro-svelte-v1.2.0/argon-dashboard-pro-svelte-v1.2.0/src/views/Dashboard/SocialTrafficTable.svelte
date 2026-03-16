<script>
  import BaseProgress from "../../components/BaseProgress.svelte";
  import BaseButton from "../../components/BaseButton.svelte";
  import SvelteTable from "svelte-table";
  import Card from "../../components/Cards/Card.svelte";
  let tableData = [
    {
      name: "Facebook",
      visitors: "1,480",
      progress: 60,
      progressType: "gradient-danger"
    },
    {
      name: "LinkedIn",
      visitors: "5,480",
      progress: 70,
      progressType: "gradient-success"
    },
    {
      name: "Google",
      visitors: "4,807",
      progress: 80,
      progressType: "gradient-primary"
    },
    {
      name: "Instagram",
      visitors: "3,678",
      progress: 75,
      progressType: "gradient-info"
    },
    {
      name: "Twitter",
      visitors: "2,645",
      progress: 30,
      progressType: "gradient-warning"
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

<Card bodyClasses="p-0" headerClasses="border-0">
  <div slot="header">
    <div class="row align-items-center">
      <div class="col">
        <h3 class="mb-0">Social traffic</h3>
      </div>
      <div class="col-text-right">
        <BaseButton size="sm" type="primary">See all</BaseButton>
      </div>
    </div>
  </div>

  <table
    bind:this={tableElement}
    class="table-responsive table-flush align-items-center border-bottom-0"
    style="width: 100%">
    <thead class="w-100 pagevisitsthead">
      <tr>
        <th style="min-width: 115px; width: 30%">
          referral
          <span class="caret-wrapper">
            <i class="sort-caret ascending" />
            <i class="sort-caret descending" />
          </span>
        </th>
        <th style="min-width: 110px; width: 30%">
          visitors
          <span class="caret-wrapper">
            <i class="sort-caret ascending" />
            <i class="sort-caret descending" />
          </span>
        </th>
        <th style="min-width: 120px; width: 60%;" />
      </tr>
    </thead>
    <tbody class="pagevisitsTbody">
      {#each tableData as element}
        <tr>
          <td>
            <div class="font-weight-600">{element.name}</div>
          </td>
          <td>{element.visitors}</td>
          <td>
            <div class="d-flex align-items-center">
              <span class="mr-2">{element.progress}%</span>
              <BaseProgress
                type={element.progressType}
                value={element.progress} />
            </div>
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
</Card>

<template>
  <div class="py-4 container-fluid">
    <div class="mt-4 item">
      <div class="col-12">
        <div class="card">
          <!-- Card header -->
          <div class="card-header border-bottom">
            <div class="item d-flex align-items-center">
              <div class="col-6">
                <h5 class="mb-0">Items</h5>
              </div>
              <div class="col-6 text-end">
                <material-button class="float-right btn btm-sm" @click="this.$router.push({ name: 'Add Item' })">
                  <i class="fas fa-user-plus me-2"></i>
                  Add Item
                </material-button>
              </div>
            </div>
          </div>

          <!-- Card body -->
          <div class="px-0 pb-0 card-body">

            <!-- Search -->
            <div class="dataTable-search search-block col-2 ms-3">
              <material-input v-model:value="search" placeholder="Search..."
                class="mb-1 dataTable-input search-input-table" variant="static" />
            </div>

            <!-- Table -->
            <div class="table-responsive">
              <table id="item-list" ref="table" class="table table-flush">
                <thead class="thead-light">
                  <tr>
                    <th title="name" class="w-20">Name</th>
                    <th title="category" class="w-20">Category</th>
                    <th title="picture" class="w-20">Picture</th>
                    <th title="tags" class="w-20">Tags</th>
                    <th title="created_at" class="w-20">Created at</th>
                    <th data-sortable="false" class="text-end">Action</th>
                  </tr>
                </thead>
                <tbody class="text-sm">
                </tbody>
              </table>
            </div>
          </div>

          <div class="d-flex justify-content-center justify-content-sm-between flex-wrap align-items-center">
            <div class="ms-3">
              <p class="text-sm">
                Showing {{ pagination.total ? metaPage?.from : 0 }} to {{ metaPage?.to }} of
                {{ pagination.total }} entries
              </p>
            </div>
            <BasePagination v-model="pagination.currentPage" class="pagination-success pagination-md me-3"
              :value="pagination.currentPage" :per-page="pagination.perPage" :total="pagination.total"
              @click="getDataFromPage($event)" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { DataTable } from "simple-datatables";
import eventTable from "@/mixins/eventTable.js"
import store from "@/store";
import _ from "lodash";

import MaterialButton from "@/components/MaterialButton.vue";
import MaterialInput from "@/components/MaterialInput.vue";
import BasePagination from "@/components/BasePagination.vue";

var sortDirection = "created_at";
var getCurrentPage = 1;
var searchQuery = '';

const getItemsList = _.debounce(async function (params) {
  await store.dispatch("items/getItems", {
    ...(params.sort ? { sort: params.sort } : {}),
    filter: {
      ...(params.query ? { name: params.query } : {}),
    },
    page: {
      number: params.nr,
      size: params.perpage,
    },
  });
}, 300);

export default {
  name: "ItemsList",
  components: {
    MaterialButton,
    MaterialInput,
    BasePagination
  },
  data() {
    return {
      search: '',
      dataItems: [],
      pagination: {},
      dataTable: null,
      keys: null,
    }
  },
  mixins: [eventTable],
  computed: {
    itemsList() {
      return this.$store.getters["items/getItemsData"];

    },
    metaPage() {
      return this.$store.getters["items/getItemsMeta"];
    }
  },
  watch: {
    metaPage: {
      handler: "reactivePagination",
      immediate: false,
      deep: true,
    },
    itemsList: {
      handler: "reactiveTable",
      immediate: false,
      deep: true,
    },
    search: {
      handler: "reactiveSearch"
    }
  },
  async mounted() {
    if (this.$refs.table) {
      this.dataTable = new DataTable(this.$refs.table, {
        searchable: false,
        fixedHeight: false,
        perPage: 5,
      });

      document.querySelector(".dataTable-bottom").remove()
      this.dataTable.label = null;
      this.dataTable.setMessage(`<i class='fas fa-circle-notch fa-spin'></i>`);

      await getItemsList({
        sort: sortDirection,
        query: '',
        nr: getCurrentPage,
        perpage: this.dataTable.options.perPage
      });

      this.dataTable.on('datatable.perpage', async function (perpage) {
        this.setMessage(`<i class='fas fa-circle-notch fa-spin'></i>`);
        await getItemsList({
          sort: sortDirection,
          query: searchQuery,
          nr: getCurrentPage = 1,
          perpage: perpage
        });
      });

      this.dataTable.on('datatable.sort', async function (column, direction) {
        column = this.headings[column].title;
        direction = direction == "asc" ? "" : "-";
        await getItemsList({
          sort: sortDirection = direction + column,
          query: searchQuery,
          nr: getCurrentPage,
          perpage: this.options.perPage
        });
      });
    };
  },
  beforeUnmount() {
    sortDirection = "created_at";
    searchQuery = '';
    getCurrentPage = 1;
  },
  methods: {
    async getDataFromPage(page) {
      await getItemsList({
        sort: sortDirection,
        query: this.search,
        nr: page,
        perpage: this.dataTable.options.perPage
      });
    },

    async reactiveSearch() {
      searchQuery = this.search;
      await getItemsList({
        sort: sortDirection,
        query: this.search,
        nr: getCurrentPage = 1,
        perpage: this.dataTable.options.perPage
      });
    },

    async reactivePagination() {
      this.pagination = this.metaPage;
      this.keys = Object.keys(this.pagination);

      this.pagination = {
        currentPage: this.pagination[this.keys[0]],
        perPage: this.pagination[this.keys[3]],
        total: this.pagination[this.keys[5]]
      }
      getCurrentPage = this.pagination.currentPage;
      return this.pagination;
    },

    async reactiveTable() {
      this.dataItems = [];
      if (this.itemsList.length > 0) {
        this.itemsList.forEach(item => {

          var myTags = ''
          item.tags.forEach(tag => {
            const myTag = `<span class="badge badge-default me-1" style="background-color: ${tag.color}"> ${tag.name} </span>`
            myTags += myTag;
          })

          this.dataItems.push(
            [
              item.name,
              item.category.name,
              `<img src="${this.getImage(item)}" alt='avatar' class='w-80'>`,
              myTags,
              item.created_at,
              `<div class="text-end">${this.actionEditButton(item.id, "Edit Item") + this.actionDeleteButton(item.id, "Delete Item")}</div>`
            ]
          )
        });
        this.dataTable.data = [];
        this.dataTable.refresh();
        this.dataTable.insert({ data: this.dataItems });
        this.removeEvent();
        this.eventToCall({
          table: this.dataTable,
          myUserId: null,
          redirectPath: "Edit Item",
          deletePath: "items/deleteItem",
          getPath: "items/getItems",
          textDelete: "Item deleted successfully.",
          textDefaultData: 'items'
        });
      }
      else {
        this.dataTable.setMessage('No results match your search query');
      }
    },
    getImage(item) {
      if (!item.image) return require("@/assets/img/placeholder.jpg")
      else { return item.image }
    }
  }

};
</script>

<template>
  <div class="py-4 container-fluid">
    <div class="row">
      <div class="col-12">
        <div class="card">
          <!-- Card header -->
          <div class="pb-0 card-header">
            <div class="d-lg-flex">
              <div>
                <h5 class="mb-0">Item List</h5>
              </div>
              <div class="my-auto mt-4 ms-auto mt-lg-0">
                <div class="my-auto ms-auto">
                  <router-link :to="{ name: 'Add Item' }" class="mb-0 btn bg-gradient-success btn-sm">
                    <i class="fa fa-plus me-1" /> Add Item
                  </router-link>
                </div>
              </div>
            </div>
          </div>
          <hr>
          <div class="px-0 pb-0 card-body">
            <div class="dataTable-search search-block">
                <input v-model="search" class="dataTable-input search-input-table" placeholder="Search..." type="text">
            </div>
            <div class="table-responsive">
              <table id="item-list" ref="itemList" class="table table-flush">
                <thead class="thead-light">
                  <tr>
                    <th title="name">Name</th>
                    <th title="category.name">Category</th>
                    <th data-sortable="false">Picture</th>
                    <th title="tags.name">Tags</th>
                    <th title="created_at">Create at</th>
                    <th data-sortable="false">Action</th>
                  </tr>
                </thead>
                <tbody class="text-sm">
                </tbody>
                <tfoot>
                  <tr>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Picture</th>
                    <th>Tags</th>
                    <th>Create at</th>
                    <th>Action</th>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
          <div class="d-flex justify-content-center justify-content-sm-between flex-wrap">
            <div class="ms-3">
              <p>
                Showing {{ pagination.total ? metaPage?.from : 0 }} to {{ metaPage?.to }} of
                {{ pagination.total }} entries
              </p>
            </div>
            <BasePagination v-model="pagination.currentPage"
              class="pagination-success pagination-md me-3" :value="pagination.currentPage"
              :per-page="pagination.perPage" :total="pagination.total" @click="getDataFromPage($event)" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
  
<script>
import { DataTable } from "simple-datatables";
import store from "../../../store";
import BasePagination from "../../../components/BasePagination.vue";
import eventTable from "../../../mixins/eventTable.js";
import placeholder from "../../../assets/img/placeholder.jpg";
import _ from "lodash";

var sortDirection = "created_at";
var getCurrentPage = 1;
var searchQuery = '';

const getItemList = _.debounce(async function (params) { 
  await store.dispatch("item/itemsList", {
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
  name: "ListItemPage",
  components: {
    BasePagination
    },
  mixins: [eventTable],
  data() {
    return {
      dataItem: [],
      pagination: {},
      tableItem: null,
      keys: null,
      search: ''
    }
  },
  computed: {
    itemsList() {
      return this.$store.getters["item/itemsList"]?.data;
    },
    metaPage() {
      return this.$store.getters["item/itemsList"]?.meta;
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
    if (this.$refs.itemList) {

      this.tableItem = new DataTable(this.$refs.itemList, {
        searchable: false,
        fixedHeight: false,
        perPage: 5,
      });

      document.querySelector(".dataTable-bottom").remove()

      this.tableItem.label = null;
      this.tableItem.setMessage("Loading");

      await getItemList({
        sort: sortDirection,
        query: '',
        nr: getCurrentPage,
        perpage: this.tableItem.options.perPage
      });

      this.tableItem.on('datatable.perpage', async function (perpage) {
        this.setMessage('Loading');
        await getItemList({
            sort: sortDirection,
            query: searchQuery,
            nr: getCurrentPage = 1,
            perpage: perpage
        });
      });

      this.tableItem.on('datatable.sort', async function (column, direction) {
        column = this.headings[column].title;
        direction = direction == "asc" ? "" : "-";
        await getItemList({
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
        await getItemList({
            sort: sortDirection,
            query: this.search,
            nr: page,
            perpage: this.tableItem.options.perPage
        });
    },

    async reactiveSearch() {
      searchQuery = this.search;
      await getItemList({
        sort: sortDirection,
        query: this.search,
        nr: getCurrentPage = 1,
        perpage: this.tableItem.options.perPage
      });
    },

    async reactivePagination() {
        this.pagination = await this.metaPage;
        this.keys = Object.keys(this.pagination);

        this.pagination = {
            currentPage: this.pagination[this.keys[0]],
            perPage: this.pagination[this.keys[1]],
            total: this.pagination[this.keys[4]]
        }
        getCurrentPage = this.pagination.currentPage;
        return this.pagination;
    },

    async reactiveTable() {
      this.dataItem = [];
      if (this.itemsList.length > 0) {
        this.itemsList.forEach(row => {
          if(!row.image){
            row.image = placeholder;
          }
          this.dataItem.push(
            [
              `<h6 class="my-auto">${row.name}</h6>`,
              row.category.name,
              `<img src="${row.image}" class="item-image rounded">`,
              row.tags.map(tag =>
                `<span class="badge badge-sm me-1" style="background-color: ${tag.color}">
                  ${tag.name}
                </span>`
              ).join('<br>'),
              row.created_at,
              this.actionEditButton(row.id, "Edit Item") + this.actionDeleteButton(row.id, "Delete Item")
            ]
          )
        });

        this.tableItem.data = [];
        this.tableItem.refresh();
        this.tableItem.insert({ data: this.dataItem });
        this.removeEvent();
        this.eventToCall({
            table: this.tableItem,
            redirectPath: "Edit Item",
            deletePath: "item/deleteItem",
            getPath: "item/itemsList",
            textDelete: "Item deleted successfully!",
            textDefaultData: 'items'
        });
      }
      else {
        this.tableItem.setMessage('No results match your search query');
      }
    }
  }
};
</script>
  
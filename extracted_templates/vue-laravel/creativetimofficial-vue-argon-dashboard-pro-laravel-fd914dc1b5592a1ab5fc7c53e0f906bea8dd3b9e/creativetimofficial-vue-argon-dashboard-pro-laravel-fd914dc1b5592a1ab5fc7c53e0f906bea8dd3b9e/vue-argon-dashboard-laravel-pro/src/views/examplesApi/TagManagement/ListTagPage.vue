<template>
    <div class="py-4 container-fluid">
      <div class="row">
        <div class="col-12">
          <div class="card">
            <!-- Card header -->
            <div class="pb-0 card-header">
              <div class="d-lg-flex">
                <div>
                  <h5 class="mb-0">Tag List</h5>
                </div>
                <div class="my-auto mt-4 ms-auto mt-lg-0">
                  <div class="my-auto ms-auto">
                    <router-link :to="{ name: 'Add Tag' }" 
                      class="mb-0 btn bg-gradient-success btn-sm">
                        <i class="fa fa-plus me-1"/> Add Tag
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
                <table id="tag-list" ref="tagList" class="table table-flush">
                  <thead class="thead-light">
                    <tr>
                      <th title="name">Name</th>
                      <th title="color">Color</th>
                      <th title="created_at">Create at</th>
                      <th data-sortable="false">Action</th>
                    </tr>
                  </thead>
                  <tbody class="text-sm">
                  </tbody>
                  <tfoot>
                    <tr>
                      <th>Name</th>
                      <th>Color</th>
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
import _ from "lodash";

var sortDirection = "created_at";
var getCurrentPage = 1;
var searchQuery = '';

const getTagList = _.debounce(async function (params) { 
  await store.dispatch("tag/tagsList", {
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
  name: "ListTagPage",
  components: {
    BasePagination
  },
  mixins: [eventTable],
  data() {
    return {
      dataTags: [],
      pagination: {},
      tableTags: null,
      keys: null,
      search: ''
    }
  },
  computed: {
    tagList() {
      return this.$store.getters["tag/tagsList"]?.data;
    },
    metaPage() {
      return this.$store.getters["tag/tagsList"]?.meta;
    }
  },
  watch: {
    metaPage: {
      handler: "reactivePagination",
      immediate: false,
      deep: true,
    },
    tagList: {
      handler: "reactiveTable",
      immediate: false,
      deep: true,
    },
    search: {
      handler: "reactiveSearch"
    }
  },
  async mounted() {
    if (this.$refs.tagList) {

      this.tableTags = new DataTable(this.$refs.tagList, {
        searchable: false,
        fixedHeight: false,
        perPage: 5,
      });

      document.querySelector(".dataTable-bottom").remove()

      this.tableTags.label = null;
      this.tableTags.setMessage("Loading");

      await getTagList({
        sort: sortDirection,
        query: '',
        nr: getCurrentPage,
        perpage: this.tableTags.options.perPage
      });

      this.tableTags.on('datatable.perpage', async function (perpage) {
        this.setMessage('Loading');
        await getTagList({
          sort: sortDirection,
          query: searchQuery,
          nr: getCurrentPage = 1,
          perpage: perpage
        });
      });

      this.tableTags.on('datatable.sort', async function (column, direction) {
        column = this.headings[column].title;
        direction = direction == "asc" ? "" : "-";
        await getTagList({
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
      await getTagList({
        sort: sortDirection,
        query: this.search,
        nr: page,
        perpage: this.tableTags.options.perPage
      });
    },

    async reactiveSearch() {
      searchQuery = this.search;
      await getTagList({
        sort: sortDirection,
        query: this.search,
        nr: getCurrentPage = 1,
        perpage: this.tableTags.options.perPage
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
      this.dataTags = [];
      if (this.tagList.length > 0) {
        this.tagList.forEach(row => {
          this.dataTags.push(
            [
              `<h6 class="my-auto">${row.name}</h6>`,
              `<span class="badge badge-sm" style="background-color: ${row.color}">
                ${row.name}
              </span>`,
              row.created_at,
              this.actionEditButton(row.id, "Edit Tag") + this.actionDeleteButton(row.id, "Delete Tag")
            ]
          )
        });

        this.tableTags.data = [];
        this.tableTags.refresh();
        this.tableTags.insert({ data: this.dataTags });
        this.removeEvent();
        this.eventToCall({
          table: this.tableTags,
          redirectPath: "Edit Tag",
          deletePath: "tag/deleteTag",
          getPath: "tag/tagsList",
          textDelete: "Tag deleted successfully!",
          textDefaultData: 'tags'
        });
      }
      else {
        this.tableTags.setMessage('No results match your search query');
      }
    }
  },
};
</script>
  
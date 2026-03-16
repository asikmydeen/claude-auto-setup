<template>
  <div class="py-4 container-fluid">
    <div class="mt-4 tag">
      <div class="col-12">
        <div class="card">
          <!-- Card header -->
          <div class="card-header border-bottom">
            <div class="tag d-flex align-items-center">
              <div class="col-6">
                <h5 class="mb-0">Tags</h5>
              </div>
              <div class="col-6 text-end">
                <material-button
                  class="float-right btn btm-sm"
                  @click="this.$router.push({ name: 'Add Tag' })"
                >
                  <i class="fas fa-tag me-2"></i>
                  Add Tag
                </material-button>
              </div>
            </div>
          </div>

          <!-- Card body -->
          <div class="px-0 pb-0 card-body">
            <!-- Search -->
            <div class="dataTable-search search-block col-2 ms-3">
              <material-input
                id="id"
                v-model:value="search"
                placeholder="Search..."
                class="mb-1 dataTable-input search-input-table"
                variant="static"
              />
            </div>

            <!-- Table -->
            <div class="table-responsive">
              <table id="tag-list" ref="table" class="table table-flush">
                <thead class="thead-light">
                  <tr>
                    <th data-sortable="false" class="w-20">Name</th>
                    <th title="name" class="w-20">Color</th>
                    <th title="created_at" class="w-20">Created at</th>
                    <th data-sortable="false" class="text-end">Action</th>
                  </tr>
                </thead>
                <tbody class="text-sm"></tbody>
              </table>
            </div>
          </div>

          <div
            class="d-flex justify-content-center justify-content-sm-between flex-wrap align-items-center"
          >
            <div class="ms-3">
              <p class="text-sm">
                Showing {{ pagination.total ? metaPage?.from : 0 }} to
                {{ metaPage?.to }} of {{ pagination.total }} entries
              </p>
            </div>
            <BasePagination
              v-model="pagination.currentPage"
              class="pagination-success pagination-md me-3"
              :value="pagination.currentPage"
              :per-page="pagination.perPage"
              :total="pagination.total"
              @click="getDataFromPage($event)"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { DataTable } from "simple-datatables";
import eventTable from "@/mixins/eventTable.js";
import store from "@/store";
import _ from "lodash";

import MaterialButton from "@/components/MaterialButton.vue";
import MaterialInput from "@/components/MaterialInput.vue";
import BasePagination from "@/components/BasePagination.vue";

var sortDirection = "created_at";
var getCurrentPage = 1;
var searchQuery = "";

const getTagsList = _.debounce(async function (params) {
  await store.dispatch("tags/getTags", {
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
  name: "TagsList",
  components: {
    MaterialButton,
    MaterialInput,
    BasePagination,
  },
  mixins: [eventTable],
  data() {
    return {
      search: "",
      dataTags: [],
      pagination: {},
      dataTable: null,
      keys: null,
    };
  },
  computed: {
    tagsList() {
      return this.$store.getters["tags/getTagsData"];
    },
    metaPage() {
      return this.$store.getters["tags/getTagsMeta"];
    },
  },
  watch: {
    metaPage: {
      handler: "reactivePagination",
      immediate: false,
      deep: true,
    },
    tagsList: {
      handler: "reactiveTable",
      immediate: false,
      deep: true,
    },
    search: {
      handler: "reactiveSearch",
    },
  },
  async mounted() {
    if (this.$refs.table) {
      this.dataTable = new DataTable(this.$refs.table, {
        searchable: false,
        fixedHeight: false,
        perPage: 5,
      });

      document.querySelector(".dataTable-bottom").remove();
      this.dataTable.label = null;
      this.dataTable.setMessage(`<i class='fas fa-circle-notch fa-spin'></i>`);

      await getTagsList({
        sort: sortDirection,
        query: "",
        nr: getCurrentPage,
        perpage: this.dataTable.options.perPage,
      });

      this.dataTable.on("datatable.perpage", async function (perpage) {
        this.setMessage(`<i class='fas fa-circle-notch fa-spin'></i>`);
        await getTagsList({
          sort: sortDirection,
          query: searchQuery,
          nr: (getCurrentPage = 1),
          perpage: perpage,
        });
      });

      this.dataTable.on("datatable.sort", async function (column, direction) {
        column = this.headings[column].title;
        direction = direction == "asc" ? "" : "-";
        await getTagsList({
          sort: (sortDirection = direction + column),
          query: searchQuery,
          nr: getCurrentPage,
          perpage: this.options.perPage,
        });
      });
    }
  },
  beforeUnmount() {
    sortDirection = "created_at";
    searchQuery = "";
    getCurrentPage = 1;
  },
  methods: {
    async getDataFromPage(page) {
      await getTagsList({
        sort: sortDirection,
        query: this.search,
        nr: page,
        perpage: this.dataTable.options.perPage,
      });
    },

    async reactiveSearch() {
      searchQuery = this.search;
      await getTagsList({
        sort: sortDirection,
        query: this.search,
        nr: (getCurrentPage = 1),
        perpage: this.dataTable.options.perPage,
      });
    },

    async reactivePagination() {
      this.pagination = this.metaPage;
      this.keys = Object.keys(this.pagination);

      this.pagination = {
        currentPage: this.pagination[this.keys[0]],
        perPage: this.pagination[this.keys[3]],
        total: this.pagination[this.keys[5]],
      };
      getCurrentPage = this.pagination.currentPage;
      return this.pagination;
    },

    async reactiveTable() {
      this.dataTags = [];
      if (this.tagsList.length > 0) {
        this.tagsList.forEach((tag) => {
          this.dataTags.push([
            tag.name,
            `<span class="badge badge-default" style="background-color: ${tag.color}"> ${tag.name} </span>`,
            tag.created_at,
            `<div class="text-end">${
              this.actionEditButton(tag.id, "Edit Tag") +
              this.actionDeleteButton(tag.id, "Delete Tag")
            }</div>`,
          ]);
        });
        this.dataTable.data = [];
        this.dataTable.refresh();
        this.dataTable.insert({ data: this.dataTags });
        this.removeEvent();
        this.eventToCall({
          table: this.dataTable,
          myUserId: null,
          redirectPath: "Edit Tag",
          deletePath: "tags/deleteTag",
          getPath: "tags/getTags",
          textDelete: "Tag deleted successfully.",
          textDefaultData: "tags",
        });
      } else {
        this.dataTable.setMessage("No results match your search query");
      }
    },
  },
};
</script>

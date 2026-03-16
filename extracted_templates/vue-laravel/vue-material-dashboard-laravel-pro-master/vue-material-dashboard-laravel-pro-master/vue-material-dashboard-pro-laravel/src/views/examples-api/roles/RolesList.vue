<template>
  <div class="py-4 container-fluid">
    <div class="mt-4 role">
      <div class="col-12">
        <div class="card">
          <!-- Card header -->
          <div class="card-header border-bottom">
            <div class="row d-flex align-items-center">
              <div class="col-6">
                <h5 class="mb-0">Roles</h5>
              </div>
              <div class="col-6 text-end">
                <material-button class="float-right btn btm-sm" @click="this.$router.push({ name: 'Add Role' })">
                  <i class="fas fa-user-plus me-2"></i>
                  Add Role
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
              <table id="user-list" ref="table" class="table table-flush">
                <thead class="thead-light">
                  <tr>
                    <th title="name" class="w-45">Name</th>
                    <th title="created_at" class="w-45">Created at</th>
                    <th data-sortable="false" class="text-end">Actions</th>
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

const getRolesList = _.debounce(async function (params) {
  await store.dispatch("roles/getRoles", {
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
  name: "RolesList",
  components: {
    MaterialButton,
    MaterialInput,
    BasePagination,
  },
  data() {
    return {
      search: '',
      dataRoles: [],
      pagination: {},
      dataTable: null,
      keys: null,
    }
  },
  mixins: [eventTable],
  computed: {
    rolesList() {
      return this.$store.getters["roles/getRolesData"];

    },
    metaPage() {
      return this.$store.getters["roles/getRolesMeta"];
    }
  },
  watch: {
    metaPage: {
      handler: "reactivePagination",
      immediate: false,
      deep: true,
    },
    rolesList: {
      handler: "reactiveTable",
      immediate: false,
      deep: true,
    },
    search: {
      handler: "reactiveSearch"
    }
  },
  async mounted() {

    //if ref to the table exists
    if (this.$refs.table) {
      this.dataTable = new DataTable(this.$refs.table, {
        searchable: false,
        fixedHeight: false,
        perPage: 5,
      });

      document.querySelector(".dataTable-bottom").remove()
      this.dataTable.label = null;
      this.dataTable.setMessage(`<i class='fas fa-circle-notch fa-spin'></i>`);
  

      await getRolesList({
        sort: sortDirection,
        query: '',
        nr: getCurrentPage,
        perpage: this.dataTable.options.perPage
      });


      this.dataTable.on('datatable.perpage', async function (perpage) {
        this.setMessage(`<i class='fas fa-circle-notch fa-spin'></i>`);
        await getRolesList({
          sort: sortDirection,
          query: searchQuery,
          nr: getCurrentPage = 1,
          perpage: perpage
        });
      });

      this.dataTable.on('datatable.sort', async function (column, direction) {
        column = this.headings[column].title;
        direction = direction == "asc" ? "" : "-";
        await getRolesList({
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
      await getRolesList({
        sort: sortDirection,
        query: this.search,
        nr: page,
        perpage: this.dataTable.options.perPage
      });
    },

    async reactiveSearch() {
      searchQuery = this.search;
      await getRolesList({
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
      this.dataRoles = [];
      if (this.rolesList.length > 0) {
        this.rolesList.forEach(role => {
          this.dataRoles.push(
            [
              role.name,
              role.created_at,
              `<div class="text-end">${this.actionEditButton(role.id, "Edit Role") + this.actionDeleteButton(role.id, "Delete Role")}</div>`
            ]
          )
        });
        this.dataTable.data = [];
        this.dataTable.refresh();
        this.dataTable.insert({ data: this.dataRoles });
        this.removeEvent();
        this.eventToCall({
          table: this.dataTable,
          myUSerId: null,
          redirectPath: "Edit Role",
          deletePath: "roles/deleteRole",
          getPath: "roles/getRoles",
          textDelete: "Role deleted successfully.",
          textDefaultData: 'roles'
        });
      }
      else {
        this.dataTable.setMessage('No results match your search query');
      }
    },
  }

};
</script>

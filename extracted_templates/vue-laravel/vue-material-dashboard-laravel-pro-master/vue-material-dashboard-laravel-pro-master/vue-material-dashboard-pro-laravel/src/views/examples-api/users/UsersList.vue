<template>
  <div class="py-4 container-fluid">
    <div class="mt-4 user">
      <div class="col-12">
        <div class="card">
          <!-- Card header -->
          <div class="card-header border-bottom">
            <div class="user d-flex align-items-center">
              <div class="col-6">
                <h5 class="mb-0">Users</h5>
              </div>
              <div class="col-6 text-end">
                <material-button class="float-right btn btm-sm" @click="this.$router.push({ name: 'Add User' })">
                  <i class="fas fa-user-plus me-2"></i>
                  Add User
                </material-button>
              </div>
            </div>
          </div>

          <!-- Card body -->
          <div class="px-0 pb-0 card-body">

            <!-- Search -->
            <div class="dataTable-search search-block col-2 ms-3">
              <material-input id="search" v-model:value="search" placeholder="Search..."
                class="mb-1 dataTable-input search-input-table" variant="static" />
            </div>

            <!-- Table -->
            <div class="table-responsive">
              <table id="user-list" ref="table" class="table table-flush">
                <thead class="thead-light">
                  <tr>
                    <th data-sortable="false">Avatar</th>
                    <th title="name">Name</th>
                    <th title="email">Email</th>
                    <th title="roles.name">Role</th>
                    <th title="created_at">Created at</th>
                    <th data-sortable="false">Action</th>
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

const getUsersList = _.debounce(async function (params) {
  await store.dispatch("users/getUsers", {
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
  name: "UsersList",
  components: {
    MaterialButton,
    MaterialInput,
    BasePagination
  },
  mixins: [eventTable],
  data() {
    return {
      search: '',
      dataUsers: [],
      pagination: {},
      dataTable: null,
      keys: null,
      me: null
    }
  },
  computed: {
    usersList() {
      return this.$store.getters["users/getUsersData"];

    },
    metaPage() {
      return this.$store.getters["users/getUsersMeta"];
    },
  },
  watch: {
    metaPage: {
      handler: "reactivePagination",
      immediate: false,
      deep: true,
    },
    usersList: {
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

      await getUsersList({
        sort: sortDirection,
        query: '',
        nr: getCurrentPage,
        perpage: this.dataTable.options.perPage
      });

      this.dataTable.on('datatable.perpage', async function (perpage) {
        this.setMessage(`<i class='fas fa-circle-notch fa-spin'></i>`);
        await getUsersList({
          sort: sortDirection,
          query: searchQuery,
          nr: getCurrentPage = 1,
          perpage: perpage
        });
      });

      this.dataTable.on('datatable.sort', async function (column, direction) {
        column = this.headings[column].title;
        direction = direction == "asc" ? "" : "-";
        await getUsersList({
          sort: sortDirection = direction + column,
          query: searchQuery,
          nr: getCurrentPage,
          perpage: this.options.perPage
        });
      });
    };

    
    await this.$store.dispatch('profile/getProfile');
    this.me = this.$store.getters['profile/getUserProfile']
  },
  beforeUnmount() {
    sortDirection = "created_at";
    searchQuery = '';
    getCurrentPage = 1;
  },
  methods: {
    async getDataFromPage(page) {
      await getUsersList({
        sort: sortDirection,
        query: this.search,
        nr: page,
        perpage: this.dataTable.options.perPage
      });
    },

    async reactiveSearch() {
      searchQuery = this.search;
      await getUsersList({
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
      this.dataUsers = [];
      if (this.usersList.length > 0) {
        this.usersList.forEach(user => {
          this.dataUsers.push(
            [   
              `<img src="${this.getImage(user)}" class="avatar rounded-circle">`,
              `<h6 class="my-auto">${user.name}</h6>`,
              user.email,
              user.roles[0].name,
              user.created_at,
              this.actionEditButton(user.id, "Edit User") + this.actionDeleteButton(user.id, "Delete user")
            ]
          )
        });
        this.dataTable.data = [];
        this.dataTable.refresh();
        this.dataTable.insert({ data: this.dataUsers });
        this.removeEvent();
        this.eventToCall({
          table: this.dataTable,
          myUserId: this.me.id,
          redirectPath: "Edit User",
          deletePath: "users/deleteUser",
          getPath: "users/getUsers",
          textDelete: "User deleted successfully.",
          textDefaultData: 'users'
        });
      }
      else {
        this.dataTable.setMessage('No results match your search query');
      }
    },
    
    getImage(user) {
      console.log("user: ", user)
      if (!user.profile_image) return require("@/assets/img/placeholder.jpg")
      else { return user.profile_image }
    },
  }

};
</script>

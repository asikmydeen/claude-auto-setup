<template>
  <div class="py-4 container-fluid">
    <div class="row">
      <div class="col-12">
        <div class="card">
          <!-- Card header -->
          <div class="pb-0 card-header">
            <div class="d-lg-flex">
              <div>
                <h5 class="mb-0">Users List</h5>
              </div>
              <div class="my-auto mt-4 ms-auto mt-lg-0">
                <div class="my-auto ms-auto">
                  <router-link :to="{ name: 'User Add' }" class="mb-0 btn bg-gradient-success btn-sm">
                    <i class="fa fa-plus me-1" /> Add User
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
              <table id="user-list" ref="userList" class="table table-flush">
                <thead class="thead-light">
                  <tr>
                    <th data-sortable="false">Author</th>
                    <th title="name">Name</th>
                    <th title="email">Email</th>
                    <th title="roles.name">Role</th>
                    <th title="created_at">Create at</th>
                    <th data-sortable="false">Action</th>
                  </tr>
                </thead>
                <tbody class="text-sm">
                </tbody>
                <tfoot>
                  <tr>
                    <th>Author</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
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

const getUserList = _.debounce(async function (params) { 
  await store.dispatch("user/getUsers", {
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
  name: "ListUserPage",
  components: {
    BasePagination
  },
  mixins: [eventTable],
  data() {
    return {
      dataUsers: [],
      pagination: {},
      tableUsers: null,
      me: null,
      keys: null,
      search: ''
    }
  },
  computed: {
    userList() {
      return this.$store.getters["user/users"]?.data;
    },
    metaPage() {
      return this.$store.getters["user/users"]?.meta;
    }
  },
  watch: {
    metaPage: {
      handler: "reactivePagination",
      immediate: false,
      deep: true,
    },
    userList: {
      handler: "reactiveTable",
      immediate: false,
      deep: true,
    },
    search: {
      handler: "reactiveSearch"
    }
  },
  async mounted() {
    this.me = await this.$store.getters["profile/me"];

    if (this.$refs.userList) {

      this.tableUsers = new DataTable(this.$refs.userList, {
        searchable: false,
        fixedHeight: false,
        perPage: 5,
      });

      document.querySelector(".dataTable-bottom").remove()
      
      this.tableUsers.label = null;
      this.tableUsers.setMessage("Loading");

      await getUserList({
        sort: sortDirection,
        query: '',
        nr: getCurrentPage,
        perpage: this.tableUsers.options.perPage
      });

      this.tableUsers.on('datatable.perpage', async function (perpage) {
        this.setMessage('Loading');
        await getUserList({
          sort: sortDirection,
          query: searchQuery,
          nr: getCurrentPage = 1,
          perpage: perpage
        });
      });

      this.tableUsers.on('datatable.sort', async function (column, direction) {
        column = this.headings[column].title;
        direction = direction == "asc" ? "" : "-";
        await getUserList({
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
      await getUserList({
        sort: sortDirection,
        query: this.search,
        nr: page,
        perpage: this.tableUsers.options.perPage
      });
    },

    async reactiveSearch() {
      searchQuery = this.search;
      await getUserList({
        sort: sortDirection,
        query: this.search,
        nr: getCurrentPage = 1,
        perpage: this.tableUsers.options.perPage
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
      this.dataUsers = [];
      if (this.userList.length > 0) {
        this.userList.forEach(row => {
          if (row.profile_image == null) {
            row.profile_image = placeholder;
          }
          this.dataUsers.push(
            [
              `<img src="${row.profile_image}" class="avatar rounded-circle">`,
              `<h6 class="my-auto">${row.name}</h6>`,
              row.email,
              row.roles[0].name,
              row.created_at,
              this.actionEditButton(row.id, "Edit User") + this.actionDeleteButton(row.id, "Delete user")
            ]
          )
        });
        this.tableUsers.data = [];
        this.tableUsers.refresh();
        this.tableUsers.insert({ data: this.dataUsers });
        this.removeEvent();
        this.eventToCall({
          table: this.tableUsers,
          me: this.me,
          redirectPath: "Edit User",
          deletePath: "user/deleteUser",
          getPath: "user/getUsers",
          textDelete: "User deleted successfully.",
          textDefaultData: 'users'
        });
      }
      else {
        this.tableUsers.setMessage('No results match your search query');
      }
    }
  }
};
</script>
<template>
  <div class="container-fluid mt-5">
    <div>
      <card
        class="no-border-card"
        body-classes="px-0 pb-1"
        footer-classes="pb-2"
      >
        <template slot="header">
          <div class="row">
            <div class="col-6">
              <h3 class="mb-0">Roles List</h3>
            </div>
            <div class="col-6 text-right">
              <base-button type="primary" icon size="sm" @click="addRole()">
                <span class="btn-inner--icon"
                  ><i class="fas fa-user-edit"></i
                ></span>
                <span class="btn-inner--text">Add Role</span>
              </base-button>
            </div>
          </div>
        </template>
        <div>
          <div
            class="col-12 d-flex justify-content-center justify-content-sm-between flex-wrap"
          >
            <el-select
              class="select-primary pagination-select"
              v-model="pagination.perPage"
              placeholder="Per page"
            >
              <el-option
                class="select-primary"
                v-for="item in pagination.perPageOptions"
                :key="item"
                :label="item"
                :value="item"
              >
              </el-option>
            </el-select>

            <div>
              <base-input
                v-model="query"
                type="search"
                prepend-icon="fas fa-search"
                placeholder="Search..."
                clearable
              />
            </div>
          </div>
          <el-table
            class="table-responsive align-items-center table-flush"
            header-row-class-name="thead-light"
            :data="roles"
            @sort-change="sortChange"
          >
            <div slot="empty" v-if="loading">
              <img src="/img/loading.gif" style="height: 100px; width: 100px" />
            </div>
            <el-table-column label="Name" prop="name" sortable="custom" />
            <el-table-column
              label="Created At"
              prop="created_at"
              sortable="custom"
            />
            <el-table-column align="center">
              <div slot-scope="{ row }" class="table-actions">
                <el-tooltip content="Edit" placement="top">
                  <a
                    type="text"
                    @click="editRole(row)"
                    class="table-action"
                    data-toggle="tooltip"
                    style="cursor: pointer"
                  >
                    <i class="fas fa-user-edit" />
                  </a>
                </el-tooltip>

                <el-tooltip content="Delete" placement="top">
                  <a
                    type="text"
                    @click="deleteRole(row.id)"
                    class="table-action table-action-delete"
                    data-toggle="tooltip"
                    style="cursor: pointer"
                  >
                    <i class="fas fa-trash" />
                  </a>
                </el-tooltip>
              </div>
            </el-table-column>
          </el-table>
        </div>
        <div
          slot="footer"
          class="col-12 d-flex justify-content-center justify-content-sm-between flex-wrap"
        >
          <div class="">
            <p class="card-category">
              Showing {{ total ? from + 1 : 0 }} to {{ to }} of
              {{ total }} entries

              <span v-if="selectedRows.length">
                &nbsp; &nbsp; {{ selectedRows.length }} rows selected
              </span>
            </p>
          </div>
          <base-pagination
            class="pagination-no-border"
            v-model="pagination.currentPage"
            :per-page="pagination.perPage"
            :total="total"
          />
        </div>
      </card>
    </div>
  </div>
</template>
<script>
import { BasePagination } from "@/components/argon-core";
import {
  Table,
  TableColumn,
  DropdownMenu,
  DropdownItem,
  Dropdown,
  Tooltip,
  Select,
  Option,
  RadioButton,
  Button,
} from "element-ui";
import swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css";

export default {
  layout: "DashboardLayout",
  middleware: "admin",

  components: {
    BasePagination,
    [Tooltip.name]: Tooltip,
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
    [Dropdown.name]: Dropdown,
    [DropdownItem.name]: DropdownItem,
    [DropdownMenu.name]: DropdownMenu,
    [Select.name]: Select,
    [Option.name]: Option,
    [Button.name]: Button,
  },

  data() {
    return {
      roles: [],
      selectedRows: [],

      query: null,

      sort: "created_at",

      pagination: {
        perPage: 5,
        currentPage: 1,
        perPageOptions: [5, 10, 25, 50],
      },

      total: 0,
      loading: true,
    };
  },

  computed: {
    from() {
      return this.pagination.perPage * (this.pagination.currentPage - 1);
    },

    to() {
      let highBound = this.from + this.pagination.perPage;
      if (this.total < highBound) {
        highBound = this.total;
      }
      return highBound;
    },
  },

  watch: {
    query: {
      handler: "getListDebounced",
      immediate: true,
    },
    pagination: {
      handler: "getList",
      immediate: false,
      deep: true,
    },
  },

  methods: {
    getListDebounced: _.debounce(function () {
      this.getList();
    }, 300),

    async getList() {
      let params = {
        ...(this.sort ? { sort: this.sort } : {}),
        filter: {
          ...(this.query ? { name: this.query } : {}),
        },
        page: {
          number: this.pagination.currentPage,
          size: this.pagination.perPage,
        },
      };
      await this.$store.dispatch("roles/list", params);
      this.roles = this.$store.getters["roles/list"];
      this.total = this.$store.getters["roles/listTotal"];
      this.loading = false;
    },

    async deleteRole(id) {
      if (this.$isDemo == 1 && ["1", "2", "3"].includes(id)) {
        this.$notify({
          type: "danger",
          message: "You are not allowed not change data of default roles.",
        });
        return;
      }
      const confirmation = await swal.fire({
        title: `Delete this role?`,
        type: "question",
        buttonsStyling: false,
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, keep it",
        confirmButtonClass: "btn btn-primary",
        cancelButtonClass: "btn btn-warning",
      });

      try {
        if (confirmation.value === true) {
          await this.$store.dispatch("roles/destroy", id);
          await this.getList();
          this.$notify({
            type: "success",
            message: "Role deleted successfully.",
          });
        }
      } catch (error) {
        if (error.response.data.errors[0]) {
          this.$notify({
            type: "danger",
            message: "This Role still has associated Users.",
          });
        } else {
          this.$notify({
            type: "danger",
            message: "Oops, something went wrong!",
          });
        }
      }
    },
    addRole() {
      this.$router.push({ name: "examples-role-management-add-role" });
    },
    editRole(row) {
      this.$router.push({
        name: "examples-role-management-edit-role-id",
        params: { id: row.id },
      });
    },
    sortChange({ prop, order }) {
      if (order === "descending") {
        this.sort = `-${prop}`;
      } else {
        this.sort = `${prop}`;
      }
      this.getList();
    },
  },
};
</script>

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
              <h3 class="mb-0">Items List</h3>
            </div>
            <div class="col-6 text-right">
              <base-button type="primary" icon size="sm" @click="addItem()">
                <span class="btn-inner--icon"
                  ><i class="fas fa-user-edit"></i
                ></span>
                <span class="btn-inner--text">Add Item</span>
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
            :data="items"
            @sort-change="sortChange"
          >
            <div slot="empty" v-if="loading">
              <img src="/img/loading.gif" style="height: 100px; width: 100px" />
            </div>

            <el-table-column
              label="Name"
              min-width="200px"
              prop="name"
              sortable="custom"
            />
            <el-table-column
              label="Category"
              min-width="125px"
              prop="category.name"
              sortable="custom"
            />

            <el-table-column label="Picture" min-width="150px">
              <template v-slot="{ row }">
                <img
                  v-if="row.image"
                  :src="row.image"
                  style="width: 100px; height: auto"
                  alt="avatar"
                  class="rounded"
                />
              </template>
            </el-table-column>

            <el-table-column
              label="Tags"
              min-width="130px"
              max-width="400px"
              prop="tags.name"
              sortable="custom"
            >
              <template slot-scope="{ row }">
                <span
                  v-for="(tag, index) in row.tags"
                  :key="'tag' + index"
                  class="badge badge-default"
                  :style="{ backgroundColor: tag.color, margin: '.1rem' }"
                  >{{ tag.name }}</span
                >
              </template>
            </el-table-column>

            <el-table-column
              label="Created At"
              prop="created_at"
              min-width="170px"
              sortable="custom"
            />
            <el-table-column min-width="85px" align="center">
              <div slot-scope="{ row }" class="table-actions">
                <el-tooltip content="Edit" placement="top">
                  <a
                    type="text"
                    @click="editItem(row)"
                    class="table-action"
                    data-toggle="tooltip"
                    style="cursor: pointer"
                  >
                    <i class="fas fa-user-edit"></i>
                  </a>
                </el-tooltip>

                <el-tooltip content="Delete" placement="top">
                  <a
                    type="text"
                    @click="deleteItem(row.id)"
                    class="table-action table-action-delete"
                    data-toggle="tooltip"
                    style="cursor: pointer"
                  >
                    <i class="fas fa-trash"></i>
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
  Button,
} from "element-ui";
import Vue from "vue";
import { cloneDeep } from "lodash";
import swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css";

export default {
  layout: "DashboardLayout",

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
      query: null,
      selectedRows: [],
      sort: "created_at",
      total: 0,
      pagination: {
        perPage: 5,
        currentPage: 1,
        perPageOptions: [5, 10, 25, 50],
      },

      items: [],
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
    roles() {
      let roles = this.$store.getters["profile/me"].roles;

      return roles.map((r) => r.name);
    },
  },
  mounted() {
    this.$store.dispatch("profile/me");
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
      try {
        let params = {
          ...(this.sort ? { sort: this.sort } : {}),
          filter: {
            ...(this.query ? { name: this.query } : {}),
            ...(this.query ? { category: this.query } : {}),
            ...(this.query ? { tags: this.query } : {}),
          },
          page: {
            number: this.pagination.currentPage,
            size: this.pagination.perPage,
          },
          include: "category,tags",
        };

        await this.$store.dispatch("items/list", params);
        this.items = this.$store.getters["items/list"];
        this.total = this.$store.getters["items/listTotal"];
        this.loading = false;
      } catch (error) {
        this.$notify({
          type: "danger",
          message: "Oops, something went wrong!",
        });
      }
    },

    async deleteItem(id) {
      if (this.$isDemo == 1 && ["1", "2"].includes(id)) {
        this.$notify({
          type: "danger",
          message: "You are not allowed not change data of default items.",
        });
        return;
      }
      const confirmation = await swal.fire({
        title: `Delete this item?`,
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
          if (this.roles.includes("member")) {
            this.$notify({
              type: "danger",
              message: "Oops, you are not authorized to do this action!",
            });
            return;
          }
          await this.$store.dispatch("items/destroy", id);
          await this.getList();
          this.$notify({
            type: "success",
            message: "Item deleted successfully.",
          });
        }
      } catch (error) {
        this.$notify({
          type: "danger",
          message: "Oops, something went wrong!",
        });
      }
    },
    addItem() {
      this.$router.push({ name: "examples-item-management-add-item" });
    },
    editItem(row) {
      this.$router.push({
        name: "examples-item-management-edit-item-id",
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

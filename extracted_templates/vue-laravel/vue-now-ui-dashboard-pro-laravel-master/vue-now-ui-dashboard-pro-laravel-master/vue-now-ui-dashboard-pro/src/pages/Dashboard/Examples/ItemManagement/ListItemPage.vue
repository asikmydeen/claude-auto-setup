<template>
  <div class="row">
    <div class="col-xl-12 order-xl-1">
      <card card-body-classes="table-full-width" no-footer-line>
        <h4 slot="header" class="card-title">Items List</h4>
        <div
          class="col-12 text-right"
          style="margin-bottom: 10px; margin-top: -50px"
        >
          <n-button
            type="primary"
            class="btn btn-sm btn-primary"
            @click.native="addItem()"
          >
            <span>Add Item</span>
          </n-button>
        </div>
        <div>
          <div
            class="col-12 d-flex justify-content-center justify-content-sm-between flex-wrap"
          >
            <el-select
              class="select-primary mb-3"
              style="width: 200px"
              name="pages"
              v-model="pagination.perPage"
              placeholder="Per page"
            >
              <el-option
                class="select-default"
                v-for="item in pagination.perPageOptions"
                :key="item"
                :label="item"
                :value="item"
              >
              </el-option>
            </el-select>
            <fg-input>
              <el-input
                v-model="query"
                type="search"
                class="mb-3"
                clearable
                prefix-icon="el-icon-search"
                style="width: 200px"
                placeholder="Search..."
                aria-controls="datatables"
              >
              </el-input>
            </fg-input>
          </div>
          <el-table
            stripe
            style="width: 100%"
            :data="tableData"
            @sort-change="sortChange"
          >
            <div slot="empty" v-if="loading">
              <img src="/img/loading.gif" style="height: 100px; width: 100px" />
            </div>

            <el-table-column
              label="Name"
              min-width="130px"
              prop="name"
              sortable="custom"
            />

            <el-table-column
              label="Category"
              min-width="140px"
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
                />
              </template>
            </el-table-column>

            <el-table-column
              label="Tags"
              min-width="170px"
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
              min-width="160px"
              sortable="custom"
            />

            <el-table-column :min-width="135" fixed="right" label="Actions">
              <div
                slot-scope="{ row }"
                class="table-actions"
                style="margin-left: 10px"
              >
                <el-tooltip content="Edit" :open-delay="300" placement="top">
                  <n-button
                    @click.native="editItem(row.id)"
                    type="info"
                    size="sm"
                    round
                    icon
                  >
                    <i class="now-ui-icons ui-2_settings-90"></i>
                  </n-button>
                </el-tooltip>

                <el-tooltip content="Delete" :open-delay="300" placement="top">
                  <n-button
                    @click.native="deleteItem(row.id)"
                    class="remove"
                    type="danger"
                    size="sm"
                    round
                    icon
                  >
                    <i class="fa fa-times"></i>
                  </n-button>
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
              Showing {{ from + 1 }} to {{ to }} of {{ total }} entries
            </p>
          </div>
          <n-pagination
            class="pagination-no-border"
            v-model="pagination.currentPage"
            :per-page="pagination.perPage"
            :total="total"
          >
          </n-pagination>
        </div>
      </card>
    </div>
  </div>
</template>
<script>
import { Table, TableColumn, Select, Option } from "element-ui";
import { Pagination as NPagination } from "src/components";

export default {
  components: {
    NPagination,
    [Select.name]: Select,
    [Option.name]: Option,
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
  },
  data() {
    return {
      pagination: {
        perPage: 5,
        currentPage: 1,
        perPageOptions: [5, 10, 25, 50],
      },
      total: 0,
      query: null,
      sort: "created_at",
      tableData: [],
      loading: true,
    };
  },
  computed: {
    to() {
      let highBound = this.from + this.pagination.perPage;
      if (this.total < highBound) {
        highBound = this.total;
      }
      return highBound;
    },
    from() {
      return this.pagination.perPage * (this.pagination.currentPage - 1);
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
        this.tableData = this.$store.getters["items/list"];
        this.total = this.$store.getters["items/listTotal"];
        this.loading = false;
      } catch (error) {
        await this.$store.dispatch(
          "alerts/error",
          "Oops, something went wrong!"
        );
      }
    },

    async deleteItem(id) {
      if (this.$isDemo == 1 && ["1", "2"].includes(id)) {
        await this.$store.dispatch(
          "alerts/error",
          "You are not allowed to change data of default items."
        );
        return;
      }

      let confirm = await this.$store.dispatch(
        "alerts/confirmation",
        "Delete this item?"
      );

      try {
        if (confirm.value === true) {
          await this.$store.dispatch("profile/me");
          this.user = await { ...this.$store.getters["profile/me"] };
          if (this.user.roles[0].name === "member") {
            await this.$store.dispatch(
              "alerts/error",
              "Oops, you are not authorized to do this action."
            );
            return;
          }
          await this.$store.dispatch("items/destroy", id);
          await this.getList();

          await this.$store.dispatch(
            "alerts/success",
            "Item deleted successfully."
          );
        }
      } catch (error) {
        await this.$store.dispatch(
          "alerts/error",
          "Oops, something went wrong!"
        );
      }
    },
    sortChange({ prop, order }) {
      if (order === "descending") {
        this.sort = `-${prop}`;
      } else {
        this.sort = `${prop}`;
      }
      this.getList();
    },

    addItem() {
      this.$router.push({ name: "Add Item" });
    },

    editItem(id) {
      this.$router.push({ name: "Edit Item", params: { id } });
    },
  },
};
</script>
<style></style>

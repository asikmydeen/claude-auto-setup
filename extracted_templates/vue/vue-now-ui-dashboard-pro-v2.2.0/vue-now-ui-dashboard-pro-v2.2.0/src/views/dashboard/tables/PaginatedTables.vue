<template>
  <div class="row">
    <div class="col-12">
      <vnud-card card-body-classes="table-full-width" no-footer-line>
        <template v-slot:header>
          <h4 class="card-title">Paginated Tables</h4>
        </template>

        <div>
          <div
            class="
              col-12
              d-flex
              justify-content-center justify-content-sm-between
              flex-wrap
            "
          >
            <el-select
              class="select-primary mb-3"
              style="width: 200px"
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
                type="search"
                class="mb-3"
                clearable
                prefix-icon="el-icon-search"
                style="width: 200px"
                placeholder="Search records"
                v-model="searchQuery"
                aria-controls="datatables"
              >
              </el-input>
            </fg-input>
          </div>
          <el-table stripe style="width: 100%" :data="queriedData">
            <el-table-column
              v-for="column in tableColumns"
              :key="column.label"
              :min-width="column.minWidth"
              :prop="column.prop"
              :label="column.label"
            >
            </el-table-column>
            <el-table-column :min-width="135" fixed="right" label="Actions">
              <template v-slot:default="props">
                <div class="table-actions">
                  <n-button
                    @click="handleLike(props.$index, props.row)"
                    class="like"
                    type="info"
                    size="sm"
                    round
                    icon
                  >
                    <i class="fa fa-heart"></i>
                  </n-button>
                  <n-button
                    @click="handleEdit(props.$index, props.row)"
                    class="edit"
                    type="warning"
                    size="sm"
                    round
                    icon
                  >
                    <i class="fa fa-calendar"></i>
                  </n-button>
                  <n-button
                    @click="handleDelete(props.$index, props.row)"
                    class="remove"
                    type="danger"
                    size="sm"
                    round
                    icon
                  >
                    <i class="fa fa-times"></i>
                  </n-button>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <template v-slot:footer>
          <div
            class="
              col-12
              d-flex
              justify-content-center justify-content-sm-between
              flex-wrap
            "
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
        </template>
      </vnud-card>
    </div>
  </div>
</template>
<script>
import { ElTable, ElTableColumn, ElSelect, ElOption } from "element-plus";
import { Pagination as NPagination } from "@/components";
import users from "./Users";
import Swal from "sweetalert2";
export default {
  components: {
    NPagination,
    [ElSelect.name]: ElSelect,
    [ElOption.name]: ElOption,
    [ElTable.name]: ElTable,
    [ElTableColumn.name]: ElTableColumn,
  },
  computed: {
    pagedData() {
      return this.tableData.slice(this.from, this.to);
    },
    /***
     * Searches through table data and returns a paginated array.
     * Note that this should not be used for table with a lot of data as it might be slow!
     * Do the search and the pagination on the server and display the data retrieved from server instead.
     * @returns {computed.pagedData}
     */
    queriedData() {
      if (!this.searchQuery) {
        return this.pagedData;
      }
      let result = this.tableData.filter((row) => {
        let isIncluded = false;
        for (let key of this.propsToSearch) {
          let rowValue = row[key].toString();
          if (rowValue.includes && rowValue.includes(this.searchQuery)) {
            isIncluded = true;
          }
        }
        return isIncluded;
      });

      return result.slice(this.from, this.to);
    },
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
    total() {
      return this.searchedData.length > 0
        ? this.searchedData.length
        : this.tableData.length;
    },
  },
  data() {
    return {
      pagination: {
        perPage: 5,
        currentPage: 1,
        perPageOptions: [5, 10, 25, 50],
        total: 0,
      },
      searchQuery: "",
      propsToSearch: ["name", "email"],
      tableColumns: [
        {
          prop: "name",
          label: "Name",
          minWidth: 200,
        },
        {
          prop: "email",
          label: "Email",
          minWidth: 250,
        },
        {
          prop: "age",
          label: "Age",
          minWidth: 100,
        },
        {
          prop: "salary",
          label: "Salary",
          minWidth: 120,
        },
      ],
      tableData: users,
      searchedData: [],
      fuseSearch: null,
    };
  },
  methods: {
    handleLike(index, row) {
      const swalWithBootstrapButtons1 = Swal.mixin({
        customClass: {
          confirmButton: "btn btn-success btn-fill",
        },
        buttonsStyling: false,
      });

      swalWithBootstrapButtons1.fire({
        title: `You liked ${row.name}`,
      });
    },
    handleEdit(index, row) {
      const swalWithBootstrapButtons2 = Swal.mixin({
        customClass: {
          confirmButton: "btn btn-info btn-fill",
        },
        buttonsStyling: false,
      });

      swalWithBootstrapButtons2.fire({
        title: `You want to edit ${row.name}`,
      });
    },
    handleDelete(index, row) {
      const swalWithBootstrapButtons3 = Swal.mixin({
        customClass: {
          confirmButton: "btn btn-success btn-fill",
          cancelButton: "btn btn-danger btn-fill",
        },
        buttonsStyling: false,
      });
      swalWithBootstrapButtons3
        .fire({
          title: "Are you sure?",
          text: `You won't be able to revert this!`,
          showCancelButton: true,
          confirmButtonText: "Yes, delete it!",
        })
        .then((result) => {
          if (result.value) {
            this.deleteRow(row);
            swalWithBootstrapButtons3.fire({
              title: "Deleted!",
              text: `You deleted ${row.name}`,
            });
          }
        });
    },
    deleteRow(row) {
      let indexToDelete = this.tableData.findIndex(
        (tableRow) => tableRow.id === row.id
      );
      if (indexToDelete >= 0) {
        this.tableData.splice(indexToDelete, 1);
      }
    },
  },
};
</script>
<style></style>

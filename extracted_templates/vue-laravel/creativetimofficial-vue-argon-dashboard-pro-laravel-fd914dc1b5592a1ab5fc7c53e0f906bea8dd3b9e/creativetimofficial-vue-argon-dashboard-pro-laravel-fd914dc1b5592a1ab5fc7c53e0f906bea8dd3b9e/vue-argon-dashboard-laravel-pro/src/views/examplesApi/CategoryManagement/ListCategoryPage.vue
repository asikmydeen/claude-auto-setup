<template>
    <div class="py-4 container-fluid">
        <div class="row">
            <div class="col-12">
                <div class="card">
                    <!-- Card header -->
                    <div class="pb-0 card-header">
                        <div class="d-lg-flex">
                            <div>
                                <h5 class="mb-0">Category List</h5>
                            </div>
                            <div class="my-auto mt-4 ms-auto mt-lg-0">
                                <div class="my-auto ms-auto">
                                    <router-link :to="{ name: 'Category Add' }"
                                        class="mb-0 btn bg-gradient-success btn-sm">
                                        <i class="fa fa-plus me-1"/> Add Category
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
                            <table id="category-list" ref="categoryList" class="table table-flush">
                                <thead class="thead-light">
                                    <tr>
                                        <th title="name">Name</th>
                                        <th title="description">Description</th>
                                        <th title="created_at">Create at</th>
                                        <th data-sortable="false">Action</th>
                                    </tr>
                                </thead>
                                <tbody class="text-sm">
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <th>Name</th>
                                        <th>Description</th>
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

const getCategoryList = _.debounce(async function (params) { 
  await store.dispatch("category/categoryList", {
    ...(params.sort ? { sort: params.sort } : {}),
    filter: { 
      ...(params.query ? { name: params.query } : {}),
      ...(params.query ? { description: params.query } : {}),
    },
    page: {
      number: params.nr,
      size: params.perpage,
    },
  });
}, 300);

export default {
    name: "ListCategoryPage",
    components: {
    BasePagination
    },
    mixins: [eventTable],
    data() {
      return {
        dataCategory: [],
        pagination: {},
        tableCategories: null,
        keys: null,
        search: ''
      }
    },
    computed: {
        categoryList() {
            return this.$store.getters["category/categoryList"]?.data;
        },
        metaPage() {
            return this.$store.getters["category/categoryList"]?.meta;
        }
    },
    watch: {
        metaPage: {
          handler: "reactivePagination",
          immediate: false,
          deep: true,
        },
        categoryList: {
          handler: "reactiveTable",
          immediate: false,
          deep: true,
        },
        search: {
            handler: "reactiveSearch"
        }
    },
    async mounted() {
        if (this.$refs.categoryList) {

            this.tableCategories = new DataTable(this.$refs.categoryList, {
                searchable: false,
                fixedHeight: false,
                perPage: 5,
            });

            document.querySelector(".dataTable-bottom").remove()

            this.tableCategories.label = null;
            this.tableCategories.setMessage("Loading");

            await getCategoryList({
                sort: sortDirection,
                query: '',
                nr: getCurrentPage,
                perpage: this.tableCategories.options.perPage
            });

            this.tableCategories.on('datatable.perpage', async function (perpage) {
                this.setMessage('Loading');
                await getCategoryList({
                    sort: sortDirection,
                    query: searchQuery,
                    nr: getCurrentPage = 1,
                    perpage: perpage
                });
            });

            this.tableCategories.on('datatable.sort', async function (column, direction) {
                column = this.headings[column].title;
                direction = direction == "asc" ? "" : "-";
                await getCategoryList({
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
            await getCategoryList({
                sort: sortDirection,
                query: this.search,
                nr: page,
                perpage: this.tableCategories.options.perPage
            });
        },

        async reactiveSearch() {
            searchQuery = this.search;
            await getCategoryList({
                sort: sortDirection,
                query: this.search,
                nr: getCurrentPage = 1,
                perpage: this.tableCategories.options.perPage
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
            this.dataCategory = [];
            if (this.categoryList.length > 0) {
                this.categoryList.forEach(row => {
                    this.dataCategory.push(
                        [
                          `<h6 class="my-auto">${row.name}</h6>`,
                          row.description,
                          row.created_at,
                          this.actionEditButton(row.id, "Edit Category") + this.actionDeleteButton(row.id, "Delete Category")
                        ]
                    )
                });
                this.tableCategories.data = [];
                this.tableCategories.refresh();
                this.tableCategories.insert({ data: this.dataCategory });
                this.removeEvent();
                this.eventToCall({
                    table: this.tableCategories,
                    redirectPath: "Category Edit",
                    deletePath: "category/deleteCategory",
                    getPath: "category/categoryList",
                    textDelete: "Category deleted successfully!",
                    textDefaultData: 'categories'
                });
            }
            else {
                this.tableCategories.setMessage('No results match your search query');
            }
        }
    }
};
</script>

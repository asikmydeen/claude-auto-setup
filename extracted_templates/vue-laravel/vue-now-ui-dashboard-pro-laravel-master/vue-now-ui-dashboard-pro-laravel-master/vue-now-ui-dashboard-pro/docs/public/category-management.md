# Category management

Out of the box you will have an example of category management (for the cases in which you are developing a blog or a shop). To access this example, click the "**Examples/Category Management**" link in the left sidebar or add **/examples/category-management/list-categories** to the URL.
You can add and edit categories here, but you can only delete them if they are not attached to any items.

The store used for category functionality is found in `src\store\modules\categories-module.vue`

You can find the compoments for category functionality in `src\pages\Dashboard\Examples\CategoryManagement` folder.

```
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
      min-width="110px"
      prop="name"
      sortable="custom"
    />

    <el-table-column
      label="Description"
      min-width="130px"
      prop="description"
      sortable="custom"
    />

    <el-table-column
      label="Created At"
      prop="created_at"
      min-width="150px"
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
            @click.native="editCategory(row.id)"
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
            @click.native="deleteCategory(row.id)"
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
```

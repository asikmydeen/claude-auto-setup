# Role management

The Pro theme allows you to add user roles. By default, the theme comes with **Admin**, **Creator** and **Member** roles. To access the role management example click the "**Examples/Role Management**" link in the left sidebar or add **/examples/role-management/list-roles** to the URL. Here you can add/edit new roles.
To add a new role, click the "**Add role**" button. To edit an existing role, click the dotted menu (available on every table row) and then click "**Edit**". In both cases, you will be directed to a form which allows you to modify the name and description of a role.

The store used for role functionality is found in `src\store\modules\roles-module.vue`

You can find the compoments for role functionality in `src\pages\Dashboard\Examples\RoleManagement` folder.


### List page

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
      v-for="column in tableColumns"
      :key="column.label"
      :min-width="column.minWidth"
      :prop="column.prop"
      :label="column.label"
      sortable="custom"
    >
    </el-table-column>
    <el-table-column :min-width="135" fixed="right" label="Actions">
      <div
        slot-scope="{ row }"
        class="table-actions"
        style="margin-left: 10px"
      >
        <el-tooltip content="Edit" :open-delay="300" placement="top">
          <n-button
            @click.native="editRole(row.id)"
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
            @click.native="deleteRole(row.id)"
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

### Add/edit role

```
<div class="card-body">
  <form ref="profile_form" @submit.prevent="handleSubmit">
    <label>Name</label>
    <fg-input
      addon-left-icon="now-ui-icons users_circle-08"
      v-model="role.name"
      :error="apiValidationErrors.name"
    />

    <div class="my-4">
      <n-button
        type="button"
        class="btn btn-sm btn-primary"
        native-type="submit"
      >
        Update Role
      </n-button>
    </div>
  </form>
</div>
```

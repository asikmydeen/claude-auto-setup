# User management

The theme comes with an out of the box user management option. To access this option ,click the "**Examples/User Management**" link in the left sidebar or add **/examples/user-management/list-users** to the URL.
The first thing you will see is a list of existing users. You can add new ones by clicking the "**Add user**" button (above the table on the right). On the Add user page, you will find a form which allows you to fill out the user`s name, email, role and password.

The store used for role functionality is found in `src\store\modules\users-module.vue`

You can find the compoments for role functionality in `src\pages\Dashboard\Examples\UserManagement` folder.

Once you add more users, the list will grow and for every user you will have edit and delete options (access these options by clicking the three dotted menu that appears at the end of every row).

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
    <el-table-column label="Author" max-width="100px">
      <template v-slot="{ row }">
        <img
          v-if="row.profile_image"
          :src="row.profile_image"
          class="avatar rounded-circle mr-3"
        />
      </template>
    </el-table-column>

    <el-table-column
      label="Name"
      min-width="110px"
      prop="name"
      sortable="custom"
    />

    <el-table-column
      label="Email"
      min-width="120px"
      prop="email"
      sortable="custom"
    />

    <el-table-column
      label="Role"
      min-width="120px"
      prop="roles.name"
      sortable="custom"
    >
      <template v-slot="{ row }">
        <span>{{ row.roles[0].name }}</span>
      </template>
    </el-table-column>

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
            @click.native="editUser(row.id)"
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
            @click.native="deleteUser(row.id)"
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

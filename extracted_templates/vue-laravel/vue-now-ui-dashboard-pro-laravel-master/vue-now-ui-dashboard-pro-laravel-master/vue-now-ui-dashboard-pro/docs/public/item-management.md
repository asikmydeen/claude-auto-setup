# Item management

Item management is the most advanced example included in the Pro theme, because every item has a picture, belongs to a category and has multiple tags. To access this example click the "**Examples/Item Management**" link in the left sidebar or add **/examples/item-management/list-items** to the URL.
Here you can manage the items. A list of items will appear once you start adding them (to access the add page click "**Add item**").
On the add page, besides the Name and Description fields (which are present in most of the CRUD examples) you can see a category dropdown, which contains the categories you added, a file input and a tag multi select. If you did not add any categories or tags, please go to the corresponding sections (category management, tag management) and add some.

The store used for roles functionality is found in `src\store\modules\items-module.vue`

You can find the compoments for items functionality in `src\pages\Dashboard\Examples\ItemManagement` folder.

### List Items

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
```

### Add/Edit Item

```
<div class="card-body">
  <form ref="profile_form" @submit.prevent="handleSubmit">
    <div class="form-group">
      <label class="form-control-label"> Picture </label>
      <div v-if="image" class="profile-image card-img pb-4">
        <img :src="`${image}`" class="profile-image now-ui-image" />
      </div>
      <div v-else class="profile-image">
        <img src="/img/placeholder.jpg" class="now-ui-image" />
      </div>
      <div class="image-upload">
        <n-button
          v-if="image"
          type="button"
          class="btn btn-sm btn-danger"
          @click.native="removeImage"
        >
          <i slot="label" class="now-ui-icons ui-1_simple-remove"></i>
          Remove
        </n-button>

        <n-button type="button" class="btn btn-sm btn-primary">
          <label
            v-if="!image"
            class="mb-0"
            style="color: white"
            >Select image</label
          >
          <label
            v-else
            class="mb-0"
            style="color: white"
            >Change</label
          >
          <input
            id="imageInput"
            ref="imageInput"
            accept="image/*"
            type="file"
            style="display: none"
            @input="onSelectFile"
          />
        </n-button>
      </div>
    </div>
    <validation-error :error="apiValidationErrors.attachment" />

    <label>Name</label>
    <fg-input
      v-model="item.name"
      name="name"
      addon-left-icon="now-ui-icons users_circle-08"
      :error="apiValidationErrors.name"
    />

    <div class="md-layout spacing">
      <label class="md-layout-item md-size-25 md-form-label">
        Description
      </label>
      <div class="md-layout-item">
        <ckeditor
          :editor="editor"
          v-model="item.description"
          :config="editorConfig"
        />
      </div>
    </div>
    <validation-error :error="apiValidationErrors.excerpt" />

    <label style="display: flex">Category</label>
    <el-select
      name="category"
      v-model="item.category.id"
      prepend-icon="fas fa-user"
      placeholder="Select..."
      style="display: flex"
    >
      <el-option
        v-for="single_category in all_categories"
        :key="single_category.id"
        :value="single_category.id"
        :label="single_category.name"
      >
      </el-option>
    </el-select>

    <label>Tags</label>
    <el-select
      v-model="tags"
      multiple
      placeholder="Select..."
      style="display: flex"
    >
      <el-option
        v-for="single_tag in all_tags"
        :key="single_tag.id"
        :value="single_tag.id"
        :label="single_tag.name"
      >
      </el-option>
    </el-select>

    <fg-input label="Status" class="mt-2">
      <radio label="published" v-model="item.status" class="mb-3">
        Published
      </radio>
      <radio label="draft" v-model="item.status" class="mb-3">
        Draft
      </radio>
      <radio label="archive" v-model="item.status" class="mb-3">
        Archive
      </radio>
    </fg-input>

    <label style="display: flex">Show on homepage?</label>
    <n-switch class="mt-2" v-model="item.is_on_homepage"></n-switch>

    <fg-input label="Date" class="mt-2">
      <el-date-picker
        type="date"
        placeholder="Date Picker"
        v-model="item.date_at"
      >
      </el-date-picker
    ></fg-input>

    <validation-error :error="apiValidationErrors.date_at" />

    <div class="my-4">
      <n-button
        type="button"
        class="btn btn-sm btn-primary"
        native-type="submit"
      >
        Update Item
      </n-button>
    </div>
  </form>
</div>
```

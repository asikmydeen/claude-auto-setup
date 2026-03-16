# Pagination

We took the Bootstrap pagination elements and customised them to fit the overall theme.
Besides the classic look, we also added the colour classes to offer more customisation.

<hr>

To use the custom radio buttons you need to import the custom made component:

```js
import {Pagination} from 'src/components'
```

Global usage

```js
Vue.component(Pagination.name, Pagination)
```

For local usage
```js
export default {
  components: {
    [Pagination.name]: Pagination
  }
}
```

## Simple pagination with v-model

```html
/*vue*/
<desc>
</desc>
<template>
   <n-pagination :page-count="10" v-model="defaultPagination"></n-pagination>
</template>

<script>
  export default {
    data () {
        return {
          defaultPagination: 1
        }
      }
  }
</script>
```

## Colors


```html
/*vue*/
<desc>
</desc>
<template>
<div>
  <n-pagination type="danger" :page-count="10" v-model="defaultPagination"></n-pagination>
  <n-pagination type="success" :page-count="10" v-model="defaultPagination"></n-pagination>
  <n-pagination type="info" :page-count="10" v-model="defaultPagination"></n-pagination>
  <n-pagination type="warning" :page-count="10" v-model="defaultPagination"></n-pagination>
</div>
</template>

<script>
  export default {
    data () {
        return {
          defaultPagination: 1
        }
      }
  }
</script>
```

### Attributes
| Attribute      | Description    | Type      | Accepted values       | Default   |
|---------- |-------- |---------- |-------------  |-------- |
| type     | Pagination type (active color)  | string  |   /primary/danger/success/warning/info/        |     —     |
| pageCount     | Number of pages  | number  |      any number > 0        |     0     |
| perPage     | Number of items per page. To be used with **total** prop.  | number  |      any number > 0        |     10     |
| total     | Total number of items. This number is used to calculate pageCount if not specified | number  |      any number > 0        |     0     |
| value     | part of the v-model | number  |      any number > 0        |     1     |

### Events
| Event Name | Description | Parameters |
|---------- |-------- |---------- |
| input  | triggers when the binding value changes (default for v-model) | the updated value |

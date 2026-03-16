# Switch

<hr>

To use the switch component, first import it:

```js
import {Switch} from 'src/components'
```

Global usage

```js
Vue.component(Switch.name, Switch)
```

For local usage
```js
export default {
  components: {
    [Switch.name]: Switch
  }
}
```

## Simple switch

```html
/*vue*/
<desc>
</desc>
<template>
  <div>
    <n-switch v-model="switches.defaultOn"></n-switch>
    <n-switch v-model="switches.defaultOff"></n-switch>
  </div>
</template>

<script>
  export default {
    data () {
        return {
           switches: {
             defaultOn: true,
             defaultOff: false
           }
        }
      }
  }
</script>
```
## With text

```html
/*vue*/
<desc>
</desc>
<template>
  <div>
    <n-switch v-model="switches.defaultOn" on-text="ON" off-text="OFF"></n-switch>
    <n-switch v-model="switches.defaultOff" on-text="ON" off-text="OFF"></n-switch>
  </div>
</template>

<script>
  export default {
    data () {
        return {
           switches: {
             defaultOn: true,
             defaultOff: false
           }
        }
      }
  }
</script>
```

### Slots
```html
/*vue*/
<desc>
</desc>
<template>
  <div>
  <n-switch v-model="switches.defaultOn">
    <i class="fa fa-check" slot="on"></i>
    <i class="fa fa-exclamation" style="color:red;" slot="off"></i>
  </n-switch>
  </div>
</template>

<script>
  export default {
    data () {
        return {
           switches: {
             defaultOn: true
           }
        }
      }
  }
</script>
```


### Attributes
| Attribute      | Description    | Type      | Accepted values       | Default   |
|---------- |-------- |---------- |-------------  |-------- |
| value     | switch value   | boolean  |       false        |     —     |
| onText     | text when switch is on  | string  |       -        |     -     |
| offText     | text when switch is off  | string  |       -        |     -     |
| color     | switch color (on mode)  | string  | blue/azure/green/orange/red/purple/black |     -     |

### Events
| Event Name | Description | Parameters |
|---------- |-------- |---------- |
| input  | triggers when the binding value changes | the updated value |

### Slots
| Name | Description |
|---------- |-------- |
|  on  | Content to be displayed on switch when switch is on |
|  off  | Content to be displayed on switch when switch is off |

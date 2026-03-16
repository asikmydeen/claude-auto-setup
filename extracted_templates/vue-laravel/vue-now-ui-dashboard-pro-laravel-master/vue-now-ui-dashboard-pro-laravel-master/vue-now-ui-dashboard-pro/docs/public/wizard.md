# Wizard
If you have lengthy forms to complete, you can use the a Wizard.
We build a simplified wizard version inspired by [Vue Form Wizard](https://github.com/cristijora/vue-form-wizard).
This plugin allows you to cut the form into steps and let the user complete it gradually.
You can find the wizard components inside `src/components/Wizard` folder and see it's implementation.

In order to use the wizard, import the wizard 

```js
import {SimpleWizard, WizardTab} from 'src/components'
```
Global usage
```js
Vue.component(SimpleWizard)
Vue.component(WizardTab)
```

Local usage
```js
export default {
  components: {
    SimpleWizard,
    WizardTab
  }
}
```

### Basic example
```html
/*vue*/
<desc>
</desc>
<template>
<simple-wizard>
  <template slot="header">
    <h3 class="card-title">Build your profile</h3>
  </template>

  <wizard-tab>
    <template slot="label">
      <i class="now-ui-icons users_circle-08"></i>
      About
    </template>
    <div>First step content</div>
  </wizard-tab>

  <wizard-tab>
    <template slot="label" >
      <i class="now-ui-icons ui-1_settings-gear-63"></i>
      Account
    </template>
    <div>Second step content</div>
  </wizard-tab>

  <wizard-tab>
    <template slot="label">
      <i class="now-ui-icons ui-1_email-85"></i>
      Address
    </template>
        <div>Third step content</div>
  </wizard-tab>
</simple-wizard>
  
</template>

<script>
  export default {}
</script>
```

## Wizard inside modal


```html
/*vue*/
<desc>
</desc>
<template>
    <div>
      <n-button type="primary" @click.native="modals.classic = true">
        Wizard inside modal
      </n-button>
      <modal :show.sync="modals.classic"
             :show-header="false"
             modal-classes="modal-lg"
             body-classes="p-0"
             header-classes="justify-content-center">
        <simple-wizard class="mb-0">
          <template slot="header">
            <h3 class="card-title">Build your profile</h3>
          </template>
        
          <wizard-tab>
            <template slot="label">
              <i class="now-ui-icons users_circle-08"></i>
              About
            </template>
            <div>First step content</div>
          </wizard-tab>
        
          <wizard-tab>
            <template slot="label" >
              <i class="now-ui-icons ui-1_settings-gear-63"></i>
              Account
            </template>
            <div>Second step content</div>
          </wizard-tab>
        
          <wizard-tab>
            <template slot="label">
              <i class="now-ui-icons ui-1_email-85"></i>
              Address
            </template>
                <div>Third step content</div>
          </wizard-tab>
        </simple-wizard>
      </modal>
    </div>
</template>

<script>
    export default {
      data(){
        return {
          modals: {
            classic: false
          }
        }
      }
    }
</script>
```

For a complete example, please check out `src/pages/Dashboard/Forms/Wizard.vue` component 

### Wizard Attributes
| Attribute      | Description    | Type      | Accepted values       | Default   |
|---------- |-------- |---------- |-------------  |-------- |
| startIndex     | The tab index wizard should start from   | number  |   number > 0        |     0     |
| title     | Wizard title   | string  |   -        |     title     |
| subTitle     | Wizard subtitle (displayed below title with smaller font)  | string  |      -        |     Subtitle     |
| prevButtonText     | Previous button text | string  |      -        |     Previous     |
| nextButtonText     | Next button text | string  |      -        |     Next     |
| finishButtonText     | Finish button text | string  |      -        |     Finish     |

### Wizard Slots
| Name | Description |
|---------- |-------- |
|  default  | Default content slot |
|  header  | Slot for header (above tabs containing title and subTitle) |
|  footer (scoped slot)  | Content for wizard footer (containing prev, next and finish buttons) |

### Wizard Events
| Event Name | Description | Parameters |
|---------- |-------- |---------- |
| tab-change  | triggered whenever a transition to another tab occurs | oldTab and newTab objects |


### Wizard Tab Attributes
| Attribute      | Description    | Type      | Accepted values       | Default   |
|---------- |-------- |---------- |-------------  |-------- |
| label     | Tab label (text) identifier   | string  |   -        |     —     |
| id     | Tab pane id | string  |      -        |     -     |
| beforeChange (Function that can return a Promise or a boolean)     | Function to be triggered before navigation to next tab | Function  |      -        |     -     |

!> **Note** You can use the `beforeChange` function on each wizard tab to trigger a validation method before navigation to the next step.
`beforeChange` should either return a `boolean` or a `Promise` than resolves with `true`. 
Returning a `falsy` value or rejected promise, will fail the validation and will not go to next step.
If you don't provide a `beforeChange` method, the wizard will always navigate to next step upon "Next" button click

### Wizard Tab Slots
| Name | Description |
|---------- |-------- |
|  default  | Wizard tab default content |
|  label  | This will not be displayed inside the pane itself but rather in the upper navigation |

!> **Note** Since the source code of these components is inside the template itself, feel free to modify and adjust them
according to your needs. They should work for most of the use-cases but they cannot cover absolutely everything :)

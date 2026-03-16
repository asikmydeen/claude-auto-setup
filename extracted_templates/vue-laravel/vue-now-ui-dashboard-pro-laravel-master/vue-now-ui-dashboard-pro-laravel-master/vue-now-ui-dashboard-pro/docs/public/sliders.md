# Sliders

<hr>

We restyled [noUI Slider](https://refreshless.com/nouislider/) and gave it a fresh look.
We have a small Vue wrapper over it which makes it very easy to use it. 

To use it, import it from the components folder

```js
import {Slider} from 'src/components'
```

Global usage

```js
Vue.use(Slider)
```

For local usage
```js
export default {
  components: {
    Slider
  }
}
```

### Simple slider with v-model
```html
/*vue*/
<desc>
You can specify one of the known types to customize the look and feel of the slider.
Type can be `default|primary|info|danger|warning`
</desc>
<template>
  <slider v-model="sliderValue">
  </slider>
</template>

<script>
  export default {
    data() {
      return {
        sliderValue: 30
       }
    }
  }
</script>
```

### Range slider

```html
/*vue*/
<desc>
</desc>
<template>
  <slider v-model="rangeSlider"
          type="primary"
          :connect="true">
  </slider>
</template>

<script>
  export default {
    data() {
      return {
        rangeSlider: [20, 50]
       }
    }
  }
</script>
```

### With stops

```html
/*vue*/
<desc>
</desc>
<template>
  <slider v-model="sliderValue" 
            type="success"
            :options="{step: 10}"
            >
  </slider>
</template>

<script>
  export default {
    data() {
      return {
        sliderValue: 30
       }
    }
  }
</script>
```

### Disabled

```html
/*vue*/
<desc>
</desc>
<template>
  <slider v-model="sliderValue" 
            type="warning"
            disabled>
  </slider>
</template>

<script>
  export default {
    data() {
      return {
        sliderValue: 30
       }
    }
  }
</script>
```

### Attributes
| Attribute      | Description    | Type      | Accepted values       | Default   |
|---------- |-------- |---------- |-------------  |-------- |
| value     | slider value   | string|number|array  |       -        |     -     |
| disabled     | whether the slider is disabled   | boolean |       true/false        |     false     |
| start     | [noUi Slider start](https://refreshless.com/nouislider/slider-options/#section-start)   | number/array |       -        |     0     |
| connect     | [noUi Slider connect](https://refreshless.com/nouislider/slider-options/#section-connect)   | boolean/array |       -        |     [true, false]     |
| range     | [noUi Slider range](https://refreshless.com/nouislider/slider-values/#section-range)   | object |       -        |     {min: 0, max: 100}     |
| type     |  slider type (color)   | string |       primary/info/success/danger/warning        |     -     |
| options     | [noUi Slider options](https://refreshless.com/nouislider/slider-options/). | object |       -        |     -     |

!> **Note** You can pass any [noUi Slider options](https://refreshless.com/nouislider/slider-options/) via the `options` prop. 
They might overwrite `start`, `connect` and `range` props if specified in the options object.

For example, in this case: 
```html
<slider :range="{min: 10, max: 50}" :options="{range: {min: 20, max: 40}}"
``` 
The options object will overwrite the `range` prop in this case.

### Events
| Event Name | Description | Parameters |
|---------- |-------- |---------- |
| input  | triggers when the binding value changes | the updated value |

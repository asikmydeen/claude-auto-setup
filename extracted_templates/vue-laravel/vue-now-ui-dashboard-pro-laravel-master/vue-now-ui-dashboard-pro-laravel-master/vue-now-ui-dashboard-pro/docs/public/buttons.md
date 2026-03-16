# Buttons

<hr>
To use the custom button you need to import the custom made component:

```js
import {Button} from 'src/components'
```

Global usage

```js
Vue.component(Button.name, Button)
```

For local usage
```js
export default {
  components: {
    [Button.name]: Button
  }
}
```

## Colors

Now UI Dashboard has changed the predefined button styles from Bootstrap, each serving its own semantic purpose, with a few extras thrown in for more control.
```html
/*vue*/
<desc>
</desc>
<template>
    <div>
       <n-button type="default">Default</n-button>
       <n-button type="primary">Primary</n-button>
       <n-button type="info">Info</n-button>
       <n-button type="success">Success</n-button>
       <n-button type="warning">Warning</n-button>
       <n-button type="danger">Danger</n-button>
       <n-button type="neutral">Neutral</n-button>
    </div>
</template>

<script>
    export default {}
</script>
```

## Style buttons
```html
/*vue*/
<desc>
</desc>
<template>
    <div>
       <n-button type="primary">Default</n-button>
       <n-button type="primary" round>Round</n-button>
       <n-button type="primary" round>
        <i class="now-ui-icons ui-2_favourite-28"></i> With Icon
      </n-button>
      <n-button type="primary" round icon>
        <i class="now-ui-icons ui-2_favourite-28"></i>
      </n-button>
      <n-button type="neutral">Neutral</n-button>
    </div>
</template>

<script>
    export default {}
</script>
```

## Sizes

Fancy larger or smaller buttons? Add `size="lg"` or `size="sm"` for additional sizes.

```html
/*vue*/
<desc>
</desc>
<template>
    <div>
       <n-button type="primary" size="lg">Large</n-button>
       <n-button type="primary" >Normal</n-button>
       <n-button type="primary" size="sm">Small</n-button>
    </div>
</template>

<script>
    export default {}
</script>
```

## Extra mile
We added extra classes mapped directly to props that can help you better customise the look. You can use regular buttons, filled buttons, right-pulled buttons, buttons that span over the entire given space or plain simple link like buttons. Let's see some examples:

```html
/*vue*/
<desc>
</desc>
<template>
    <div>
      <n-button type="primary" simple>Simple</n-button>
      <n-button type="primary" wide>Wide</n-button>
      <n-button type="success" block>Block</n-button>
    </div>
</template>

<script>
    export default {}
</script>
```

## Social buttons

```html
/*vue*/
<desc>
</desc>
<template>
 <div class="card-body">
   <div class="row">
     <div class="col-md-4 col-sm-5">
       <p class="category">
         Default
       </p>
       <n-button class="btn-twitter">
         <i class="fa fa-twitter"></i> Connect with Twitter
       </n-button>
       <br>
       <n-button class="btn-facebook">
         <i class="fa fa-facebook-square"></i> Share · 2.2k
       </n-button>
       <br>
       <n-button class="btn-google">
         <i class="fa fa-google-plus-square"></i> Share on Google+
       </n-button>
       <br>
       <n-button class="btn-linkedin">
         <i class="fa fa-linkedin-square"></i> Connect with Linkedin
       </n-button>
       <br>
       <n-button class="btn-pinterest">
         <i class="fa fa-pinterest"></i> Pint it · 212
       </n-button>
       <br>
       <n-button class="btn-youtube">
         <i class="fa fa-youtube-play"></i> View on Youtube
       </n-button>
       <br>
       <n-button class="btn-tumblr">
         <i class="fa fa-tumblr-square"></i> Repost
       </n-button>
       <br>
       <n-button class="btn-github">
         <i class="fa fa-github"></i> Connect with Github
       </n-button>
       <br>
       <n-button class="btn-behance">
         <i class="fa fa-behance-square"></i> Follow us
       </n-button>
       <br>
       <n-button class="btn-dribbble">
         <i class="fa fa-dribbble"></i> Find us on Dribbble
       </n-button>
       <br>
       <n-button class="btn-reddit">
         <i class="fa fa-reddit"></i> Repost · 232
       </n-button>
       <br>
       <n-button class="btn-stumbleupon">
         <i class="fa fa-stumbleupon"></i> View on StumbleUpon
       </n-button>
       <br>
     </div>

     <div class="col-md-1 col-sm-1">
       <n-button class="btn-twitter" social icon>
         <i class="fa fa-twitter"></i>
       </n-button>
       <br>
       <n-button class="btn-facebook" social icon>
         <i class="fa fa-facebook"> </i>
       </n-button>
       <br>
       <n-button class="btn-google" social icon>
         <i class="fa fa-google-plus"> </i>
       </n-button>
       <br>
       <n-button class="btn-linkedin" social icon>
         <i class="fa fa-linkedin"></i>
       </n-button>
       <br>
       <n-button class="btn-pinterest" social icon>
         <i class="fa fa-pinterest"></i>
       </n-button>
       <br>
       <n-button class="btn-youtube" social icon>
         <i class="fa fa-youtube"> </i>
       </n-button>
       <br>
       <n-button class="btn-tumblr" social icon>
         <i class="fa fa-tumblr"> </i>
       </n-button>
       <br>
       <n-button class="btn-github" social icon>
         <i class="fa fa-github"></i>
       </n-button>
       <br>
       <n-button class="btn-behance" social icon>
         <i class="fa fa-behance"></i>
       </n-button>
       <br>
       <n-button class="btn-dribbble" social icon>
         <i class="fa fa-dribbble"></i>
       </n-button>
       <br>
       <n-button class="btn-reddit" social icon>
         <i class="fa fa-reddit"></i>
       </n-button>
       <br>
       <n-button class="btn-stumbleupon" social icon>
         <i class="fa fa-stumbleupon"></i>
       </n-button>
       <br>
     </div>
     <div class="col-md-1 col-sm-1">

       <n-button class="btn-twitter" social icon round>
         <i class="fa fa-twitter"></i>
       </n-button>
       <br>
       <n-button class="btn-facebook" social icon round>
         <i class="fa fa-facebook"> </i>
       </n-button>
       <br>
       <n-button class="btn-google" social icon round>
         <i class="fa fa-google-plus"> </i>
       </n-button>
       <br>
       <n-button class="btn-linkedin" social icon round>
         <i class="fa fa-linkedin"></i>
       </n-button>
       <br>
       <n-button class="btn-pinterest" social icon round>
         <i class="fa fa-pinterest"></i>
       </n-button>
       <br>
       <n-button class="btn-youtube" social icon round>
         <i class="fa fa-youtube"> </i>
       </n-button>
       <br>
       <n-button class="btn-tumblr" social icon round>
         <i class="fa fa-tumblr"> </i>
       </n-button>
       <br>
       <n-button class="btn-github" social icon round>
         <i class="fa fa-github"></i>
       </n-button>
       <br>
       <n-button class="btn-behance" social icon round>
         <i class="fa fa-behance"></i>
       </n-button>
       <br>
       <n-button class="btn-dribbble" social icon round>
         <i class="fa fa-dribbble"></i>
       </n-button>
       <br>
       <n-button class="btn-reddit" social icon round>
         <i class="fa fa-reddit"></i>
       </n-button>
       <br>
       <n-button class="btn-stumbleupon" social icon round>
         <i class="fa fa-stumbleupon"></i>
       </n-button>
       <br>

     </div>
     <div class="col-md-1 col-sm-1">

       <n-button class="btn-twitter" type="neutral" social>
         <i class="fa fa-twitter"></i>
       </n-button>
       <br>
       <n-button class="btn-facebook" type="neutral" social>
         <i class="fa fa-facebook"> </i>
       </n-button>
       <br>
       <n-button class="btn-google" type="neutral" social>
         <i class="fa fa-google-plus"> </i>
       </n-button>
       <br>
       <n-button class="btn-linkedin" type="neutral" social>
         <i class="fa fa-linkedin"></i>
       </n-button>
       <br>
       <n-button class="btn-pinterest" type="neutral" social>
         <i class="fa fa-pinterest"></i>
       </n-button>
       <br>
       <n-button class="btn-youtube" type="neutral" social>
         <i class="fa fa-youtube"> </i>
       </n-button>
       <br>
       <n-button class="btn-tumblr" type="neutral" social>
         <i class="fa fa-tumblr"> </i>
       </n-button>
       <br>
       <n-button class="btn-github" type="neutral" social>
         <i class="fa fa-github"></i>
       </n-button>
       <br>
       <n-button class="btn-behance" type="neutral" social>
         <i class="fa fa-behance"></i>
       </n-button>
       <br>
       <n-button class="btn-dribbble" type="neutral" social>
         <i class="fa fa-dribbble"></i>
       </n-button>
       <br>
       <n-button class="btn-reddit" type="neutral" social>
         <i class="fa fa-reddit"></i>
       </n-button>
       <br>
       <n-button class="btn-stumbleupon" type="neutral" social>
         <i class="fa fa-stumbleupon"></i>
       </n-button>
       <br>

     </div>
     <div class="col-md-3 col-sm-4">

       <p class="category">
         Default
       </p>
       <n-button class="btn-twitter" type="neutral">
         <i class="fa fa-twitter"></i> Connect with Twitter
       </n-button>
       <br>
       <n-button class="btn-facebook" type="neutral">
         <i class="fa fa-facebook-square"></i> Share · 2.2k
       </n-button>
       <br>
       <n-button class="btn-google" type="neutral">
         <i class="fa fa-google-plus-square"></i> Share on Google+
       </n-button>
       <br>
       <n-button class="btn-linkedin" type="neutral">
         <i class="fa fa-linkedin-square"></i> Connect with Linkedin
       </n-button>
       <br>
       <n-button class="btn-pinterest" type="neutral">
         <i class="fa fa-pinterest"></i> Pint it · 212
       </n-button>
       <br>
       <n-button class="btn-youtube" type="neutral">
         <i class="fa fa-youtube-play"></i> View on Youtube
       </n-button>
       <br>
       <n-button class="btn-tumblr" type="neutral">
         <i class="fa fa-tumblr-square"></i> Repost
       </n-button>
       <br>
       <n-button class="btn-github" type="neutral">
         <i class="fa fa-github"></i> Connect with Github
       </n-button>
       <br>
       <n-button class="btn-behance" type="neutral">
         <i class="fa fa-behance-square"></i> Follow us
       </n-button>
       <br>
       <n-button class="btn-dribbble" type="neutral">
         <i class="fa fa-dribbble"></i> Find us on Dribbble
       </n-button>
       <br>
       <n-button class="btn-reddit" type="neutral">
         <i class="fa fa-reddit"></i> Repost · 232
       </n-button>
       <br>
       <n-button class="btn-stumbleupon" type="neutral">
         <i class="fa fa-stumbleupon"></i> View on StumbleUpon
       </n-button>
       <br>

     </div>
   </div>
 </div>
</template>

<script>
    export default {}
</script>
```

### Attributes
| Attribute      | Description    | Type      | Accepted values       | Default   |
|---------- |-------- |---------- |-------------  |-------- |
| type     | button color type   | string  |       default/primary/danger/success/info/warning        |     default     |
| tag     | tag to render   | string  |       any valid html tag        |     button     |
| nativeType     | native type of the button   | string  |       html button type attribute        |     button     |
| round     | Whether the button is round   | boolean  |       true/false        |     false     |
| simple     | Whether the button is simple   | boolean  |       true/false        |     false     |
| block     | Whether the button is block   | boolean  |       true/false        |     false     |
| social     | Whether the button is social button   | boolean  |       true/false        |     false     |
| icon     | Whether the button is an icon button   | boolean  |       true/false        |     false     |
| wide     | Whether the button is wide   | boolean  |       true/false        |     false     |
| size     | Size of the button   | string  |       sm/lg        |     -     |

### Slots
| Name | Description |
|---------- |-------- |
|  default  | Button content |
|  label  | Label on the left (usually icons) |
|  labelRight  | Label on the right (usually icons) |

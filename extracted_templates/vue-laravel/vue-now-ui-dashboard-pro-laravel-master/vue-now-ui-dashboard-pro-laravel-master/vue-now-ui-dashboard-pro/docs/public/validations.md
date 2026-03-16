# Validations

In order to validate fields, we used one of the most popular validations libraries for vue -  [Vee-Validate](http://vee-validate.logaretm.com/)
It has good documentation and it's pretty easy to use.

## Usage

```js
import { ValidationProvider } from "vee-validate";
import { ValidationObserver } from "vee-validate";

Vue.component("ValidationProvider", ValidationProvider);
Vue.component("ValidationObserver", ValidationObserver);
```
For detailed usage please see [Vee Validate documentation](http://vee-validate.logaretm.com/index.html#installation)
We will go through the code from the **LoginForm.vue** from **Validation Forms** to understand how validations work.

Here is the full template for that specific component.
```html
<ValidationObserver v-slot="{ handleSubmit }">
  <form @submit.prevent="handleSubmit(submit)">
    <card>
      <div slot="header">
        <h4 class="card-title">
          Login Form
        </h4>
      </div>
      <div>
        <ValidationProvider
          name="full name"
          rules="required"
          v-slot="{ passed, failed }"
        >
          <fg-input
            type="text"
            :error="failed ? 'The full name field is required' : null"
            :hasSuccess="passed"
            label="Full Name"
            name="full name"
            v-model="fullName"
          >
          </fg-input>
        </ValidationProvider>

        <ValidationProvider
          name="email"
          rules="required|email"
          v-slot="{ passed, failed }"
        >
          <fg-input
            type="email"
            :error="failed ? 'The Email field is required' : null"
            :hasSuccess="passed"
            label="Email address"
            name="email"
            v-model="email"
          >
          </fg-input>
        </ValidationProvider>

        <ValidationProvider
          name="password"
          rules="required|min:5"
          v-slot="{ passed, failed }"
        >
          <fg-input
            type="password"
            :error="failed ? 'The Password field is required' : null"
            :hasSuccess="passed"
            name="password"
            label="Password"
            v-model="password"
          >
          </fg-input>
        </ValidationProvider>
      </div>
      <div class="d-flex justify-content-center">
        <n-button native-type="submit" type="primary">Login</n-button>
      </div>
    </card>
  </form>
</ValidationObserver>
```

The javascript for this template is the following

```js
import { extend } from "vee-validate";
import { required, email, min } from "vee-validate/dist/rules";

extend("email", email);
extend("required", required);
extend("min", min);

export default {
  data() {
    return {
      email: "",
      password: "",
      fullName: ""
    };
  },
  methods: {
    submit() {
      alert("Form has been submitted!");
    }
  }
};
```

You can check out [available validations](http://vee-validate.logaretm.com/index.html#available-rules) from vee-validate.


You can check more examples inside **src/pages/Dashboard/Forms/ValidationForms/**
There are some forms which have validations declared in a similar way

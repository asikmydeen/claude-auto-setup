<template>
  <Form ref="form" @submit="validate" :validation-schema="schema">
    <h5 class="info-text">
      Let's start with the basic information (with validation)
    </h5>
    <div class="row justify-content-center">
      <div class="col-sm-4">
        <div class="picture-container">
          <el-upload
            class="picture"
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-change="handlePreview"
            :auto-upload="false"
            :show-file-list="false"
          >
            <img v-if="imageUrl" :src="imageUrl" class="picture-src" />
          </el-upload>
          <h6 class="description">Choose Picture</h6>
        </div>
      </div>
      <div class="col-sm-6">
        <vee-input
          name="firstName"
          type="text"
          placeholder="First Name"
          addon-left-icon="now-ui-icons users_circle-08"
        />

        <vee-input
          name="lastName"
          placeholder="Last Name"
          type="text"
          addon-left-icon="now-ui-icons text_caps-small"
        />
      </div>
      <div class="col-12 col-sm-10 mt-3">
        <vee-input
          name="email"
          type="text"
          placeholder="Email (required)"
          addon-left-icon="now-ui-icons text_caps-small"
        />
      </div>
    </div>
  </Form>
</template>
<script>
import { ElUpload } from "element-plus";
import { VeeInput } from "@/components";
import { Form } from "vee-validate";
import * as Yup from "yup";

export default {
  components: {
    [ElUpload.name]: ElUpload,
    Form,
    VeeInput,
  },
  data() {
    const schema = Yup.object().shape({
      firstName: Yup.string().required().label("The First Name"),
      email: Yup.string().email().required().label("The Email"),
      lastName: Yup.string().required().label("The Last Name"),
    });

    return {
      imageUrl: "img/default-avatar.png",
      schema,
    };
  },
  methods: {
    handlePreview(file) {
      this.model.imageUrl = URL.createObjectURL(file.raw);
    },
    validate() {
      return this.$refs.form.validate().then((res) => {
        this.$emit("on-validated", res);
        return res;
      });
    },
  },
};
</script>
<style></style>

<template>
  <div class="py-4 container-fluid">
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-body">
            <h5 class="mb-4">Product Details</h5>
            <div class="row">
              <div class="col-xl-5 col-lg-6 text-center">
                <img
                  class="w-100 border-radius-lg shadow-lg mx-auto"
                  src="../../../assets/img/products/product-details-1.jpg"
                  alt="chair"
                />
                <div
                  id="product-gallery"
                  class="pt-2 mt-4 my-gallery d-flex gap-4"
                >
                  <a
                    v-for="(image, key) in images"
                    :key="key"
                    :href="image.largeURL"
                    :data-pswp-width="image.width"
                    :data-pswp-height="image.height"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img
                      :src="image.thumbnailURL"
                      alt=""
                      class="shadow w-100 min-height-100 max-height-100 border-radius-lg"
                    />
                  </a>
                </div>
              </div>
              <div class="mx-auto col-lg-5">
                <h3 class="mt-4 mt-lg-0">Minimal Bar Stool</h3>
                <div class="rating">
                  <i class="material-icons text-lg">grade</i>
                  <i class="material-icons text-lg">grade</i>
                  <i class="material-icons text-lg">grade</i>
                  <i class="material-icons text-lg">grade</i>
                  <i class="material-icons text-lg">star_outline</i>
                </div>
                <br />
                <h6 class="mt-3 mb-0">Price</h6>
                <h5>$1,419</h5>
                <span class="badge badge-success">In Stock</span>
                <br />
                <label class="mt-4">Description</label>
                <ul>
                  <li>
                    The most beautiful curves of this swivel stool adds an
                    elegant touch to any environment
                  </li>
                  <li>Memory swivel seat returns to original seat position</li>
                  <li>
                    Comfortable integrated layered chair seat cushion design
                  </li>
                  <li>Fully assembled! No assembly required</li>
                </ul>
                <div class="mt-4 row">
                  <div class="mt-2 col-lg-5 mt-lg-0">
                    <label>Frame Material</label>
                    <select
                      id="choices-material"
                      class="form-control"
                      name="choices-material"
                    >
                      <option value="Choice 1" selected>Wood</option>
                      <option value="Choice 2">Steel</option>
                      <option value="Choice 3">Aluminium</option>
                      <option value="Choice 4">Carbon</option>
                    </select>
                  </div>
                  <div class="mt-2 col-lg-5 mt-lg-0">
                    <label>Color</label>
                    <select
                      id="choices-colors"
                      class="form-control"
                      name="choices-colors"
                    >
                      <option value="Choice 1" selected>White</option>
                      <option value="Choice 2">Gray</option>
                      <option value="Choice 3">Black</option>
                      <option value="Choice 4">Blue</option>
                      <option value="Choice 5">Red</option>
                      <option value="Choice 6">Pink</option>
                    </select>
                  </div>
                  <div class="col-lg-2">
                    <label>Quantity</label>
                    <select
                      id="choices-quantity"
                      class="form-control"
                      name="choices-quantity"
                    >
                      <option value="Choice 1" selected>1</option>
                      <option value="Choice 2">2</option>
                      <option value="Choice 3">3</option>
                      <option value="Choice 4">4</option>
                      <option value="Choice 5">5</option>
                      <option value="Choice 6">6</option>
                      <option value="Choice 7">7</option>
                      <option value="Choice 8">8</option>
                      <option value="Choice 9">9</option>
                      <option value="Choice 10">10</option>
                    </select>
                  </div>
                </div>
                <div class="mt-4 row">
                  <div class="col-lg-5">
                    <button
                      class="mb-0 btn bg-gradient-success mt-lg-auto w-100"
                      type="button"
                      name="button"
                    >
                      Add to cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div class="mt-5 row">
              <other-products />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Choices from "choices.js";
import PhotoSwipeLightbox from "photoswipe/lightbox";
import "photoswipe/style.css";
import OtherProducts from "./components/OtherProducts.vue";

import productDetails2 from "../../../assets/img/products/product-details-2.jpg";
import productDetails3 from "../../../assets/img/products/product-details-3.jpg";
import productDetails4 from "../../../assets/img/products/product-details-4.jpg";
import productDetails5 from "../../../assets/img/products/product-details-5.jpg";
export default {
  name: "ProductPage",
  components: { OtherProducts },
  data() {
    return {
      productDetails2,
      productDetails3,
      productDetails4,
      productDetails5,
      images: [
        {
          largeURL: productDetails2,
          thumbnailURL: productDetails2,
          width: 500,
          height: 600,
        },
        {
          largeURL: productDetails3,
          thumbnailURL: productDetails3,
          width: 500,
          height: 600,
        },
        {
          largeURL: productDetails4,
          thumbnailURL: productDetails4,
          width: 500,
          height: 600,
        },
        {
          largeURL: productDetails5,
          thumbnailURL: productDetails5,
          width: 500,
          height: 600,
        },
      ],
    };
  },
  mounted() {
    this.getChoices("choices-quantity");
    this.getChoices("choices-material");
    this.getChoices("choices-colors");
    if (!this.lightbox) {
      this.lightbox = new PhotoSwipeLightbox({
        gallery: "#" + "product-gallery",
        children: "a",
        pswpModule: () => import("photoswipe"),
      });
      this.lightbox.init();
    }
  },
  unmounted() {
    if (this.lightbox) {
      this.lightbox.destroy();
      this.lightbox = null;
    }
  },
  methods: {
    getChoices(id) {
      if (document.getElementById(id)) {
        var element = document.getElementById(id);
        return new Choices(element, {
          searchEnabled: false,
          itemSelectText: "",
          allowHTML: true,
        });
      }
    },
  },
};
</script>

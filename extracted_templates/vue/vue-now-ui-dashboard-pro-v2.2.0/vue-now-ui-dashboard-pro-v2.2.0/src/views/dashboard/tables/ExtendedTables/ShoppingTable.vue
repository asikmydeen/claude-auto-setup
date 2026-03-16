<template>
  <div class="table-shopping">
    <el-table style="width: 100%" :data="productsTable">
      <el-table-column min-width="220">
        <template v-slot:default="props">
          <div class="img-container">
            <img :src="props.row.image" alt="Agenda" />
          </div>
        </template>
      </el-table-column>
      <el-table-column min-width="220" label="Product">
        <template v-slot:default="props">
          <div class="td-name">
            <a href="#jacket">{{ props.row.title }}</a>
            <br />
            <small>{{ props.row.description }}</small>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        min-width="180"
        label="Color"
        prop="color"
      ></el-table-column>
      <el-table-column
        min-width="100"
        label="Size"
        prop="size"
      ></el-table-column>
      <el-table-column min-width="200" label="Price" header-align="right">
        <template v-slot:default="props">
          <div class="td-number">
            <small>€</small>
            {{ props.row.price }}
          </div>
        </template>
      </el-table-column>
      <el-table-column min-width="200" label="Quantity" header-align="right">
        <template v-slot:default="props">
          <div class="td-number">
            {{ props.row.quantity }}
            <div class="btn-group">
              <n-button type="info" size="sm" @click="decreaseQuantity(props)">
                <i class="now-ui-icons ui-1_simple-delete"></i>
              </n-button>
              <n-button type="info" size="sm" @click="increaseQuantity(props)">
                <i class="now-ui-icons ui-1_simple-add"></i>
              </n-button>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column min-width="200" label="Amount" header-align="right">
        <template v-slot:default="props">
          <div class="td-number">
            <small>€</small>
            {{ props.row.amount }}
          </div>
        </template>
      </el-table-column>
      <el-table-column min-width="100" label="">
        <div class="td-actions">
          <n-button type="neutral">
            <i class="now-ui-icons ui-1_simple-remove"></i>
          </n-button>
        </div>
      </el-table-column>
    </el-table>
    <div class="table table-stats">
      <div class="td-total">Total</div>
      <div class="td-price">
        <small>€</small>
        {{ shoppingTotal }}
      </div>
      <div class="text-right">
        <button
          type="button"
          rel="tooltip"
          class="btn btn-info btn-round"
          data-original-title=""
          title=""
        >
          Complete Purchase
          <i class="now-ui-icons arrows-1_minimal-right"></i>
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import { ElTable, ElTableColumn } from "element-plus";
export default {
  components: {
    [ElTable.name]: ElTable,
    [ElTableColumn.name]: ElTableColumn,
  },
  data() {
    return {
      productsTable: [
        {
          image: "img/saint-laurent.jpg",
          title: "Suede Biker Jacket ",
          description: "by Saint Laurent",
          color: "Black",
          size: "M",
          price: 3390,
          quantity: 1,
          amount: 3390,
        },
        {
          image: "img/balmain.jpg",
          title: "Jersey T-Shirt",
          description: "by Balmain",
          color: "Black",
          size: "M",
          price: 499,
          quantity: 2,
          amount: 998,
        },
        {
          image: "img/prada.jpg",
          title: "\tSlim-Fit Swim Short ",
          description: "by Prada",
          color: "Red",
          size: "M",
          price: 200,
          quantity: 1,
          amount: 200,
        },
      ],
    };
  },
  computed: {
    shoppingTotal() {
      return this.productsTable.reduce((accumulator, current) => {
        return accumulator + current.amount;
      }, 0);
    },
  },
  methods: {
    increaseQuantity(props) {
      props.row.quantity++;
      this.computeAmount(props);
    },
    decreaseQuantity(props) {
      if (props.row.quantity > 1) {
        props.row.quantity--;
        this.computeAmount(props);
      }
    },
    computeAmount(props) {
      props.row.amount = props.row.quantity * props.row.price;
    },
  },
};
</script>
<style>
.table-stats {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
}
</style>

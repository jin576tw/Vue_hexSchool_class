<template>
  <table class="table align-middle">
    <thead>
      <tr>
        <th>圖片</th>
        <th>商品名稱</th>
        <th>價格</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in products" :key="item.id">
        <td>
          <div
            style="
              width: 200px;
              height: 100px;
              background-size: cover;
              background-position: center;
            "
            :style="{ backgroundImage: `url(${item.imageUrl})` }"
          ></div>
        </td>
        <td>
          {{ item.title }}
        </td>
        <td>
          <div class="h5" v-if="!item.price">{{ item.origin_price }} 元</div>
          <del class="h6" v-if="item.price"
            >原價 {{ item.origin_price }} 元</del
          >
          <div class="h5" v-if="item.price">現在只要 {{ item.price }} 元</div>
        </td>
        <td>
          <div class="btn-group btn-group-sm">
            <button
              type="button"
              class="btn btn-outline-secondary"
              @click="openProductModal(item.id)"
            >
              <i class="fas fa-spinner fa-pulse"></i>
              查看更多
            </button>
            <button
              type="button"
              class="btn btn-outline-danger"
              @click="AddToCart(item.id, 1)"
            >
              <i class="fas fa-spinner fa-pulse"></i>
              加到購物車
            </button>
          </div>
        </td>
      </tr>
    </tbody>
  </table>

  <!-- modal -->
  <product-modal :product="product" @add-to-cart="AddToCart"></product-modal>
</template>

<script>
import ProductModal from "./modal/ProductModal.vue";
import modal from "bootstrap/js/dist/modal";

export default {
  data() {
    return {
      productModal: null,
      product: {},
    };
  },

  components: {
    ProductModal,
  },
  emits: ["on-add-cart", "send-loading-Item"],
  props: ["products"],
  methods: {
    //商品查看更多
    openProductModal(id) {
      this.productModal.show();

      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/product/${id}`;

      this.$http.get(url).then((res) => {
        this.product = res.data.product;
      });
    },
    //加入購物車
    AddToCart(id, qty) {
      this.productModal.hide();

      const cart = {
        product_id: id,
        qty,
      };

      this.$emit("on-add-cart", cart);
    },
  },
  mounted() {
    this.productModal = new modal(document.getElementById("productModal"));
  },
};
</script>

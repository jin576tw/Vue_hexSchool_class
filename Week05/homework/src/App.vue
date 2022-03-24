<template>
  <div class="container">
    <div class="row">
      <products-list
        :products="products"
        @on-add-cart="onAddCart"
      ></products-list>
      <cart-list
        :cart="cart"
        @remove-cart-item="removeCartItem"
        @update-cart-item="updateCart"
        @delete-all="deleteAllCarts"
      ></cart-list>
      <user-form ref="form" @get-order="createOrder"></user-form>
    </div>
  </div>

  <Loading :active="isLoading" :z-index="1060"></Loading>
</template>

<script>
import ProductsList from "./components/ProductsList.vue";
import CartList from "./components/CartList.vue";
import UserForm from "./components/UserForm.vue";

export default {
  name: "App",
  components: {
    ProductsList,
    CartList,
    UserForm,
  },
  data() {
    return {
      products: [],
      cart: {},
      isLoading: false,
    };
  },
  methods: {
    //取得商品
    getProducts() {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products/all`;

      this.$http.get(url).then((res) => {
        this.products = res.data.products;
        // console.log(res.data.products);
      });
    },

    //取得購物車
    getCart() {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`;

      this.$http.get(url).then((res) => {
        this.cart = res.data.data;

        // console.log(res.data.data);
      });
    },

    //加入購物車
    onAddCart(cart) {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`;

      this.$http
        .post(url, { data: cart })
        .then((res) => {
          alert(res.data.message);
          this.getCart();
        })
        .catch((err) => {
          alert(err.data.message);
        });
    },

    // 刪除購物車
    removeCartItem(id) {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart/${id}`;

      this.$http
        .delete(url)
        .then((res) => {
          alert(res.data.message);
          this.getCart();
        })
        .catch((err) => {
          alert(err.data.message);
        });
    },

    // 更新購物車
    updateCart(data) {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart/${data.id}`;

      const cart = {
        product_id: data.product_id,
        qty: data.qty,
      };

      this.$http
        .put(url, { data: cart })
        .then((res) => {
          alert(res.data.message);
          this.getCart();
        })
        .catch((err) => {
          alert(err.data.message);
        });
    },
    // 清空購物車
    deleteAllCarts() {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/carts`;

      this.$http
        .delete(url)
        .then((res) => {
          alert(res.data.message);
          this.getCart();
        })
        .catch((err) => {
          alert(err.data.message);
        });
    },
    //建立訂單
    createOrder(form) {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/order`;

      this.isLoading = true;
      this.$http
        .post(url, { data: form })
        .then((res) => {
          this.isLoading = false;
          alert(res.data.message);

          this.getCart();
        })
        .catch((err) => {
          this.isLoading = false;
          alert(err.data.message);
        });
    },
  },
  mounted() {
    this.getProducts(); //載入商品
    this.getCart(); //載入購物車
  },
};
</script>

<style lang="scss">
@import "bootstrap";
</style>

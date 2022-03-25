<template>
  <div class="text-end mt-4">
    <button class="btn btn-primary" @click="openProductModal()">
      建立新的產品
    </button>
  </div>
  <table class="table mt-4">
    <thead>
      <tr>
        <th width="120">分類</th>
        <th>產品名稱</th>
        <th width="120">原價</th>
        <th width="120">售價</th>
        <th width="100">是否啟用</th>
        <th width="120">編輯</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(product, index) in products" :key="product.id">
        <td>{{ product.category }}</td>
        <td>{{ product.title }}</td>
        <td>{{ product.origin_price }}</td>
        <td>{{ product.price }}</td>
        <td>
          <span class="text-success" v-if="product.is_enabled == '1'"
            >啟用</span
          >
          <span v-else>未啟用</span>
        </td>
        <td>
          <div class="btn-group">
            <button
              type="button"
              class="btn btn-outline-primary btn-sm"
              @click="openProductModal(product)"
            >
              編輯
            </button>
            <button
              type="button"
              class="btn btn-outline-danger btn-sm"
              @click="openDelProductModal(product.id, index)"
            >
              刪除
            </button>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
  <!-- modal -->
  <!-- 刪除視窗 -->
  <del-product-modal
    ref="delProductModal"
    @delete-product="onDeleteProduct"
  ></del-product-modal>

  <product-modal
    :temp="product"
    @update-product="onUpdatedProduct"
  ></product-modal>

  <Loading :active="isLoading" :z-index="1060"></Loading>
</template>

<script>
import DelProductModal from "../../../components/modal/DelProductModal.vue";
import ProductModal from "../../../components/modal/ProductModal.vue";
import modal from "bootstrap/js/dist/modal";

export default {
  data() {
    return {
      isChecked: false,

      delProductModal: null,
      productModal: null,

      products: [],
      item: {},
      product: {},

      selectedID: "",
      selectedIndex: "",

      isLoading: true,
    };
  },
  components: {
    DelProductModal,
    ProductModal,
  },
  watch: {
    //若有變化，五秒更新回預設
    product() {
      setTimeout(() => {
        this.getAdminProducts();
      }, 5000);
    },
  },
  methods: {
    getAdminProducts() {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/products`;

      this.$http
        .get(url)
        .then((res) => {
          //   console.log(res.data);
          this.isLoading = false;
          this.products = res.data.products;

          console.log(this.products);
        })
        .catch((error) => {
          this.isLoading = false;
          console.dir(error);
        });
    },

    checkLogin() {
      const token = document.cookie.replace(
        /(?:(?:^|.*;\s*)userToken\s*=\s*([^;]*).*$)|^.*$/,
        "$1"
      );

      if (token) {
        this.$http.defaults.headers.common.Authorization = `${token}`;

        const api = `${process.env.VUE_APP_API}api/user/check`;

        this.$http
          .post(api, { api_token: token })
          .then(() => {
            this.getAdminProducts();
          })
          .catch((err) => {
            this.isChecked = false;
            alert(err.data.message);
            this.$router.push("/login");
          });
      } else {
        alert("您尚未登入。");
        this.$router.push("/login");
      }
    },

    openProductModal(p) {
      this.productModal.show();

      if (p) {
        this.product = p;
        this.selectedID = p.id;
      } else {
        this.product = {
          imageUrl: "",
          imagesUrl: [],
          category: "",
          content: "",
          description: "",
          id: "",
          is_enabled: 1,
          origin_price: 100,
          price: 100,
          title: "1",
          unit: "",
        };
      }
    },

    onUpdatedProduct(product) {
      this.productModal.hide();

      console.log(product);

      const newProduct = {
        data: null,
      };

      newProduct.data = product;

      if (product) {
        this.$http
          .put(
            `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product/${this.selectedID}`,
            newProduct
          )
          .then((res) => {
            this.products.forEach((el, index) => {
              if (el.id == this.selectedID) {
                this.products[index] = product;
              }
            });

            alert("已修改商品");
            this.productModal.hide();
            console.log(res);
          })
          .catch((err) => {
            alert(err.data.message);
          });
      } else {
        this.$http
          .post(
            `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product`,
            newProduct
          )
          .then((res) => {
            this.products.push(product);
            alert("已新增商品");
            this.productModal.hide();
            console.log(res);
          })
          .catch((err) => {
            alert(err.data.message);
          });
      }
    },

    openDelProductModal(id, index) {
      this.delProductModal.show();
      this.selectedID = id;
      this.selectedIndex = index;
    },

    onDeleteProduct() {
      this.delProductModal.hide();
      console.log(this.selectedID, this.selectedIndex);

      this.products.splice(this.selectedIndex, 1);
      this.$http
        .delete(
          `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product/${this.selectedID}`
        )
        .then((res) => {
          console.log(res.data);
        })
        .catch((error) => {
          console.dir(error);
        });
    },
  },
  mounted() {
    // // /檢查登入
    this.checkLogin();

    //刪除視窗
    this.delProductModal = new modal(
      document.getElementById("delProductModal"),
      {
        keyboard: false,
      }
    );

    //編輯更新視窗
    this.productModal = new modal(document.getElementById("productModal"), {
      keyboard: false,
    });
  },
};
</script>

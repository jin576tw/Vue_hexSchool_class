<template>
  <div class="row mt-3">
    <div class="col-12">
      <h2>產品列表</h2>
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
              <div class="h5" v-if="!item.price">
                {{ item.origin_price }} 元
              </div>
              <del class="h6" v-if="item.price"
                >原價 {{ item.origin_price }} 元</del
              >
              <div class="h5" v-if="item.price">
                現在只要 {{ item.price }} 元
              </div>
            </td>
            <td>
              <div class="btn-group btn-group-sm">
                <router-link :to="`/product/${item.id}`">
                  <button
                    type="button"
                    class="btn btn-outline-secondary"
                    @click="openProductModal(item.id)"
                  >
                    <i class="fas fa-spinner fa-pulse"></i>
                    查看更多
                  </button>
                </router-link>
                <button
                  type="button"
                  class="btn btn-outline-danger"
                  @click="addToCart(item.id, 1)"
                >
                  <i class="fas fa-spinner fa-pulse"></i>
                  加到購物車
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <h4>總共：{{ products.length }} 項商品</h4>
    </div>
  </div>
  <Loading :active="isLoading" :z-index="1060"></Loading>
</template>

<style lang="scss">
img {
  object-fit: cover;
  min-width: 100%;
  height: 100%;
}

.primary-image {
  height: 500px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
}

.images {
  width: 150px;
  height: 150px;
  margin: 20px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
}

.img_warp {
  display: flex;
}
</style>
<script>
export default {
  data() {
    return {
      products: [],
      isLoading: true,
    };
  },
  methods: {
    getProducts() {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products/all`;

      this.$http
        .get(url)
        .then((res) => {
          //   console.log(res.data);
          this.isLoading= false;
          this.products = res.data.products;
        })
        .catch((error) => {
          this.isLoading= false;
          console.dir(error);
        });
    },

    addToCart(id, qty) {
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
            const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`;

            const cart = {
              product_id: id,
              qty,
            };

            this.$http
              .post(url, { data: cart })
              .then((res) => {
                alert(res.data.message);
                this.getCart();
              })
              .catch((err) => {
                alert(err.data.message);
              });
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
  },
  mounted() {
    this.getProducts();
  },
};
</script>

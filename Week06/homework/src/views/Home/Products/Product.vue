<template>
  <div class="col-12 mt-3">
    <h2>產品介紹</h2>
    <div v-if="product.title" class="card d-flex align-items-center mt-3">
      <div class="primary-image col-8">
        <img
          class="card-img-top"
          :src="product.imageUrl"
          :alt="product.title"
        />
      </div>
      <div class="card-body col-8">
        <h5 class="card-title">
          {{ product.title }}
          <span class="badge bg-primary ms-2">{{ product.category }}</span>
        </h5>
        <p class="card-text">商品描述：{{ product.description }}</p>
        <p class="card-text">商品內容：{{ product.content }}</p>
        <p class="card-text"></p>
        <div class="d-flex">
          <p class="card-text me-2">{{ product.price }}</p>
          <p class="card-text text-secondary">
            <del>{{ product.origin_price }}</del>
          </p>
          {{ product.unit }} / 元
        </div>
        <button
          class="btn btn btn-outline-danger"
          @click="addToCart(product.id, 1)"
        >
          <i class="fas fa-spinner fa-pulse"></i>
          加到購物車
        </button>
      </div>
      <div class="img_warp col-8">
        <div
          class="images"
          v-for="(img, index) in product.imagesUrl"
          :key="index"
        >
          <img :src="img" alt="" class="m-2" />
        </div>
      </div>
    </div>

    <span v-else>請選擇一個商品查看</span>
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
      product: {},
      isLoading: true,
    };
  },
  methods: {
    getProduct() {
      const { id } = this.$route.params;

      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/product/${id}`;

      this.$http
        .get(url)
        .then((res) => {
          this.isLoading = false;
          this.product = res.data.product;
        })
        .catch((error) => {
          this.isLoading = false;
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
    this.getProduct();
  },
};
</script>

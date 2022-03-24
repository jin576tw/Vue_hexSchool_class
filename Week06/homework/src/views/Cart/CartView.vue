<template>
  <Loading :active="isLoading" :z-index="1060"></Loading>
  <div class="text-end mt-3">
    <button
      class="btn btn-outline-danger"
      type="button"
      @click="deleteAllCarts"
    >
      清空購物車
    </button>
  </div>
  <table class="table align-middle">
    <thead>
      <tr>
        <th></th>
        <th>品名</th>
        <th style="width: 150px">數量/單位</th>
        <th>單價</th>
      </tr>
    </thead>
    <tbody>
      <template v-if="cart.carts">
        <tr v-for="item in cart.carts" :key="item.id">
          <td>
            <button
              type="button"
              class="btn btn-outline-danger btn-sm"
              @click="removeCartItem(item.id)"
            >
              <i class="fas fa-spinner fa-pulse"></i>
              x
            </button>
          </td>
          <td>
            {{ item.product.title }}
            <div class="text-success" v-if="item.coupon">已套用優惠券</div>
          </td>
          <td>
            <div class="input-group input-group-sm">
              <div class="input-group mb-3">
                <input
                  v-model.number="item.qty"
                  @blur="updateCart(item)"
                  min="1"
                  type="number"
                  class="form-control"
                />
                <span class="input-group-text" id="basic-addon2">{{
                  item.product.unit
                }}</span>
              </div>
            </div>
          </td>
          <td class="text-end">
            <small v-if="cart.final_total !== cart.total" class="text-success"
              >折扣價：</small
            >
            {{ item.final_total }}
          </td>
        </tr>
      </template>
    </tbody>
    <tfoot>
      <tr>
        <td colspan="3" class="text-end">總計</td>
        <td class="text-end">{{ cart.total }}</td>
      </tr>
      <tr v-if="cart.final_total !== cart.total">
        <td colspan="3" class="text-end text-success">折扣價</td>
        <td class="text-end text-success">{{ cart.final_total }}</td>
      </tr>
    </tfoot>
  </table>
  <div class="my-5 row justify-content-center">
    <!-- Form 表單驗證 -->
    <!-- v-slot 會將錯誤訊息加入到裡面 -->
    <Form class="col-md-6" v-slot="{ errors }" @submit="createOrder" ref="form">
      <div class="mb-3">
        <label for="email" class="form-label">Email</label>
        <Field
          id="email"
          name="email"
          type="email"
          class="form-control"
          :class="{ 'is-invalid': errors['email'] }"
          placeholder="請輸入 Email"
          rules="email|required"
          v-model="form.user.email"
        ></Field>
        <error-message name="email" class="invalid-feedback"></error-message>
      </div>

      <div class="mb-3">
        <label for="name" class="form-label">收件人姓名</label>
        <Field
          id="name"
          name="姓名"
          type="text"
          class="form-control"
          :class="{ 'is-invalid': errors['姓名'] }"
          placeholder="請輸入姓名"
          rules="required"
          v-model="form.user.name"
        ></Field>
        <error-message name="姓名" class="invalid-feedback"></error-message>
      </div>

      <div class="mb-3">
        <label for="tel" class="form-label">收件人電話</label>
        <Field
          id="tel"
          name="電話"
          type="tel"
          class="form-control"
          :class="{ 'is-invalid': errors['電話'] }"
          placeholder="請輸入電話"
          rules="required"
          v-model="form.user.tel"
        ></Field>
        <error-message name="電話" class="invalid-feedback"></error-message>
      </div>

      <div class="mb-3">
        <label for="address" class="form-label">收件人地址</label>
        <Field
          id="address"
          name="地址"
          type="text"
          class="form-control"
          :class="{ 'is-invalid': errors['地址'] }"
          placeholder="請輸入地址"
          rules="required"
          v-model="form.user.address"
        ></Field>
        <error-message name="地址" class="invalid-feedback"></error-message>
      </div>

      <div class="mb-3">
        <label for="message" class="form-label">留言</label>
        <textarea
          name="message"
          id="message"
          class="form-control"
          cols="30"
          rows="10"
          v-model="form.message"
        ></textarea>
      </div>
      <div class="text-end">
        <button type="submit" class="btn btn-danger">送出訂單</button>
      </div>
    </Form>
    <!-- Form 表單驗證 -->
  </div>
  <Loading :active="isLoading" :z-index="1060"></Loading>
</template>

<script>
export default {
  data() {
    return {
      isLoading: true,
      cart: {},
      form: {
        user: {
          name: "",
          email: "",
          tel: "",
          address: "",
        },
        message: "",
      },
    };
  },
  methods: {
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
            this.getCart();
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

    //取得購物車
    getCart() {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`;

      this.$http.get(url).then((res) => {
        this.isLoading = false;
        this.cart = res.data.data;

        console.log(this.cart);
        // console.log(res.data.data);
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

    //建立訂單
    createOrder() {
      this.isLoading = true;
      if (this.form) {
        const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/order`;
        this.isLoading = true;
        this.$http
          .post(url, { data: this.form })
          .then((res) => {
            this.$refs.form.resetForm();
            this.isLoading = false;
            alert(res.data.message);
            this.getCart();
          })
          .catch((err) => {
            this.isLoading = false;
            alert(err.data.message);
          });
      }
    },
  },
  mounted() {
    this.checkLogin();
  },
};
</script>

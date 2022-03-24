<template>
  <Loading :active="isLoading" :z-index="1060"></Loading>
  <div class="row logIn_content">
    <div class="login_title">
      <h1>請先登入</h1>
    </div>
    <Form
      class="logIn_form mt-3"
      v-slot="{ errors }"
      @submit="LogIn"
      ref="form"
    >
      <div class="mb-3">
        <label for="email" class="form-label">Email</label>
        <Field
          id="email"
          name="email"
          type="email"
          class="form-control col-12"
          :class="{ 'is-invalid': errors['email'] }"
          placeholder="請輸入 Email"
          rules="email|required"
          v-model="user.username"
        ></Field>
        <error-message name="email" class="invalid-feedback"></error-message>
      </div>
      <div class="mb-3">
        <label for="密碼" class="form-label">密碼</label>
        <Field
          id="password"
          name="密碼"
          type="password"
          class="form-control col-12"
          :class="{ 'is-invalid': errors['密碼'] }"
          placeholder="請輸入 密碼"
          rules="required"
          v-model="user.password"
        ></Field>
        <error-message name="密碼" class="invalid-feedback"></error-message>
      </div>
      <button type="submit" class="btn btn-primary">登入</button>
    </Form>
  </div>
</template>

<style lang="scss">
.logIn_content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 100px;
}

.login_title h1 {
  text-align: center;
  font-size: 36px;
}

.logIn_form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.logIn_form button {
  margin-top: 20px;
  width: 15%;
}
</style>

<script>
export default {
  data() {
    return {
      user: {},
      isLoading: false,
    };
  },
  methods: {
    LogIn() {
      const url = `${process.env.VUE_APP_API}admin/signin`;

      this.isLoading = true;
      this.$http
        .post(url, this.user)
        //成功的結果
        .then((res) => {
          const { token, expired } = res.data;
          //cookie存入登入參數
          document.cookie = `userToken=${token};expires=${new Date(expired)};`;

          alert(res.data.message);
          this.isLoading = false;
          this.$router.push("/");
        })
        //失敗的結果
        .catch((error) => {
          this.isLoading = false;
          alert(error.response.data.message);
        });
    },
  },
};
</script>

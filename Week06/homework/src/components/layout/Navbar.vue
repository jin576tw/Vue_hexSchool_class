<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container">
      <router-link to="/" class="navbar-brand">HOME</router-link>
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div
          class="navbar-nav d-flex justify-content-between"
          style="width: 100%"
        >
          <router-link to="/admin" class="nav-item nav-link"
            >產品管理</router-link
          >

          <div class="d-flex">
            <router-link to="/cart" class="nav-item nav-link"
              >購物車<i class="bi bi-cart-fill" style="margin-left: 5px"></i
            ></router-link>
            <router-link
              v-if="!isLogin"
              to="/login"
              class="nav-item nav-link ml-5"
              >登入</router-link
            >
            <div
              v-if="isLogin"
              class="nav-item nav-link"
              style="cursor: pointer"
              @click="signout"
            >
              登出
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  props: ["isLogin"],
  emits:["sign-out"],
  methods: {
    signout() {
      document.cookie = "userToken=;expires=;";
      alert("已登出");
      this.$router.push("/login");

      this.$emit('sign-out')
    },
  }
};
</script>

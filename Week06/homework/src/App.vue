<template>
  <navbar :isLogin="isLogin" @sign-out="isLogin = false"></navbar>
  <div class="div">
    <div class="container">
      <router-view />
    </div>
  </div>
</template>

<script>
import Navbar from "./components/layout/Navbar.vue";
export default {
  data() {
    return {
      isLogin: false,
    };
  },

  components: {
    Navbar,
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

        this.$http.post(api, { api_token: token }).then(() => {
          this.isLogin = true;
        });
      } else {
        this.isLogin = false;
      }
    },
  },
  mounted() {
    this.checkLogin();
  },
};
</script>
<style lang="scss">
@import "bootstrap";
</style>

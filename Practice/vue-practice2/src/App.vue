<template>
  <div id='nav'>
    <router-link to='/'>Home</router-link> | <router-link to='/about'>About</router-link> |
    <router-link to='/children'>Children</router-link>
  </div>
  <router-view />
  <button type='button' @click='jump'>轉址</button>
  {{ name }}
</template>

<script>
export default {
  data() {
    return {
      // 環境變數
      name: process.env.VUE_APP_NAME,
    };
  },
  methods: {
    jump() {
      // console.log(this.$router);
      // $router取得方法,$router(取得參數)
      this.$router.push('/children/childA');
    },
  },
  mounted() {
    console.log(this.$route);
  },
};
</script>

<style lang='scss'>
@import 'bootstrap';
</style>

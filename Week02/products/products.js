const token = document.cookie.replace(
  /(?:(?:^|.*;\s*)userToken\s*\=\s*([^;]*).*$)|^.*$/,
  "$1"
);
//axios夾帶header
axios.defaults.headers.common["Authorization"] = token;
const url = "https://vue3-course-api.hexschool.io"; // 請加入站點
const path = "jin576tw-data"; // 請加入個人 API Path

const app = Vue.createApp({
  data() {
    return {
      products_detial: {},

      products: [],
    };
  },
  methods: {
    showDetail(p) {
      this.products_detial = p;
    },
  },
  mounted() {
    axios
      .get(`${url}/api/${path}/admin/products`)
      .then((res) => {
        console.log(res.data);
        this.products =  res.data.products
      })
      .catch((error) => {
        console.dir(error);
      });
  },
});

app.mount("#app");

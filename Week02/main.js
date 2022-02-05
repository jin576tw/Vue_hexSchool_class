const url = "https://vue3-course-api.hexschool.io"; // 請加入站點
const path = "jin576tw-data"; // 請加入個人 API Path

const app = Vue.createApp({
  data() {
    return {
      userEmail: "",
      userPassword: "",
    };
  },
  methods: {
    LogIn() {
      const user = {
        username: this.userEmail,
        password: this.userPassword,
      };

      
      axios
        .post(`${url}/admin/signin`, user)
        //成功的結果
        .then((res) => {
          console.log(res);

          const { token, expired } = res.data;
          //cookie存入登入參數
          document.cookie = `userToken=${token}; expires=${new Date(expired)};`;

          window.location.href = "./products";
        })
        //失敗的結果
        .catch((error) => {
          console.log(error);
        });
    },
  },
});

app.mount("#app");

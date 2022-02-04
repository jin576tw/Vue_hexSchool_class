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
      delProductModal: null,
      productModal: null,

      products: [],

      products_temp: {
        imageUrl: "",
        imagesUrl: [],
        category: "",
        content: "",
        description: "",
        id: "",
        is_enabled: 0,
        origin_price: 100,
        price: 100,
        title: "",
        unit: "",
      },

      selectedID: "",
      selectedIndex: "",
      selectedPic: false,
      selectedPicIndex: "",
      addProductPic: "",
    };
  },
  methods: {
    openProductModal(id) {
      this.productModal.show();

      this.selectedIndex = "";
      this.selectedPic = false;
      this.selectedID = id;

      if (this.selectedID == null) {
        this.addProductPic = "";
        this.selectedPic = false;
        this.products_temp = {
          imageUrl: "",
          imagesUrl: [],
          category: "",
          content: "",
          description: "",
          id: "",
          is_enabled: 1,
          origin_price: 100,
          price: 100,
          title: "",
          unit: "",
        };
      } else {
        axios
          .get(`${url}/api/${path}/product/${this.selectedID}`)
          .then((res) => {
            console.log(res.data);
            this.products_temp = res.data.product;
          })
          .catch((error) => {
            console.dir(error);
          });
      }
    },

    onSelectedPic(index) {
      this.selectedPicIndex = index;
      this.selectedPic = true;
    },

    onAddPic() {
      this.products_temp.imagesUrl.push(this.addProductPic);
      this.addProductPic = "";
      alert("已新增圖片");
    },

    onDeletePic() {
      this.products_temp.imagesUrl.splice(this.selectedPicIndex, 1);
      this.selectedPic = false;
      this.selectedPicIndex = "";
      alert("已刪除圖片");
    },

    updatedProduct() {
      const newProduct = {
        data: null,
      };

      newProduct.data = this.products_temp;

      if (this.selectedID == null) {
        axios
          .post(`${url}/api/${path}/admin/product`, newProduct)
          .then((res) => {
            this.products.push(this.products_temp);
            alert("已新增商品");
            this.productModal.hide();
            console.log(res);
          })
          .catch((err) => {
            alert(err.data.message);
          });
      } else {
        axios
          .put(
            `${url}/api/${path}/admin/product/${this.selectedID}`,
            newProduct
          )
          .then((res) => {
            this.products.forEach((el, index) => {
              if (el.id == this.selectedID) {
                this.products[index] = this.products_temp;
              }
            });

            alert("已修改商品");
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

    deleteProduct() {
      this.products.splice(this.selectedIndex, 1);
      axios
        .delete(`${url}/api/${path}/admin/product/${this.selectedID}`)
        .then((res) => {
          console.log(res.data);
        })
        .catch((error) => {
          console.dir(error);
        });

      this.delProductModal.hide();
    },
  },
  mounted() {
    axios.post(`${url}/api/user/check`).then((res) => {
      if (!res.data.success) {
        alert(res.data.message);
        window.location = "/Week03";
      } else {
        //商品初始化載入
        axios
          .get(`${url}/api/${path}/admin/products`)
          .then((res) => {
            console.log(res.data);
            this.products = res.data.products;
          })
          .catch((error) => {
            console.dir(error);
          });
      }
    });

    //刪除視窗
    this.delProductModal = new bootstrap.Modal(
      document.getElementById("delProductModal"),
      {
        keyboard: false,
      }
    );

    //編輯更新視窗
    this.productModal = new bootstrap.Modal(
      document.getElementById("productModal"),
      {
        keyboard: false,
      }
    );

    // this.productModal.show();
  },
});

app.mount("#app");

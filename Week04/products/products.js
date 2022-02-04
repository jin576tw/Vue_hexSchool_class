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

      temp: {
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
      },

      selectedID: "",
      selectedIndex: "",
    };
  },
  methods: {
    openProductModal(id) {
      this.productModal.show();

      this.selectedID = id;

      if (this.selectedID == null) {
        this.temp = {
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
            this.temp = res.data.product;
            console.log(this.temp);
          })
          .catch((error) => {
            console.dir(error);
          });
      }
    },

    onUpdatedProduct(product) {
      this.productModal.hide();

      const newProduct = {
        data: null,
      };

      newProduct.data = product;

      if (this.selectedID == null) {
        axios
          .post(`${url}/api/${path}/admin/product`, newProduct)
          .then((res) => {
            this.products.push(product);
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
                this.products[index] = product;
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

    //刪除視窗
    openDelProductModal(id, index) {
      this.delProductModal.show(), (this.selectedID = id);
      this.selectedIndex = index;
    },

    onDeleteProduct(id, index) {
      this.products.splice(index, 1);
      axios
        .delete(`${url}/api/${path}/admin/product/${id}`)
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
    // 檢核是否登入
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

    // this.productModal.show()
  },
});

app.component("product-modal", {
  template: `<form
        id="productModal"
        ref="productModal"
        class="modal fade"
        tabindex="-1"
        aria-labelledby="productModalLabel"
        aria-hidden="true"
        @submit.prevent="updatedProduct"
      >
        <div class="modal-dialog modal-xl">
          <div class="modal-content border-0">
            <div class="modal-header bg-dark text-white">
              <h5 id="productModalLabel" class="modal-title">
                <span>新增產品</span>
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <div class="row">
                <div class="col-sm-4 pic_warp">
                  <div class="mb-2">
                    <div class="mb-3">
                      <label for="imageUrl" class="form-label"
                        >主要圖片</label
                      >
                      <input
                        type="text"
                        class="form-control"
                        placeholder="請輸入圖片連結"
                        v-model="product.imageUrl"
                        
                      />
                    </div>
                    <div class="product_pic">
                      <img v-if="product.imageUrl != '' "
                      :src="product.imageUrl" alt="" />
                    </div>
                    
                  </div>

                  <hr>

                  <h5 class="mb-3">更多圖片</h5>
                  <div 
                  v-if="product.imagesUrl.length > 0"
                  class="product_picRow">
                    <div class="picRow "
                    :class="{active:selectedPicIndex === index}"
                    v-for="(pic,index) in product.imagesUrl"
                    :key="index"
                    @click="selectedPic(index)"
                    >
                      <img :src="pic" alt="">
                    </div>

                  </div>
                  
                  <div class="addPic_warp mt-3">
                    <input
                     class="form-control"
                     type="text"
                     placeholder="附上圖片連結"
                     v-model="addProductPic"
                    />
                    <button
                    type="button" 
                    class="btn btn-outline-primary btn-sm"
                    @click="addPic"
                    >新增圖片
                    </button>
                  </div>
                  <div class="mt-3"
                  v-if="picSelected"
                  >
                    <button 
                    type="button"
                    class="btn btn-outline-danger btn-sm d-block w-100"
                    @click="deletePic"
                    >
                      刪除圖片
                    </button>
                  </div>
                </div>
                <div class="col-sm-8">
                  <div class="mb-3">
                    <label for="title" class="form-label">標題</label>
                    <input
                      id="title"
                      type="text"
                      class="form-control"
                      placeholder="請輸入標題"
                      v-model="product.title"
                      required 
                    />
                  </div>

                  <div class="row">
                    <div class="mb-3 col-md-6">
                      <label for="category" class="form-label">分類</label>
                      <input
                        id="category"
                        type="text"
                        class="form-control"
                        placeholder="請輸入分類"
                        v-model="product.category"
                        required 
                      />
                    </div>
                    <div class="mb-3 col-md-6">
                      <label for="price" class="form-label">單位</label>
                      <input
                        id="unit"
                        type="text"
                        class="form-control"
                        placeholder="請輸入單位"
                        v-model="product.unit"
                        required 
                      />
                    </div>
                  </div>

                  <div class="row">
                    <div class="mb-3 col-md-6">
                      <label for="origin_price" class="form-label">原價</label>
                      <input
                        id="origin_price"
                        type="number"
                        min="0"
                        class="form-control"
                        placeholder="請輸入原價"
                        v-model="product.origin_price"
                        required 
                      />
                    </div>
                    <div class="mb-3 col-md-6">
                      <label for="price" class="form-label">售價</label>
                      <input
                        id="price"
                        type="number"
                        min="0"
                        class="form-control"
                        placeholder="請輸入售價"
                        v-model="product.price"
                        required 
                      />
                    </div>
                  </div>
                  <hr />

                  <div class="mb-3">
                    <label for="description" class="form-label">產品描述</label>
                    <textarea
                      id="description"
                      type="text"
                      class="form-control"
                      placeholder="請輸入產品描述"
                      v-model="product.description"
                    >
                    </textarea>
                  </div>
                  <div class="mb-3">
                    <label for="content" class="form-label">說明內容</label>
                    <textarea
                      id="description"
                      type="text"
                      class="form-control"
                      placeholder="請輸入說明內容"
                      v-model="product.content"
                    >
                    </textarea>
                  </div>
                  <div class="mb-3">
                    <div class="form-check">
                      <input
                        id="is_enabled"
                        class="form-check-input"
                        type="checkbox"
                        v-model="product.is_enabled"
                        :true-value="1"
                        :false-value="0"
                      
                      />
                      <label class="form-check-label" for="is_enabled"
                        >是否啟用</label
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-outline-secondary"
                data-bs-dismiss="modal"
              >
                取消
              </button>
              <button 
              type="submit" 
              class="btn btn-primary"
             >確認</button>
            </div>
          </div>
        </div>
      </form>`,
  data() {
    return {
      picSelected: false,
      selectedPicIndex: "",
      addProductPic: "",
    };
  },

  props: {
    pid: {
      type: String,
    },
    product: {
      type: Object,
    },
  },
  emits: ["update-product"],
  methods: {
    selectedPic(index) {
      this.selectedPicIndex = index;
      this.picSelected = true;
    },
    deletePic() {
      this.product.imagesUrl.splice(this.selectedPicIndex, 1);
      this.picSelected = false;
      this.selectedPicIndex = "";
      alert("已刪除圖片");
    },
    addPic() {
      this.product.imagesUrl.push(this.addProductPic);
      this.addProductPic = "";
      alert("已新增圖片");
    },
    updatedProduct() {
      this.$emit("update-product", this.product);
    },
  },
  mounted() {},
});

//刪除視窗
app.component("del-product-modal", {
  template: `
    <div
        id="delProductModal"
        ref="delProductModal"
        class="modal fade"
        tabindex="-1"
        aria-labelledby="delProductModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content border-0">
            <div class="modal-header bg-danger text-white">
              <h5 id="delProductModalLabel" class="modal-title">
                <span>刪除產品</span>
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              是否刪除
              <strong class="text-danger"></strong> 商品(刪除後將無法恢復)。
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-outline-secondary"
                data-bs-dismiss="modal"
              >
                取消
              </button>
              <button 
              type="button" 
              class="btn btn-danger"
              @click="deleteProduct">確認刪除</button>
            </div>
          </div>
        </div>
      </div>`,

  props: ["pid", "pindex"],
  emits: ["del-product"],
  methods: {
    deleteProduct() {
      this.$emit("del-product", this.pid, this.pindex);
    },
  },
});

app.mount("#app");

<template>
  <form
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
                  <label for="imageUrl" class="form-label">主要圖片</label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="請輸入圖片連結"
                    v-model="product.imageUrl"
                  />
                </div>
                <div class="product_pic">
                  <img
                    v-if="product.imageUrl != ''"
                    :src="product.imageUrl"
                    alt=""
                  />
                </div>
              </div>

              <hr />

              <h5 class="mb-3">更多圖片</h5>
              <div v-if="product.imagesUrl.length > 0" class="product_picRow">
                <div
                  class="picRow"
                  :class="{ active: selectedPicIndex === index }"
                  v-for="(pic, index) in product.imagesUrl"
                  :key="index"
                  @click="selectedPic(index)"
                >
                  <img :src="pic" alt="" />
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
                >
                  新增圖片
                </button>
              </div>
              <div class="mt-3" v-if="picSelected">
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
          <button type="submit" class="btn btn-primary">確認</button>
        </div>
      </div>
    </div>
  </form>
</template>

<style lang="scss" scoped>
.pic_warp {
  overflow: auto;
}
.product_pic {
  width: 100%;
  height: 250px;
  background-color: #e7e7e7;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  object-fit: cover;
}

.product_pic img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.product_picRow {
  width: 100%;
  /* max-width: 360px; */

  display: flex;
  /* justify-content: space-evenly; */
  align-items: center;
  overflow: auto;
}

.picRow {
  min-width: 100px;
  max-width: 100px;
  height: 100px;
  background-color: #e7e7e7;
  overflow: hidden;
  margin-right: 10px;
  cursor: pointer;
}

.active {
  border: 4px solid rgb(13, 187, 255);
}

.addPic_warp {
  width: 100%;
  display: flex;
}

.addPic_warp button {
  min-width: 80px;
}

.picRow img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>

<script>
export default {
  data() {
    return {
      product: {
        imageUrl: "",
        imagesUrl: [],
        category: "",
        content: "",
        description: "",
        id: "",
        is_enabled: 1,
        origin_price: 100,
        price: 100,
        title: "1",
        unit: "",
      },
      picSelected: false,
      selectedPicIndex: "",
      addProductPic: "",
    };
  },
  watch: {
    // 子元件無法使用父層資料帶入v-model，
    // 必須監聽temp父層帶入到本地子元件資料。
    temp() {
      this.product = this.temp;
    },
  },
  props: ["temp"],
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
};
</script>

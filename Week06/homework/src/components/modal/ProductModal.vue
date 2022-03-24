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
          <div class="col-sm-4 pic_warp">
            <div class="mb-3">
              <label for="imageUrl" class="form-label">主要圖片</label>
              <input
                type="text"
                class="form-control"
                placeholder="請輸入圖片連結"
                :value="temp.imageUrl"
                @input="product.imageUrl = $event.target.value"
              />
            </div>
            <div class="product_pic">
              <img v-if="temp.imageUrl != ''" :src="temp.imageUrl" alt="" />
            </div>
          </div>

          <div class="col-sm-8waww">
            <div class="mb-3">
              <label for="title" class="form-label">標題</label>
              <input
                id="title"
                type="text"
                class="form-control"
                placeholder="請輸入標題"
                :value="temp.title"
                @input="product.title = $event.target.value"
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
                  :value="temp.category"
                  @input="product.category = $event.target.value"
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
                  :value="temp.unit"
                  @input="product.unit = $event.target.value"
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
                  :value="temp.origin_price"
                  @input="product.origin_price = $event.target.value"
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
                  :value="temp.price"
                  @input="product.price = $event.target.value"
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
                :value="temp.description"
                @input="product.description = $event.target.value"
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
                :value="temp.content"
                @input="product.content = $event.target.value"
              >
              </textarea>
            </div>
            <div class="mb-3">
              <div class="form-check">
                <input
                  id="is_enabled"
                  class="form-check-input"
                  type="checkbox"
                  :value="temp.is_enabled"
                  @input="product.is_enabled = $event.target.value"
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

<script>
export default {
  data() {
    return {
      product: {},
      picSelected: false,
      selectedPicIndex: "",
      addProductPic: "",
    };
  },
  props: {
    temp: { type: Object },
  },
  emits: ["update-product"],
  methods: {
    updatedProduct() {
      this.$emit("update-product", this.product);
    },
  },
};
</script>

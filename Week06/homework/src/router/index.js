import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/",
    component: () => import("../views/Home/HomeView.vue"),
    children: [
      {
        path: "",
        component: () => import("../views/Home/Products/Products.vue"),
      },
      {
        path: "product/:id",
        name: "商品介紹",
        component: () => import("../views/Home/Products/Product.vue"),
      },
    ],
  },
  {
    path: "/cart",
    name: "首頁",
    component: () => import("../views/Cart/CartView.vue"),
  },
  {
    path: "/admin",
    name: "產品管理",
    component: () => import("../views/Admin/AdminView.vue"),
    children:[
      {
        path:"",
        component: () => import("../views/Admin/Products/ProductsAdmin.vue"),
      }
    ]
  },
  {
    path: "/login",
    name: "登入頁",
    component: () => import("../views/Login/LoginView.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;

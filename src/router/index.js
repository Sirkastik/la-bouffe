import { createRouter, createWebHistory } from "vue-router";
import Home from "/src/views/Home.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/account",
    name: "Account",
    // route level code-splitting
    // this generates a separate chunk (Account.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "Account" */ "../views/Account.vue"),
  },
  {
    path: "/restaurant/account",
    name: "ResAccount",
    // route level code-splitting
    // this generates a separate chunk (ResAccount.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "ResAccount" */ "../views/Account.vue"),
  },
  {
    path: "/restaurant",
    name: "Restaurant",
    // route level code-splitting
    // this generates a separate chunk (Restaurant.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "Restaurant" */ "../views/Restaurant.vue"),
  },
  {
    path: "/e-foodie",
    name: "E-foodie",
    // route level code-splitting
    // this generates a separate chunk (E-foodie.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "E-foodie" */ "../views/E-foodie.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;

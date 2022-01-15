import { createRouter, createWebHistory } from "vue-router";
import Home from "/src/views/Home.vue";
// import { getCurrentUser } from "../includes/firebase";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/account",
    name: "Account",
    component: () => import(/* webpackChunkName: "Account" */ "../views/Account.vue"),
    meta: { requiresAuth: true }
  },
  {
    path: "/restaurant",
    name: "Kitchen",
    component: () => import(/* webpackChunkName: "Kitchen" */ "../views/Kitchen.vue"),
    meta: { requiresAuth: true }
  },
  {
    path: "/search",
    name: "Search",
    component: () => import(/* webpackChunkName: "Search" */ "../views/Search.vue"),
  },
  {
    path: "/favourites",
    name: "Fav",
    component: () => import(/* webpackChunkName: "Fav" */ "../views/Fav.vue"),
  },
  {
    path: "/cart",
    name: "Cart",
    component: () => import(/* webpackChunkName: "Cart" */ "../views/Cart.vue"),
  },
  {
    path: "/buyer/restaurant/:id",
    name: "Restaurant",
    component: () => import(/* webpackChunkName: "Restaurant" */ "../views/Restaurant.vue"),
  },
  {
    path: "/categories/:doc",
    name: "Categories",
    component: () => import(/* webpackChunkName: "Categories" */ "../views/Category.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

// router.beforeEach(async (to, from, next) => {
//   if (!to.meta.requiresAuth) {
//     next()
//   } else {
//     const user = await getCurrentUser()
//     if (to.path === '/account') {
//       if (user) next('/restaurant')
//       else next()
//     } else {
//       if (!user) next('/account')
//       else next() 
//     }
//   }
// });

export default router;

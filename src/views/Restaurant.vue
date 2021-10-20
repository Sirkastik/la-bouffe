<template>
  <RestaurantPage />
</template>

<script>
import RestaurantPage from "../components/RestaurantPage.vue";
import { auth } from "@/includes/firebase";
// import store from "../store";

export default {
  name: "Restaurant",
  components: {
    RestaurantPage,
  },

  async beforeRouteEnter(to, from, next) {
    if (!auth.currentUser) {
      next("/restaurant/account");
    } else {
      next()
    }
  },
};
</script>

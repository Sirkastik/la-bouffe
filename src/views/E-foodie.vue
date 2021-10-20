<template>
  <EFoodiepage />
</template>

<script>
import EFoodiepage from "../components/E-foodiepage.vue";
import { auth } from "@/includes/firebase";
// import store from "../store";

export default {
  name: "Home",
  components: {
    EFoodiepage,
  },

  async beforeRouteEnter(to, from, next) {
    if (!auth.currentUser) {
      next("/account");
    } else {
      next()
    }
  },
};
</script>

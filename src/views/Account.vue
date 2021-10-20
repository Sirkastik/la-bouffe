<template>
  <div>
    <signup-page v-if="resSignup" />
    <account-page v-else />
  </div>
</template>

<script>
import AccountPage from "../components/AccountPage.vue";
import SignupPage from "../components/SignUp.vue";
import { auth, getDoc, doc, db } from "@/includes/firebase";
import store from "../store";

export default {
  name: "Account",
  components: {
    AccountPage,
    SignupPage,
  },

  computed: {
    resSignup() {
      return this.$route.name == "ResAccount"
    }
  },

  async beforeRouteEnter(to, from, next) {
    if (auth.currentUser) {
      const userSnap = await getDoc(doc(db, "users", auth.currentUser.uid));
      store.state.accountType = userSnap.data().accountType;
      store.state.accountType == "Buyer"
        ? next("/e-foodie")
        : next("/restaurant");
    } else {
      next();
    }
  },
};
</script>

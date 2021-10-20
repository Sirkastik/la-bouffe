v<template>
  <div id="foodie">
    <h2>Welcome {{ email }}</h2>
    <div class="menu">
      <h3>Menu</h3>
      <h5> <span>Drinks</span> <span>Price</span> </h5>
      <div v-for="item in drinks" v-bind:key="item.id" class="item">
        <span class="left">{{ item.name }}</span> 
        <span class="right">{{ item.price }}</span> 
      </div>
      <h5><span>Dishes</span> <span>Price</span> </h5>
      <div v-for="item in dishes" v-bind:key="item.id" class="item">
        <span class="left">{{ item.name }}</span> 
        <span class="right">{{ item.price }}</span> 
      </div>
      <h5><span>Food Items</span> <span>Price</span> </h5>
      <div v-for="item in foodItems" v-bind:key="item.id" class="item">
        <span class="left">{{ item.name }}</span> 
        <span class="right">{{ item.price }}</span> 
      </div>
    </div>
    <div class="nav">
      <div class="link">Home</div>
      <div class="link">Restaurants</div>
      <div class="link">Cart</div>
      <div class="link">Account</div>
    </div>
    <button @click="handleSignout">Sign Out</button>
  </div>
</template>

<script>
import {
  auth,
  db,
  //   doc,
  collection,
  //   getDoc,
  getDocs,
  //   addDoc,
  //   deleteDoc,
  //   query,
  //   where,
} from "../includes/firebase";
export default {
  name: "RestaurantPage",

  data() {
    return {
      drinks: [],
      dishes: [],
      foodItems: []
    };
  },

  async created() {
    const menu = await Promise.all([
      getDocs(collection(db, "dishes")),
      getDocs(collection(db, "foodItems")),
      getDocs(collection(db, "drinks")),
    ]);
    menu.forEach((query) => query.forEach(this.getItems));
  },

  computed: {
    loggedIn() {
      return this.$store.state.userLoggedIn;
    },
    email() {
      return auth.currentUser.email;
    },
  },

  methods: {
    getItems(document) {
      const item = {
        ...document.data(),
        id: document.id,
      };
      if (item.type == "Drink") this.drinks.unshift(item);
      else if (item.type == "Dish") this.dishes.unshift(item);
      else this.foodItems.unshift(item);
    },

    async handleSignout() {
      await this.$store.dispatch("signOut");
      this.$router.push("/");
    },
  },
};
</script>

<style scoped>
#foodie {
  text-align: center;
  padding: 1.5rem 2rem;
}

.menu {
  border: 1px solid var(--accent);
  padding: 1rem;
}

.item, h5 {
  display: flex;
  justify-content: space-between;
}
</style>

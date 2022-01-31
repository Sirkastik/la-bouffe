<template>
	<section>
		<header>
			<span>Restaurants</span> <span><i class="fas fa-store"></i></span>
		</header>
		<div class="restaurants">
			<restaurant-item
				v-for="restaurant in restaurants"
				v-bind:key="restaurant.id"
				@click="$router.push(`/buyer/restaurant/${restaurant.id}`)"
				:restaurant="restaurant"
			/>
		</div>
	</section>
</template>

<script>
import { mapState } from "vuex";
import { db, collection, getDocs } from "@/services/firebase";
import RestaurantItem from "./ItemRes.vue";
export default {
	components: { RestaurantItem },

	computed: {
		...mapState(["restaurants"]),
	},

	async created() {
		const restaurantSnapShot = await getDocs(collection(db, "restaurants"));
		let restaurants = [];
		restaurantSnapShot.forEach((document) => {
			const data = {
				id: document.id,
				...document.data().info,
			};
			restaurants.unshift(data);
		});
		this.$store.dispatch("updateRestaurants", restaurants);
	},
};
</script>

<style scoped>
header {
	font-weight: bold;
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.restaurants {
	height: 38vh;
	display: flex;
	gap: 1rem;
	padding: 1rem 0;
	overflow-x: scroll;
}
</style>

<template>
	<section>
		<header>
			<span>Restaurants</span> <span><i class="fas fa-store"></i></span>
		</header>
		<div class="restaurants">
			<restaurant-item
				v-for="restaurant in restaurants"
				v-bind:key="restaurant.id"
				@click="navigate(restaurant.id)"
				:restaurant="restaurant"
			/>
		</div>
	</section>
</template>

<script>
import { db, collection, getDocs } from "../includes/firebase";
import RestaurantItem from "./ItemRes.vue";
export default {
	components: { RestaurantItem },
	data() {
		return {
			restaurants: [],
			images: [],
		};
	},

	async created() {
		const resSnap = await getDocs(collection(db, "restaurants"));
		resSnap.forEach(this.getItems);
	},

	methods: {
		async getItems(document) {
			const data = document.data();
			const info = {
				...data.info,
				id: document.id,
			};
			this.restaurants.unshift(info);
		},

		navigate(id) {
			this.$router.push(`/buyer/restaurant/${id}`);
		},
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

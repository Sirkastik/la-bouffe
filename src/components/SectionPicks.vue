<template>
	<section>
		<header>
			<span>Today's Picks</span> <span><i class="fas fa-fire"></i></span>
		</header>
		<div class="picks">
			<picked-item v-for="item in picks" v-bind:key="item.id" :item="item" />
		</div>
	</section>
</template>

<script>
import { db, collection, getDocs } from "../includes/firebase";
import PickedItem from "./ItemPicked.vue";
export default {
	components: { PickedItem },
	data() {
		return {
			menu: [],
			picks: [],
			categories: ["breakfast", "dishes", "drinks", "snacks", "desserts"],
			links: [
				"https://images.unsplash.com/photo-1502302800694-ff6ec595e6e3?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=1000&ixid=MnwxfDB8MXxyYW5kb218MHx8dGVhP2NvZmZlZXx8fHx8fDE2NDIyNDEwMzc&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1000",
				"https://images.unsplash.com/photo-1597393353296-d149e4d4d771?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=1000&ixid=MnwxfDB8MXxyYW5kb218MHx8bHVuY2h8fHx8fHwxNjQyMjQxMTEy&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1000",
				"https://images.unsplash.com/photo-1618046364546-81e9d03d39a6?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=1000&ixid=MnwxfDB8MXxyYW5kb218MHx8ZHJpbmtzfHx8fHx8MTY0MjI0MTE3MQ&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1000",
				"https://images.unsplash.com/photo-1608219994488-cc269412b3e4?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=1000&ixid=MnwxfDB8MXxyYW5kb218MHx8ZnJpZXN8fHx8fHwxNjQyMjQwOTA4&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1000",
				"https://images.unsplash.com/photo-1506095619733-3c3ea98fb968?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=1000&ixid=MnwxfDB8MXxyYW5kb218MHx8ZGVzc2VydHx8fHx8fDE2NDIyNDEyMzE&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1000",
			],
		};
	},

	async created() {
		await this.getMenu();
		this.categories.forEach((category, index) => {
			let pick = this.randomPick(
				this.menu.filter((item) => item.category === `${category}`)
			);
			pick.photoUrl = this.links[index];
			pick.category = category;
			this.picks.push(pick);
		});
	},

	methods: {
		async getMenu() {
			const menu = await Promise.all([
				getDocs(collection(db, "dishes")),
				getDocs(collection(db, "breakfast")),
				getDocs(collection(db, "drinks")),
				getDocs(collection(db, "snacks")),
				getDocs(collection(db, "desserts")),
			]);
			menu.forEach((query) => query.forEach(this.getItems));
		},

		randomPick(array) {
			return array[Math.floor(Math.random() * array.length)];
		},

		getItems(document) {
			const item = {
				...document.data(),
				id: document.id,
			};
			this.menu.unshift(item);
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

.picks {
	height: 30vh;
	display: flex;
	gap: 1rem;
	padding: 1rem 0;
	overflow-x: scroll;
}
</style>

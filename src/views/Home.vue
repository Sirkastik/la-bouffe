<template>
	<app-header />
	<main>
		<restaurants-section />
		<categories-section />
		<top-picks-section />
	</main>
	<bottom-nav />
</template>

<script>
import AppHeader from "@/components/AppHeader.vue";
import BottomNav from "@/components/AppNav.vue";

import RestaurantsSection from "@/components/SectionRes.vue";
import CategoriesSection from "@/components/SectionCat.vue";
import TopPicksSection from "@/components/SectionPicks.vue";

import { db, collection, getDocs } from "@/services/firebase";
const promises = [
	getDocs(collection(db, "dishes")),
	getDocs(collection(db, "breakfast")),
	getDocs(collection(db, "drinks")),
	getDocs(collection(db, "snacks")),
	getDocs(collection(db, "desserts")),
];

export default {
	components: {
		AppHeader,
		BottomNav,
		RestaurantsSection,
		CategoriesSection,
		TopPicksSection,
	},

	async mounted() {
		let menu = [];
		const responses = await Promise.all(promises);
		responses.forEach((snapshot) =>
			snapshot.forEach((document) => {
				const item = {
					id: document.id,
					...document.data(),
				};
				menu.unshift(item);
			})
		);
		this.$store.dispatch("updateMenu", menu);
	},
};
</script>

<style scoped>
main {
	padding: 1.5rem 1.5rem 5rem 1.5rem;
}
</style>

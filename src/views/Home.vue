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
export default {
	components: {
		AppHeader,
		BottomNav,
		RestaurantsSection,
		CategoriesSection,
		TopPicksSection,
	},
};
</script>

<style scoped>
main {
	padding: 1.5rem;
}
</style>

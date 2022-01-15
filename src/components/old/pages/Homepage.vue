<template>
	<div id="home">
		<home-top />
		<category-sec />
		<rest-sec />
		<span v-if="hasOrders" @click="$router.push('/cart')" class="cart">
			<i class="fas fa-shopping-cart"></i>
		</span>
	</div>
</template>

<script>
import HomeTop from "../utils/HomeTop.vue";
import CategorySec from "../CategorySec.vue";
import RestSec from "../RestSec.vue";
import store from "../../store";
export default {
	components: { HomeTop, CategorySec, RestSec },

	computed: {
		hasOrders() {
			return store.state.hasOrders;
		},
	},
};
</script>

<style scoped>
.cart {
	position: fixed;
	right: 2rem;
	bottom: 2rem;
	z-index: 10;
	background: var(--accent);
	color: var(--main);
	padding: 1rem 1.1rem;
	border-radius: 50%;
	box-shadow: var(--shadow);
}
</style>

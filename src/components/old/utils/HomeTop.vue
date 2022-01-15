<template>
	<div class="top">
		<div class="logo" @click="$router.push('/')">
			<img id="logo" src="../../assets/logo.png" alt="AppLogo" />
		</div>
		<h3 v-if="$route.name === 'Home'" class="name" @click="$router.push('/account')">
			La Bouffe
		</h3>
		<h3 v-if="$route.name === 'Menu'">Menu</h3>
		<div class="search" @click="$router.push('/search')">
			<div class="icon"><i class="fas fa-search"></i></div>
		</div>
	</div>
</template>

<script>
import InputVue from "./Input.vue";
export default {
	components: {
		InputVue,
	},

	data() {
		return {
			searchQuery: "",
			focus: undefined,
		};
	},

	methods: {
		changeFocus(id) {
			this.focus = id;
		},

		search() {
			console.log(this.searchQuery);
			this.searchQuery = "";
		},
	},
};
</script>

<style scoped>
.top {
	display: flex;
	justify-content: space-between;
	align-items: center;
	gap: 1rem;
	padding: 1.5rem;
	margin: 0.4rem;
	border-radius: 0.5rem;
	box-shadow: var(--shadow);
}

.search {
	font-size: 1.2rem;
}

.logo {
	height: 1.6rem;
}

img {
	height: 100%;
}
</style>

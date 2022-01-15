<template>
	<div class="search">
		<div class="search-bar">
			<input-vue
				label="Search"
				id="search"
				:focus="focused"
				v-model:value="searchQuery"
				:value="searchQuery"
				@focus="focus"
				@search="search"
			>
				<template v-slot:icon>
					<div @click="search" class="icon"><i class="fas fa-search"></i></div>
				</template>
			</input-vue>
		</div>
		<div class="results">
			<span v-if="!searchQuery" class="empty"
				>Enter something in the search bar...</span
			>
		</div>
		<p class="back" @click="$router.back()">Back</p>
	</div>
</template>

<script>
import InputVue from "../utils/Input.vue";

export default {
	components: { InputVue },
	data() {
		return {
			searchQuery: "",
			focused: "search",
		};
	},
	methods: {
		focus(id) {
			this.focused = id;
		},
		search() {
			console.log(this.searchQuery);
		},
	},
};
</script>

<style scoped>
.search {
	padding: 1rem 1.5rem;
}
.input-div.focus .icon {
	color: var(--accent);
}

.results {
	display: grid;
	place-content: center;
	height: calc(100vh - 9rem);
}

.empty {
	opacity: 0.7;
}

.back {
	height: 2rem;
	text-align: center;
}
</style>

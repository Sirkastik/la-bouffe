<template>
	<div class="search">
		<div class="search-bar">
			<div class="input-div" :class="{ focus: focused }">
				<div class="input">
					<input
						@keypress.enter.prevent="search"
						type="text"
						v-model="searchQuery"
						@input="search"
						@focus="focused = true"
						@blur="focused = false"
						placeholder="Search"
					/>
				</div>
				<div @click="search" class="icon"><i class="fas fa-search"></i></div>
			</div>
		</div>
		<div class="results">
			<div v-if="!searchQuery" class="empty">
				<span>
					Enter something in the search bar...
				</span>
			</div>
			<div v-else>
				<app-loader />
				<app-loader />
				<app-loader />
				<app-loader />
			</div>
		</div>
		<p class="back" @click="$router.back()">
			<i class="fas fa-arrow-circle-left"></i> Back
		</p>
	</div>
</template>

<script>
import AppLoader from "@/components/AppLoader.vue";
export default {
	components: { AppLoader },
	data() {
		return {
			searchQuery: "",
			focused: true,
		};
	},

	methods: {
		search() {
			console.log(this.searchQuery);
		},
	},

	mounted() {
		document.querySelector("input").focus();
	},
};
</script>

<style scoped>
.search {
	padding: 1rem 1.5rem;
}

.input-div {
	position: relative;
	height: 2.5rem;
	display: flex;
	gap: 0.6rem;
	align-items: center;
	padding: 1rem;
	border-bottom: 2px solid var(--accent);
	border-radius: 0.6rem;
}

.input-div.focus {
	box-shadow: var(--shadow);
	border: none;
}

.input {
	width: 100%;
	color: inherit;
}

.label {
	pointer-events: none;
	font-size: 1rem;
	position: absolute;
	background: var(--bg);
	padding: 0 5px;
	font-size: 0.8em;
	z-index: 1;
}

.input-div.focus input,
.input-div.focus .label {
	color: var(--main);
}

.input-div.focus .icon {
	color: var(--accent);
}

.results {
	margin-top: 2rem;
	width: 100%;
	height: 73vh;
	padding: 1rem;
	border-radius: 0.5rem;
	box-shadow: var(--shadow);
}

.empty {
	height: inherit;
	padding: 0 3rem;
	display: flex;
	justify-content: center;
	align-items: center;
	color: var(--lighter);
	font-size: 0.75em;
	text-transform: uppercase;
	letter-spacing: 1px;
	font-weight: bold;
	text-align: center;
}

.back {
	position: fixed;
	inset: auto 0 1rem 0;
	height: 2rem;
	text-align: center;
	color: var(--lighter);
	font-size: 0.75em;
	text-transform: uppercase;
	letter-spacing: 1px;
	font-weight: bold;
}
</style>

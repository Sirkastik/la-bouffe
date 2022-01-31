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
			<div class="list" v-else>
				<div class="result" v-for="result in results" :key="result.item.id">
					<span class="icon" v-html="icon(result.item.category)"></span>
					<span class="item-name">{{ result.item.name }}</span>
					<span class="item-price">{{ result.item.price }}</span>
					<span class="item-res">{{ result.item.restaurant }}</span>
					<span class="atc" @click="$store.dispatch('addToCart',result.item)">
						<i class="fas fa-cart-plus"></i>
					</span>
				</div>
			</div>
		</div>
		<p class="back" @click="$router.back()">
			<i class="fas fa-arrow-circle-left"></i> Back
		</p>
	</div>
</template>

<script>
import Fuse from "fuse.js";
import { mapState } from "vuex";
export default {
	data() {
		return {
			searchQuery: "",
			focused: true,
		};
	},

	created() {
		console.log(this.cart);
	},

	computed: {
		...mapState(["menu", "cart"]),
		results() {
			return new Fuse(this.menu, {
				keys: ["category", "restaurant", "name"],
			}).search(this.searchQuery);
		},
		icons() {
			return {
				breakfast: "coffee",
				dishes: "utensils",
				drinks: "cocktail",
				snacks: "hamburger",
				desserts: "cookie",
			};
		},
	},

	methods: {
		icon(category) {
			let icon = this.icons[category];
			return `<i class="fas fa-${icon}"></i>`;
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
	overflow: scroll;
}

.empty {
	height: 90%;
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

.list {
	display: flex;
	flex-direction: column;
	gap: 1rem;
	padding: 1rem 0;
	width: 100%;
	animation: slide 1s ease-in-out both;
}

@keyframes slide {
	from {
		transform: translateX(70vh);
	}
	to {
		transform: translateX(0);
	}
}

.result {
	display: flex;
	align-items: center;
	gap: 0.5rem;
	box-shadow: var(--shadow);
	height: 3rem;
	border-radius: 0.25rem;

	background: var(--color);
	color: var(--main);
	font-size: 0.8em;
	text-transform: uppercase;
	letter-spacing: 1px;
	font-weight: bold;
}

.icon {
	height: 3rem;
	background: var(--color);
	color: var(--main);
	padding: 0 0.5rem;
	display: grid;
	place-content: center;
	border-radius: 0.25rem 0 0 0.25rem;
}

.item-name {
	margin-right: auto;
	padding-left: 1rem;
}

.item-price {
	flex-shrink: 1;
	padding-right: 1rem;
}

.item-res {
	width: 4rem;
	font-size: 0.8em;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}

.atc {
	height: 3rem;
	background: var(--color);
	color: var(--main);
	padding: 0 0.5rem;
	display: grid;
	place-content: center;
	border-radius: 0 0.25rem 0.25rem 0;
}
</style>

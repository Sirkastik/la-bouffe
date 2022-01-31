<template>
	<app-header />
	<main>
		<h3 class="doc">
			{{ doc }}
			<span class="icon" v-html="icon"></span>
		</h3>
		<div class="list">
			<div v-for="item in items" v-bind:key="item.id" class="list-item">
				<span class="item-name">{{ item.name }}</span>
				<span class="item-price">@{{ item.price }}</span>
				<span class="item-res">{{ item.restaurant }}</span>
				<span
					class="atc"
					@click="
						$store.dispatch('addToCart', item);
						this.$toast.default('Added to cart...');
					"
				>
					<i class="fas fa-cart-plus"></i>
				</span>
			</div>
		</div>
	</main>
	<bottom-nav />
</template>

<script>
import AppHeader from "@/components/AppHeader.vue";
import BottomNav from "@/components/AppNav.vue";
import { db, collection, getDocs } from "@/services/firebase";

export default {
	components: { AppHeader, BottomNav },
	data() {
		return {
			items: [],
		};
	},

	async created() {
		const docSnap = await getDocs(collection(db, this.doc));
		docSnap.forEach(this.getItems);
	},

	computed: {
		doc() {
			return this.$route.params.doc;
		},

		icon() {
			let icon = this.icons[this.doc];
			return `<i class="fas fa-${icon}"></i>`;
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
		getItems(document) {
			const item = {
				...document.data(),
				id: document.id,
			};
			this.items.unshift(item);
		},
	},
};
</script>

<style scoped>
main {
	padding: 1.5rem;
}

.doc {
	text-align: center;
	font-size: 1.1em;
	text-transform: uppercase;
	letter-spacing: 1px;
	font-weight: bold;

	padding: 0.5rem 0;
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

.list-item {
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

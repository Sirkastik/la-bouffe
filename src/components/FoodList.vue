<template>
	<div class="list">
		<div class="list-item" v-for="item in list" :key="item.id">
			<span class="icon" v-html="icon"></span>
			<span class="item-name">{{ item.name }}</span>
			<span class="item-price">Ksh.{{ item.price }}</span>
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
</template>

<script>
export default {
	props: ["list", "category"],

	computed: {
		icon() {
			let icon = this.icons[this.category];
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
};
</script>

<style scoped>
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
	justify-content: space-between;
	align-items: center;
	box-shadow: var(--shadow);
	height: 3rem;
	border-radius: 0.25rem;

	color: var(--lighter);
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

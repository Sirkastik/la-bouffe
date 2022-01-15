<template>
	<div class="cart route-slide">
		<div class="top">
			<h2 class="title">
				<span class="back" @click="$router.back()"
					><i class="fas fa-chevron-left"></i
				></span>
				Cart
			</h2>
			<span>
				<i class="fas fa-shopping-cart"></i>
			</span>
		</div>

		<div class="section">
			<div class="empty" v-if="!cart.length">Cart is empty</div>
			<div class="cart-contents" v-else>
				<div class="product" v-for="product in cart" :key="product.id">
					<div class="details">
						<div class="name">{{ product.name }}</div>
						<div class="res">{{ product.restaurant }}</div>
						<div class="price">@ {{ formatPrice(product.price) }}</div>
					</div>
					<div class="quantity">
						<i class="fas fa-minus"></i>
						<span>{{ product.quantity }}</span>
						<i class="fas fa-plus"></i>
					</div>
					<div class="right">
						<span class="delete" @click="deleteFromCart(product.id)">
							<i class="fas fa-trash"></i>
						</span>
						<span class="totalLabel">Total:</span>
						<span class="total">
							{{
								formatPrice(
									parseInt(product.price) * parseInt(product.quantity)
								)
							}}
						</span>
					</div>
				</div>
				<div class="order-summary">
					<div class="summary-title">Order Summary</div>
					<div class="summary-content">
						<div class="grand-total">
							<span class="left">Grand Total</span
							><span class="right">Ksh. {{ formatPrice(subTotal) }}</span>
						</div>
					</div>
					<button class="checkout">Checkout</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			cart: [],
		};
	},

	created() {
		const obj = JSON.parse(localStorage.getItem("foodCart"));
		this.cart = obj ? obj : [];
	},

	computed: {
		subTotal() {
			let total = 0;
			this.cart.forEach(
				(item) => (total += parseInt(item.price) * parseInt(item.quantity))
			);
			return total;
		},
	},

	methods: {
		formatPrice(value) {
			return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		},
		add(product) {
			const quantity = product.quantity + 1;
			this.updateCart(quantity, product.id);
		},

		minus(product) {
			const quantity = product.quantity - 1;
			if (quantity === 0) this.deleteFromCart(product.id);
			else this.updateCart(quantity, product.id);
		},

		updateCart(quantity, id) {
			const cart = this.cart.map((item) => {
				if (item.id === id) return { ...item, quantity: quantity };
				return item;
			});
			localStorage.setItem("foodCart", JSON.stringify(cart));
			this.cart = JSON.parse(localStorage.getItem("foodCart"));
		},
		deleteFromCart(id) {
			const cart = this.cart.filter((item) => item.id !== id);
			console.log(cart);
			localStorage.setItem("foodCart", JSON.stringify(cart));
			this.cart = JSON.parse(localStorage.getItem("foodCart"));
		},
	},
};
</script>

<style scoped>
.top {
	padding: 1.5rem;
	font-weight: bold;
	display: flex;
	justify-content: space-between;
	align-items: center;
	height: 2rem;
		text-transform: uppercase;
	letter-spacing: 1px;
}

h2 {
	display: flex;
	align-items: center;
	gap: 0.5rem;
}

.back {
	cursor: pointer;
	font-size: 0.75rem;
	box-shadow: var(--shadow);
	color: var(--main);
	border: 1px solid rgba(128, 128, 128, 0.247);
	height: 1.5rem;
	aspect-ratio: 1/1;
	display: grid;
	place-content: center;
	border-radius: 50%;
}

.section {
	padding: 0 1.5rem;
	height: calc(100vh - 3rem);
	overflow-y: scroll;
}
.empty {
	width: 100%;
	height: 100%;
	display: grid;
	place-content: center;
	opacity: 0.5;
}

.cart-contents {
	padding-top: 1rem;
	display: flex;
	flex-direction: column;
	gap: 1rem;
}

.product {
	width: 100%;
	height: 25vw;
	display: flex;
	align-items: center;
	gap: 1rem;
	padding-right: 1rem;

	border-radius: 0.75rem;
	overflow: hidden;
	box-shadow: var(--shadow);
}

.icon {
	width: 15vw;
	aspect-ratio: 1/1;
	display: grid;
	place-content: center;
}

.details {
	flex: 1;
	padding: 0 1.5rem;
	display: flex;
	flex-direction: column;
	gap: 0.25rem;
}

.name {
	font-size: 0.9em;
	text-transform: uppercase;
	letter-spacing: 1px;
	font-weight: bold;

	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}

.res {
	color: var(--lighter);
	font-size: 0.7em;
	text-transform: uppercase;
	letter-spacing: 1px;
	font-weight: bold;
}

.price {
	font-size: 0.9em;
	color: var(--lighter);
	opacity: 0.5;
}

.quantity {
	display: flex;
	align-items: center;
	padding-right: 2rem;
	gap: 0.5rem;
}

.quantity > * {
	cursor: pointer;
	opacity: 0.5;
}

.quantity > span {
	cursor: default;
	opacity: 0.8;
	font-weight: bold;
}

.right {
	display: flex;
	flex-direction: column;
	align-items: center;
}

.delete {
	font-size: 1.1rem;
}

.totalLabel {
	opacity: 0.5;
}

.total {
	font-weight: bold;
}

.order-summary {
	background: var(--color);
	color: var(--lighter);
	padding: 1.25rem;
	box-shadow: var(--shadow);
	border-radius: 0.75rem;
	margin-block: 1rem 2rem;
}

.summary-title {
	font-size: 1em;
	text-transform: uppercase;
	letter-spacing: 1px;
	font-weight: bold;

	text-align: center;
}

.summary-content {
	display: flex;
	flex-direction: column;
	gap: 0.75rem;
	margin-block: 1rem 1.5rem;
}

.grand-total {
	display: flex;
	justify-content: space-between;
	opacity: 1;
	font-size: 0.85rem;
	text-transform: uppercase;
	letter-spacing: 1px;
}

.checkout {
	cursor: pointer;
	width: 100%;
	display: block;
	padding: 0.3rem 1rem;
	font-size: 1em;
	text-transform: uppercase;
	font-weight: bold;
	text-align: center;
	padding: .75rem 0;
	border: 1px solid var(--lighter); 
	color: var(--main);
	border-radius: 0.5rem;
}
</style>

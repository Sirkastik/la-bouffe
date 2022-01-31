<template>
	<div class="cart route-slide">
		<div class="top">
			<h2 class="title">
				<span class="back" @click="$router.back()">
					<i class="fas fa-chevron-left"></i>
				</span>
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
						<div class="price">@ {{ product.price }}</div>
					</div>
					<div class="quantity">
						<span @click="$store.dispatch('minusQuantity', product.id)">
							<i class="fas fa-minus"></i>
						</span>
						<span>{{ product.quantity }}</span>
						<span @click="$store.dispatch('addQuantity', product.id)">
							<i class="fas fa-plus"></i>
						</span>
					</div>
					<div class="right">
						<span
							class="delete"
							@click="$store.dispatch('deleteFromCart', product.id)"
						>
							<i class="fas fa-trash"></i>
						</span>
						<span class="totalLabel">Total:</span>
						<span class="total">
							{{ parseInt(product.price) * parseInt(product.quantity) }}
						</span>
					</div>
				</div>
				<div class="order-summary">
					<div class="summary-title">Order Summary</div>
					<div class="summary-content">
						<div class="grand-total">
							<span class="left">Grand Total</span
							><span class="right">Ksh. {{ subTotal }}</span>
						</div>
					</div>
					<button class="complete" @click="showModal = true">
						Complete Order
					</button>
				</div>
			</div>
		</div>
	</div>
	<customer-info-modal
		@close="showModal = false"
		@checkout="handleCheckout"
		v-if="showModal"
	/>
</template>

<script>
import { mapState } from "vuex";
import CustomerInfoModal from "@/components/modals/CustomerInfo";
import { db, addDoc, getDoc, collection } from "@/services/firebase";
export default {
	components: { CustomerInfoModal },
	data() {
		return {
			showModal: false,
		};
	},

	computed: {
		...mapState(["cart"]),
		subTotal() {
			let total = 0;
			this.cart.forEach(
				(item) => (total += parseInt(item.price) * parseInt(item.quantity))
			);
			return total;
		},
		orders() {
			let orders = [];
			this.restaurants.forEach((restaurant) => {
				const order = {
					restaurant: restaurant,
					orders: this.cart.filter((item) => item.restaurant === restaurant),
				};
				orders.push(order);
			});
			return orders;
		},
		restaurants() {
			let restaurants = [];
			this.cart.forEach((item) => {
				if (!restaurants.includes(item.restaurant))
					restaurants.push(item.restaurant);
			});
			return restaurants;
		},
	},

	methods: {
		async handleCheckout(customerInfo) {
			this.showModal = false;
			try {
				this.orders.forEach(async (order) => {
					const newOrderRef = await addDoc(collection(db, "orders"), {
						customer: customerInfo,
						restaurant: order.restaurant,
						orders: order.orders,
						accepted: "pending",
					});
					const newOrderSnapshot = await getDoc(newOrderRef);
					console.log(newOrderSnapShot.data());
				});
			} catch (error) {
				this.$toast.error("Error...");
				console.log(error);
			}
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
	height: 25vw;
	display: flex;
	align-items: center;
	gap: 1rem;
	padding-inline: 1rem;

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
	font-size: 0.9em;
	flex: 1;
	display: flex;
	flex-direction: column;
	gap: 0.25rem;
}

.name {
	font-size: 0.95em;
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

.complete {
	cursor: pointer;
	width: 100%;
	display: block;
	padding: 0.3rem 1rem;
	font-size: 1em;
	text-transform: uppercase;
	font-weight: bold;
	text-align: center;
	padding: 0.75rem 0;
	border: 1px solid var(--lighter);
	color: var(--main);
	border-radius: 0.5rem;
}
</style>

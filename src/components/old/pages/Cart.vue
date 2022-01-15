<template>
	<div class="product">
		<div class="top">
			<h2 class="title">Cart</h2>
			<span>
				<i class="fas fa-shopping-cart"></i>
			</span>
		</div>

		<div class="section">
			<span class="empty" v-if="!cart[0]">Cart is empty</span>
			<div class="cart" v-else>
				<div class="order" v-for="(order, index) in cart" :key="order.id">
					<div class="num">
						<span>{{ index + 1 }}</span>
					</div>
					<div class="info">
						<div class="name">
							<span class="left">Name: </span> <span>{{ order.name }}</span>
						</div>
						<div class="price">
							<span class="left">Price: </span> <span>{{ order.price }}</span>
						</div>
						<div class="res">
							<span class="left">Restaurant: </span>
							<span>{{ order.restaurant }}</span>
						</div>
					</div>
					<div class="btns" @click="deleteCookie(index)">
						<span><i class="fas fa-trash"></i></span>
					</div>
				</div>
			</div>
		</div>
		<div class="total">
			Total: <span>{{ total }}</span>
			<span class="checkout" @click="checkOut">Checkout</span>
		</div>
		<p class="back" @click="$router.back()"><i class="fas fa-home"></i></p>
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
		this.getCookie();
	},

	computed: {
		total() {
			if (!this.cart[0]) return 0;
			let total = 0;
			this.cart.forEach((order) => (total += parseInt(order.price)));
			return total;
		},
	},
	methods: {
		getCookie() {
			let decodedCookie = decodeURIComponent(document.cookie);
			let cookieArr = decodedCookie.split("; ");
			cookieArr = cookieArr.filter((cookie) => cookie.startsWith("order"));
			let orders = cookieArr.map((cookie) => this.getOrder(cookie));
			orders = orders.map((order) => JSON.parse(order));
			this.cart = [...orders];
			if (!this.cart[0]) {
				this.$store.dispatch("initOrders", false);
				this.$router.push("/");
			}
		},

		getOrder(cookie) {
			const [, order] = cookie.split("=");
			return order;
		},

		deleteCookie(index) {
			document.cookie = `order:${this.cart[index].id}=; expires=Sun, 20 Aug 1990 12:00:00 UTC`;
			this.getCookie();
		},

		checkOut() {
			console.log(this.cart);
		}
	},
};
</script>

<style scoped>
.product {
	position: relative;
	padding: 1rem 1.5rem;
	min-height: 100vh;
}
.top {
	display: flex;
	justify-content: space-between;
	align-items: center;
	height: 2rem;
}
.section {
	min-height: calc(100vh - 12rem);
	padding: 1rem 0;
	/* display: grid;
	place-content: center; */
}
.empty {
	margin: auto;
	opacity: 0.5;
}

.order {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 1rem;
	box-shadow: var(--shadow);
}

.left,
.num {
	font-size: 1.1em;
	font-weight: bold;
}

.info {
	flex: 1;
}

.num {
	width: 8%;
}

.btns {
	background: var(--main);
	color: var(--color);
	font-size: 0.9rem;
	padding: 0.4rem 0.6rem;
	border-radius: 50%;
}

.total {
	text-align: center;
	padding: 1rem;
	background: var(--main);
	color: var(--color);
	border-radius: 0.4rem;
	font-size: 1.1rem;
}

.back {
	height: 2rem;
	text-align: center;
	position: absolute;
	bottom: 1rem;
	left: 0;
	right: 0;
}
</style>

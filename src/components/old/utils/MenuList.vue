<template>
	<div class="container">
		<div v-for="item in items" :key="item.id" class="item">
			<div class="name">{{ item.name }}</div>
			<!-- <div class="quantity">{{ item.quantity }}</div> -->
			<div class="price">{{ item.price }}</div>
			<h5 @click="addToCart(item)" class="add">
				<i class="fas fa-cart-plus"></i>
			</h5>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		items: {
			type: Array,
		},
	},

	methods: {
		addToCart(item) {
			const order = JSON.stringify(item);
			const cookie = `order:${item.id}=${order}`;
			this.setCookie(cookie);
			this.getCookie();
		},
		setCookie(cookie) {
			const D = new Date();
			D.setTime(D.getTime() + 1 * 24 * 60 * 60 * 1000);
			let expires = "expires=" + D.toUTCString();
			document.cookie = `${cookie} ;${expires}`;
		},
		getCookie() {
			let decodedCookie = decodeURIComponent(document.cookie);
			let cookieArr = decodedCookie.split("; ");
			cookieArr = cookieArr.filter((cookie) => cookie.startsWith("order"));
			let orders = cookieArr.map((cookie) => {
				const [, order] = cookie.split("=");
				return order;
			});
			orders = orders.map((order) => JSON.parse(order));
			this.$toast.success("Added to cart...");
			// app.$toast.error(message,?options)
			// app.$toast.warning(message,?options)
			// app.$toast.info(message,?options)
			// app.$toast.default(message,?options)
			if (orders[0]) this.$store.dispatch("initOrders", true);
		},
	},
};
</script>

<style scoped>
.container {
	padding: 1rem;
	/* background: var(--accent); */
	border: 1px double var(--main);
	border-radius: 0.5rem;
	display: flex;
	flex-direction: column;
	gap: 1rem;
	min-height: 60vh;
	margin-bottom: 2rem;
}

.item {
	display: flex;
	justify-content: space-between;
	align-items: center;
	gap: 1rem;

	padding-bottom: 0.5rem;
	border-bottom: 1px double var(--main);
}

.name {
	flex: 2;
}

h5 {
	padding-right: 0.5rem;
}

.price {
	flex-grow: 1;
	font-weight: bold;
}
</style>

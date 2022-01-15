<template>
	<div class="menu">
		<home-top />
		<div class="contents">
			<h3 class="doc">
				<span class="cap">{{ $route.params.doc }}</span> <span>Price</span>
				<span class="atc">Cart+</span>
			</h3>
			<div v-for="item in items" v-bind:key="item.id" class="item">
				<span class="left">{{ item.name }}</span>
				<span class="right">{{ item.price }}</span>
				<span @click="addToCart(item)" class="add">
					<i class="fas fa-cart-plus"></i>
				</span>
			</div>
		</div>
		<h4 @click="$router.push('/')"><i class="fas fa-home"></i></h4>
	</div>
</template>

<script>
import { db, collection, getDocs, query, where } from "../includes/firebase";
import HomeTop from "./utils/HomeTop.vue";

export default {
	components: {
		HomeTop,
	},
	data() {
		return {
			items: [],
		};
	},

	async created() {
		const docSnap = await getDocs(collection(db, this.$route.params.doc));
		docSnap.forEach(this.getItems);
	},

	methods: {
		getItems(document) {
			const item = {
				...document.data(),
				id: document.id,
			};
			this.items.unshift(item);
		},
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
			this.$toast.success('Added to cart...')
			if (orders[0]) this.$store.dispatch("initOrders", true);
		},
	},
};
</script>

<style scoped>
.menu {
	padding-bottom: 2rem;
}

h2 {
	text-transform: capitalize;
	text-align: center;
	padding-top: 0.7rem;
}

.cap {
	text-transform: capitalize;
	flex: 1;
}

.atc {
	font-size: small;
	width: fit-content;
	padding-left: 1rem;
}

.item,
.doc {
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.doc {
	padding: 0.5rem 0.3rem;
	border-bottom: 1px solid var(--main);
	margin-bottom: 0.9rem;
}
.item {
	padding: 0.7rem 0.4rem;
}

.right {
	text-align: center;
	flex-grow: 1;
}

.left {
	flex: 2;
	font-weight: 600;
}

.contents {
	/* background: var(--accent); */
	border-radius: 0.5rem;
	box-shadow: var(--shadow);

	/* border: 1px solid var(--main); */
	padding: 1rem 1.5rem;
	margin: 1rem 1rem;
}

h4 {
	margin-top: 2rem;
	text-align: center;
}
</style>

<template>
	<div class="restPage">
		<div v-if="info" class="img">
			<img :src="info.photoUrl" alt="" />
		</div>
		<h3 v-if="info" class="title">{{ info.restaurantName }}</h3>
		<!-- <span class="back"><i class="fas fa-arrow-left"></i></span> -->
		<div class="back" @click="$router.push('/')">
			<span class="down" style="--size: 2">
				<i class="fas fa-chevron-down"></i>
			</span>
			<span class="down" style="--size: 3">
				<i class="fas fa-chevron-down"></i>
			</span>
		</div>
		<div class="wrapper">
			<h1>
				<span @click="prev"><i class="fas fa-chevron-left"></i></span>
				<div class="name">{{ listName }}</div>
				<span @click="next"><i class="fas fa-chevron-right"></i></span>
			</h1>
			<div class="list contents" v-if="listName === 'breakfast'">
				<div
					class="breakfast list-item"
					v-for="item in breakfast"
					:key="item.id"
				>
					<span class="icon"><i class="fas fa-coffee"></i></span>
					<span class="item-name">{{ item.name }}</span>
					<span class="item-price">Ksh.{{ item.price }}</span>
					<span class="atc" @click="addToCart(item)">
						<i class="fas fa-cart-plus"></i>
					</span>
				</div>
			</div>
			<div class="list contents" v-if="listName === 'dishes'">
				<div class="dishes list-item" v-for="item in dishes" :key="item.id">
					<span class="icon"><i class="fas fa-utensils"></i></span>
					<span class="item-name">{{ item.name }}</span>
					<span class="item-price">Ksh.{{ item.price }}</span>
					<span class="atc" @click="addToCart(item)">
						<i class="fas fa-cart-plus"></i>
					</span>
				</div>
			</div>
			<div class="list contents" v-if="listName === 'drinks'">
				<div class="drinks list-item" v-for="item in drinks" :key="item.id">
					<span class="icon"><i class="fas fa-cocktail"></i></span>
					<span class="item-name">{{ item.name }}</span>
					<span class="item-price">Ksh.{{ item.price }}</span>
					<span class="atc" @click="addToCart(item)">
						<i class="fas fa-cart-plus"></i>
					</span>
				</div>
			</div>
			<div class="list contents" v-if="listName === 'desserts'">
				<div class="desserts list-item" v-for="item in desserts" :key="item.id">
					<span class="icon"><i class="fas fa-cookie"></i></span>
					<span class="item-name">{{ item.name }}</span>
					<span class="item-price">Ksh.{{ item.price }}</span>
					<span class="atc" @click="addToCart(item)">
						<i class="fas fa-cart-plus"></i>
					</span>
				</div>
			</div>
			<div class="list contents" v-if="listName === 'snacks'">
				<div class="snacks list-item" v-for="item in snacks" :key="item.id">
					<span class="icon"><i class="fas fa-hamburger"></i></span>
					<span class="item-name">{{ item.name }}</span>
					<span class="item-price">Ksh.{{ item.price }}</span>
					<span class="atc" @click="addToCart(item)">
						<i class="fas fa-cart-plus"></i>
					</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import {
	db,
	doc,
	collection,
	getDoc,
	getDocs,
	query,
	where,
} from "@/includes/firebase";

export default {
	data() {
		return {
			menu: [],
			resDetails: {},
			categories: ["breakfast", "dishes", "drinks", "snacks", "desserts"],
			chosen: 0,
			cart: null,
		};
	},

	async created() {
		this.cart = JSON.parse(localStorage.getItem("foodCart"));
		const resSnap = await getDoc(doc(db, "restaurants", this.id));
		this.resDetails = resSnap.data();
		await this.getMenu();
	},

	computed: {
		id() {
			return this.$route.params.id;
		},
		info() {
			return this.resDetails.info;
		},
		listName() {
			return this.tabList[this.chosen];
		},
		breakfast() {
			return this.menu.filter((item) => item.category === "breakfast");
		},
		dishes() {
			return this.menu.filter((item) => item.category === "dishes");
		},
		snacks() {
			return this.menu.filter((item) => item.category === "snacks");
		},
		desserts() {
			return this.menu.filter((item) => item.category === "desserts");
		},
		drinks() {
			return this.menu.filter((item) => item.category === "drinks");
		},
		tabList() {
			let list = [];
			this.categories.forEach((category) => {
				let array = this.menu.filter((item) => item.category === `${category}`);
				if (array.length) list.push(category);
			});
			return list;
		},
	},

	methods: {
		getItems(document) {
			const item = {
				...document.data(),
				id: document.id,
			};
			this.menu.unshift(item);
		},

		async getMenu() {
			const menu = await Promise.all([
				getDocs(query(collection(db, "dishes"), where("uid", "==", this.id))),
				getDocs(
					query(collection(db, "breakfast"), where("uid", "==", this.id))
				),
				getDocs(query(collection(db, "drinks"), where("uid", "==", this.id))),
				getDocs(query(collection(db, "snacks"), where("uid", "==", this.id))),
				getDocs(query(collection(db, "desserts"), where("uid", "==", this.id))),
			]);
			menu.forEach((query) => query.forEach(this.getItems));
		},

		next() {
			const max = this.tabList.length - 1;
			if (this.chosen === max) this.chosen = 0;
			else this.chosen += 1;
		},
		prev() {
			if (this.chosen === 0) this.chosen = this.tabList.length - 1;
			else this.chosen -= 1;
		},

		addToCart(item) {
			const cart = this.cart ? this.addItem(item) : [item];
			localStorage.setItem("foodCart", JSON.stringify(cart));
		},

		addItem(item) {
			let cart = this.cart;
			if (this.inCart(item)) return cart;
			cart.push(item);
			return cart;
		},

		inCart(newItem) {
			return this.cart && this.cart.some((item) => item.id === newItem.id);
		},
	},
};
</script>

<style scoped>
.restPage {
	text-align: center;
	min-height: 100vh;
}

.img {
	height: 30vh;
	border-radius: 0 0 2rem 2rem;
	overflow: hidden;
}

img {
	object-position: 0 -20vh;
	width: 100%;
	aspect-ratio: 4/5;
	filter: brightness(80%);
}

.title {
	position: absolute;
	inset: 26vh 0 auto 0;
	width: max-content;
	z-index: 10;
	margin: auto;
	padding: 1rem 2.5rem;
	border-radius: 0.5rem;

	font-size: 0.9em;
	text-transform: uppercase;
	letter-spacing: 1px;
	font-weight: bold;
	box-shadow: var(--shadow);
	color: var(--main);
}

.title::before {
	content: "";
	position: absolute;
	inset: 0;
	z-index: -1;
	background: var(--grad);
	background-size: 500%;
	background-position: center;
	opacity: 0.97;
	border-radius: inherit;
}

.back {
	position: absolute;
	inset: 1rem auto auto 1rem;
	z-index: 5;
	display: flex;
	flex-direction: column;
	align-items: center;
	color: var(--main);
	padding: 0.5rem;
	border-radius: 1rem;
}

.back::before {
	content: "";
	position: absolute;
	inset: 0;
	z-index: -1;
	background: var(--grad);
	background-size: 500%;
	background-position: center;
	opacity: 0.9;
	border-radius: inherit;
}

.down {
	font-size: calc(0.2rem * var(--size));
}

h1 {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0 0.5rem;
}

h1 > span {
	height: 1.5rem;
	width: 1.5rem;
	display: grid;
	place-content: center;
	font-size: 0.75rem;
	border-radius: 50%;
	background: var(--color);
	color: var(--main);
	box-shadow: var(--shadow);
}

.name {
	color: var(--lighter);
	display: inline-block;
	font-size: 1em;
	text-transform: uppercase;
	letter-spacing: 1px;
	font-weight: bold;
}

.wrapper {
	margin-top: 1.5rem;
	padding: 1rem 1rem;
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

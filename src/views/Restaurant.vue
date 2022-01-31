<template>
	<div class="restPage">
		<div v-if="info" class="img">
			<img :src="info.photoUrl" alt="" />
		</div>
		<h3 v-if="info" class="title">{{ info.restaurantName }}</h3>
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
			<food-list :list="currentList" :category="listName"></food-list>
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
} from "@/services/firebase";

import FoodList from "@/components/FoodList";

export default {
	components: { FoodList },

	data() {
		return {
			menu: [],
			restaurantDetails: {},
			categories: ["breakfast", "dishes", "drinks", "snacks", "desserts"],
			chosen: 0,
		};
	},

	async created() {
		const restaurantSnapShot = await getDoc(doc(db, "restaurants", this.id));
		this.restaurantDetails = restaurantSnapShot.data();
		await this.getMenu();
	},

	computed: {
		foodList() {
			return {
				breakfast: this.menu.filter((item) => item.category === "breakfast"),
				dishes: this.menu.filter((item) => item.category === "dishes"),
				drinks: this.menu.filter((item) => item.category === "drinks"),
				snacks: this.menu.filter((item) => item.category === "snacks"),
				desserts: this.menu.filter((item) => item.category === "desserts"),
			};
		},
		id() {
			return this.$route.params.id;
		},
		info() {
			return this.restaurantDetails.info;
		},
		listName() {
			return this.tabList[this.chosen];
		},
		currentList() {
			return this.foodList[this.listName];
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
		async getMenu() {
			const responses = await Promise.all([
				getDocs(query(collection(db, "dishes"), where("uid", "==", this.id))),
				getDocs(
					query(collection(db, "breakfast"), where("uid", "==", this.id))
				),
				getDocs(query(collection(db, "drinks"), where("uid", "==", this.id))),
				getDocs(query(collection(db, "snacks"), where("uid", "==", this.id))),
				getDocs(query(collection(db, "desserts"), where("uid", "==", this.id))),
			]);

			responses.forEach((query) =>
				query.forEach((document) => {
					const item = {
						...document.data(),
						id: document.id,
					};
					this.menu.unshift(item);
				})
			);
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
	},
};
</script>

<style scoped>
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
</style>

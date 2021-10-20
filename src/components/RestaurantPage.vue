<template>
	<div class="restaurant">
		<h2>Welcome to {{ displayName }}</h2>
		<nav>
			<h3>Menu</h3>
			<!-- <h3>Records</h3>
			<h3>Account</h3> -->
			<h3 @click="getDetails">Restaurant Details</h3>
		</nav>
		<section>
			<div class="menu">
				<div class="drinks">
					<h3>Drinks</h3>
					<div
						v-for="item in drinks"
						v-bind:key="item.id"
						class="item"
					>
						<span>Name : {{ item.name }}</span> -
						<span>Price : {{ item.price }}</span> -
						<span>Type: {{ item.type }}</span>
					</div>
				</div>
				<div class="dishes">
					<h3>Dishes</h3>
					<div
						v-for="item in dishes"
						v-bind:key="item.id"
						class="item"
					>
						<span>Name : {{ item.name }}</span> -
						<span>Price : {{ item.price }}</span> -
						<span>Type: {{ item.type }}</span>
					</div>
				</div>
				<div class="foodItems">
					<h3>Food items</h3>
					<div
						v-for="item in foodItems"
						v-bind:key="item.id"
						class="item"
					>
						<span>Name : {{ item.name }}</span> -
						<span>Price : {{ item.price }}</span> -
						<span>Type: {{ item.type }}</span>
					</div>
				</div>
			</div>
			<div class="plus">
				<h1 @click="showModal = true">+</h1>
			</div>
		</section>
		<section v-if="showDetails">
      <h5>Details Section</h5>
    </section>
		<p @click="handleSignout">
			Sign Out
			<button class="sign">
				<i class="fas fa-sign-out-alt"></i>
			</button>
		</p>
	</div>
	<div class="modal" v-if="showModal">
		<h5 @click="showModal = false">x</h5>
		<h3>Add a item to the menu:</h3>
		<form>
			<div class="input">
				<h5>Item type:</h5>
				<div class="selects">
					<div class="selected">
						<span>{{ selType }}</span>
					</div>
				</div>
				<span>
					<i class="fas fa-caret-down"></i>
				</span>
			</div>
			<div class="select">
				<h4 class="sel" v-for="(type, index) in itemType" :key="index">
					<span @click="selType = type">{{ type }}</span>
				</h4>
			</div>
			<div class="input" v-if="selType">
				<h5>{{ selType }} Name:</h5>

				<input
					@keypress.enter.prevent="changeFocus"
					type="text"
					id="0"
					v-model="dishName"
				/>
			</div>
			<div class="input" v-if="selType">
				<h5>{{ selType }} Price:</h5>

				<input
					@keypress.enter.prevent="changeFocus"
					type="text"
					id="1"
					v-model="dishPrice"
				/>
			</div>
			<button class="long" @click.prevent="handleSubmit">Submit</button>
		</form>
	</div>
</template>

<script>
import {
	auth,
	db,
	doc,
	collection,
	getDoc,
	getDocs,
	addDoc,
	deleteDoc,
	query,
	where,
} from "../includes/firebase";
export default {
	name: "RestaurantPage",

	data() {
		return {
			showModal: false,
			selType: "",
			dishName: "",
			dishPrice: "",
			itemType: ["Food Item", "Dish", "Drink"],
			menu: [],
			dishes: [],
			foodItems: [],
			drinks: [],
      resDetails: {},
			showDetails: false,
		};
	},

	async created() {
		const dishSnapshot = await getDocs(
			query(
				collection(db, "dishes"),
				where("uid", "==", auth.currentUser.uid)
			)
		);
		dishSnapshot.forEach(this.getItems);
		const foodItemsSnapshot = await getDocs(
			query(
				collection(db, "foodItems"),
				where("uid", "==", auth.currentUser.uid)
			)
		);
		foodItemsSnapshot.forEach(this.getItems);
		const drinksSnapshot = await getDocs(
			query(
				collection(db, "drinks"),
				where("uid", "==", auth.currentUser.uid)
			)
		);
		drinksSnapshot.forEach(this.getItems);
	},

	computed: {
		displayName() {
			return auth.currentUser.displayName;
		},
		collection() {
			return this.selType == "Dish"
				? "dishes"
				: this.selType == "Drink"
				? "drinks"
				: "foodItems";
		},
	},

	methods: {
		getItems(document) {
			const item = {
				...document.data(),
				id: document.id,
			};
      console.log(item);
			if (item.type == "Dish") {
				this.dishes.unshift(item);
			} else if (item.type == "Food Item") {
				this.foodItems.unshift(item);
			} else if (item.type == "Drink") {
				this.drinks.unshift(item);
			}
		},

		async handleSubmit() {
			try {
				const newEntryRef = await addDoc(
					collection(db, this.collection),
					{
						uid: auth.currentUser.uid,
						type: this.selType,
						name: this.dishName,
						price: this.dishPrice,
					}
				);
				const newEntrySnapshot = await getDoc(newEntryRef);
				this.getItems(newEntrySnapshot);
				this.showModal = false;
			} catch (error) {
				alert("Couldn't Add Item");
				console.log(error);
			}
		},

		async handleSignout() {
			await this.$store.dispatch("signOut");
			this.$router.push("/");
		},

		async getDetails() {
			const resSnap = await getDoc(doc(db, "restaurants", auth.currentUser.uid));
      this.resDetails = resSnap.data()
      this.showDetails = true;
      console.log(this.resDetails);
		},
	},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.restaurant {
	text-align: center;
	padding: 1rem;
	min-height: 97vh;
	position: relative;
}

h2 {
	margin: 1rem;
}
.sign {
	all: unset;
	cursor: pointer;
	color: inherit;
}

nav {
	display: flex;
	justify-content: space-between;
}

section {
	height: 60vh;
	display: grid;
	place-content: center;
}

.modal {
	position: fixed;
	inset: 0;
	z-index: 10;
	padding: 3rem 3rem;
	background: var(--bg);
}

.input {
	height: 3rem;
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin: 0.3rem 0;
	padding: 9px;
	border: 2px solid var(--main);
	border-radius: 0.6rem;
	box-shadow: var(--shadow);
}

input {
	all: unset;
	text-align: start;
	width: 100%;
}

.select {
	display: flex;
	flex-wrap: wrap;
	gap: 0.4rem;
	font-size: 0.8rem;
	background: var(--bg);
	padding: 0.6rem 1rem;

	/* margin-block: -0.9rem; */
	border: 1px solid var(--main);
	border-radius: 0.6rem;
}

.selected {
	width: 100%;
	padding: 0.5rem;
	font-size: 0.8rem;
	font-weight: 800;
	/* margin-top: 1rem; */
	display: flex;
	flex-wrap: wrap;
	gap: 0.5rem;
}

.sel {
	display: flex;
	align-items: center;
	background: var(--main);
	color: var(--bg);
	gap: 0.3em;
	border-radius: 0.5em;
	padding: 0.3em;
}
</style>

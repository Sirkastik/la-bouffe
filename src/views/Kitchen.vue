<template>
	<div class="restaurant">
		<div class="top">
			<h2>Welcome to {{ displayName }}</h2>
		</div>
		<h1 v-if="!showDetailsPage">
			<span>The Menu</span><span><i class="fas fa-book-open"></i></span>
		</h1>
		<section v-if="!showDetailsPage">
			<div class="menu" v-if="menu.length">
				<div class="category" v-if="breakfast.length">
					<h1>Breakfast</h1>
					<div v-for="item in breakfast" v-bind:key="item.id" class="item">
						<span class="name">{{ item.name }}</span>
						<span class="price">Ksh. {{ item.price }}</span>
						<span class="delete" @click="handleDelete(item)">
							<i class="fas fa-trash"></i>
						</span>
					</div>
				</div>
				<div class="category" v-if="dishes.length">
					<h1>Dishes</h1>
					<div v-for="item in dishes" v-bind:key="item.id" class="item">
						<span class="name">{{ item.name }}</span>
						<span class="price">Ksh. {{ item.price }}</span>
						<span class="delete" @click="handleDelete(item)">
							<i class="fas fa-trash"></i>
						</span>
					</div>
				</div>
				<div class="category" v-if="snacks.length">
					<h1>Snacks</h1>
					<div v-for="item in snacks" v-bind:key="item.id" class="item">
						<span class="name">{{ item.name }}</span>
						<span class="price">Ksh. {{ item.price }}</span>
						<span class="delete" @click="handleDelete(item)">
							<i class="fas fa-trash"></i>
						</span>
					</div>
				</div>
				<div class="category" v-if="desserts.length">
					<h1>Desserts</h1>
					<div v-for="item in desserts" v-bind:key="item.id" class="item">
						<span class="name">{{ item.name }}</span>
						<span class="price">Ksh. {{ item.price }}</span>
						<span class="delete" @click="handleDelete(item)">
							<i class="fas fa-trash"></i>
						</span>
					</div>
				</div>
				<div class="category" v-if="drinks.length">
					<h1>Drinks</h1>
					<div v-for="item in drinks" v-bind:key="item.id" class="item">
						<span class="name">{{ item.name }}</span>
						<span class="price">Ksh. {{ item.price }}</span>
						<span class="delete" @click="handleDelete(item)">
							<i class="fas fa-trash"></i>
						</span>
					</div>
				</div>
			</div>
			<div class="no-items" v-else @click="showAddModal = true">
				<span>
					You have no items in your menu. Click here to add food items
				</span>
				<span><i class="fas fa-plus-circle"></i></span>
			</div>
		</section>
		<section v-if="showDetailsPage">
			<div class="info">
				<h3>Restaurant Info</h3>
				<div class="field">
					<span>Name:</span>
					<span>
						{{ this.restaurantDetails.info.restaurantName }}
					</span>
				</div>
				<div class="field">
					<span>Contact:</span>
					<span>{{ this.restaurantDetails.info.contact }}</span>
				</div>
				<div class="field">
					<span>Location:</span>
					<span>{{ this.restaurantDetails.info.location }}</span>
				</div>
			</div>

			<div class="payment">
				<h3>Payment Details</h3>
				<div class="field">
					<span>Payment Name:</span>
					<span>{{ this.restaurantDetails.payment.paymentName }}</span>
				</div>
				<div class="field">
					<span>Payment Type:</span>
					<span>{{ this.restaurantDetails.payment.paymentType }}</span>
				</div>
				<div class="field" v-if="type === 'Pay Bill'">
					<span>Business Number:</span>
					<span>{{ this.restaurantDetails.payment.businessNumber }}</span>
				</div>
				<div class="field">
					<span>{{ payLabel }}:</span>
					<span>{{ this.restaurantDetails.payment.accountNumber }}</span>
				</div>
			</div>
		</section>
		<button v-if="showDetailsPage" @click="handleSignout">
			Sign out <i class="fas fa-sign-out-alt"></i>
		</button>
	</div>
	<add-modal
		@close="this.showAddModal = false"
		@add="handleSubmit"
		v-if="showAddModal"
	/>
	<orders-modal
		@close="this.showOrdersModal = false"
		v-if="showOrdersModal"
		:orders="orders"
	/>

	<app-bottom
		@home="showDetailsPage = false"
		@open="showAddModal = true"
		@user="getDetails"
		@orders="showOrdersModal = true"
	/>
</template>

<script>
import { mapState } from "vuex";
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
	onSnapshot,
} from "@/services/firebase";
import AddModal from "@/components/modals/AddModal.vue";
import OrdersModal from "@/components/modals/OrdersModal.vue";
import AppBottom from "@/components/AppBottom.vue";
export default {
	name: "RestaurantPage",

	components: { AddModal, OrdersModal, AppBottom },
	data() {
		return {
			menu: [],
			restaurantDetails: {},
			showDetailsPage: false,
			showAddModal: false,
			showOrdersModal: false,
		};
	},

	computed: {
		...mapState(["orders"]),
		displayName() {
			return auth.currentUser.displayName;
		},
		type() {
			return this.restaurantDetails.payment.paymentType;
		},
		payLabels() {
			return {
				"Send Money": "Phone Number",
				"Buy Goods and Services": "Till Number",
				"Pochi la Biashara": "Phone Number",
				"Pay Bill": "Account Number",
			};
		},
		payLabel() {
			return this.payLabels[this.type];
		},
		uid() {
			return auth.currentUser.uid;
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
	},

	async created() {
		await this.getMenu();

		const q = query(
			collection(db, "orders"),
			where("restaurant", "==", this.displayName)
		);
		const unsubscribe = onSnapshot(q, (querySnapshot) => {
			let orders = [];
			querySnapshot.forEach((doc) => {
				const order = {
					id: doc.id,
					...doc.data(),
				};
				orders.push(order);
			});
			if (this.orders.length && orders.length === this.orders.length + 1) {
				this.$toast.default("New order available...");
			}
			this.$store.dispatch("setOrders", orders);
		});
	},

	methods: {
		getItems(document) {
			const item = {
				...document.data(),
				id: document.id,
			};
			this.menu.unshift(item);
		},

		edit(e) {
			console.log(e);
		},

		async getMenu() {
			const menu = await Promise.all([
				getDocs(query(collection(db, "dishes"), where("uid", "==", this.uid))),
				getDocs(
					query(collection(db, "breakfast"), where("uid", "==", this.uid))
				),
				getDocs(query(collection(db, "drinks"), where("uid", "==", this.uid))),
				getDocs(query(collection(db, "snacks"), where("uid", "==", this.uid))),
				getDocs(
					query(collection(db, "desserts"), where("uid", "==", this.uid))
				),
			]);
			menu.forEach((query) => query.forEach(this.getItems));
		},

		async handleSubmit(data) {
			try {
				const newEntryRef = await addDoc(collection(db, data.category), data);
				const newEntrySnapshot = await getDoc(newEntryRef);
				this.getItems(newEntrySnapshot);
				this.$toast.default("Item Added...");
				this.showAddModal = false;
			} catch (error) {
				this.$toast.error("Couldn't add item...");
				console.log(error);
			}
		},

		async handleSignout() {
			await this.$store.dispatch("signOut");
			this.$router.push("/");
		},

		async handleDelete(itemToDel) {
			try {
				await deleteDoc(doc(db, itemToDel.category, itemToDel.id));
				this.menu = this.menu.filter((item) => item !== itemToDel);
				this.$toast.default("Item deleted...");
			} catch (error) {
				this.$toast.error("Error deleting item...");
				console.log(error);
			}
		},

		async getDetails() {
			const resSnap = await getDoc(doc(db, "restaurants", this.uid));
			this.restaurantDetails = resSnap.data();
			this.showDetailsPage = true;
		},
	},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.restaurant {
	text-align: center;
	/* padding: 1rem; */
	min-height: 97vh;
	position: relative;
}

.top {
	padding: 0.9rem;
	margin: 1rem;
	border-radius: 0.5rem;
	box-shadow: var(--shadow);
	text-transform: uppercase;
	font-size: 0.9em;
	letter-spacing: 1px;
	font-weight: bold;
}

.restaurant > h1 {
	display: flex;
	justify-content: space-between;
	margin: 0 1.5rem;
	padding: 0.5rem;
	font-size: 1.2em;
	text-transform: uppercase;
	letter-spacing: 1px;
	font-weight: bolder;
	color: var(--lighter);
	border-bottom: 1px solid var(--lighter);
}

section {
	height: calc(100vh - 12.5rem);
	overflow: scroll;
	padding: 1rem 1.5rem;
}

.no-items {
	height: 100%;
	display: grid;
	place-content: center;
	text-transform: uppercase;
	letter-spacing: 1px;
	font-weight: bolder;
	font-size: 0.8em;
	color: var(--lighter);
}

.category {
	margin-bottom: 1rem;
	padding: 1rem;
	border-radius: 0.5rem;
	box-shadow: var(--shadow);
}

.category h1 {
	text-transform: uppercase;
	font-size: 0.9em;
	letter-spacing: 1px;
	font-weight: bold;
}

.item {
	border-bottom: 1px solid var(--lighter);
	color: var(--lighter);
	text-transform: uppercase;
	font-size: 0.75em;
	letter-spacing: 1px;
	font-weight: bold;
	display: flex;
	gap: 1rem;
	/* justify-content: space-between; */
	align-items: center;
	margin: 1rem 0;
}

.item span:nth-child(1) {
	flex: 1;
	text-align: left;
	padding-left: 1rem;
}

.item span:nth-child(3) {
	padding: 0.5rem;
	background: var(--main);
	color: var(--bg);
}

.del {
	font-weight: bold;
}

.info,
.payment {
	display: flex;
	flex-direction: column;
	gap: 1rem;

	margin: 1rem 0;
}

.info h3,
.payment h3 {
	text-transform: uppercase;
	font-size: 0.9em;
	letter-spacing: 1px;
	font-weight: bold;
}

.field {
	display: flex;
	justify-content: space-between;
	align-items: center;
	gap: 1rem;
	color: var(--main);
	padding: 0.75rem 0.8rem;
	border-radius: 0.25rem;
	box-shadow: var(--shadow);
	text-transform: capitalize;
	letter-spacing: 0.7px;
	font-size: 0.8em;
}

.field span:nth-child(2) {
	text-transform: uppercase;
	font-weight: bold;
	flex: 1;
	text-align: left;
}

button {
	text-transform: uppercase;
	font-size: 0.95em;
	font-weight: bold;
	margin-top: 1rem;
}

/* .field > span {
	width: 100%;
} */
</style>

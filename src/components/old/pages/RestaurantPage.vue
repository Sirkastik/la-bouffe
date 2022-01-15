<template>
	<div class="restaurant">
		<div class="top">
			<h2>Welcome to {{ displayName }}</h2>
		</div>
		<nav>
			<h3
				@click="showDetails = false"
				:class="{ active: showDetails == false }"
			>
				Menu
			</h3>
			<h3 @click="getDetails" :class="{ active: showDetails }">Account</h3>
		</nav>
		<section v-if="!showDetails">
			<div class="menu">
				<div class="cat">
					<h4>Name</h4>
					<h4>Price</h4>
					<h4>Quantity</h4>
					<span class="del">Del</span>
				</div>
				<div v-for="item in menu" v-bind:key="item.id" class="item">
					<h5>{{ item.name }}</h5>
					<h5>{{ item.price }}</h5>
					<h5>{{ item.quantity }}</h5>
					<span @click="handleDelete(item)"><i class="fas fa-trash"></i></span>
				</div>
			</div>
			<div class="plus">
				<h1 @click="showModal = true">+</h1>
			</div>
		</section>
		<section v-if="showDetails">
			<div class="info">
				<h3>Restaurant Info</h3>
				<div class="field">
					<span>Name:</span>
					<span contenteditable="true" @blur="edit">{{
						this.resDetails.info.restaurantName
					}}</span>
				</div>
				<div class="field">
					<span>Contact:</span>
					<span contenteditable="true" @blur="edit">{{
						this.resDetails.info.contact
					}}</span>
				</div>
				<div class="field">
					<span>Location:</span>
					<span contenteditable="true" @blur="edit">{{
						this.resDetails.info.location
					}}</span>
				</div>
			</div>

			<div class="payment">
				<h3>Payment Details</h3>
				<div class="field">
					<span>Payment Name:</span>
					<span contenteditable="true" @blur="edit">{{
						this.resDetails.payment.paymentName
					}}</span>
				</div>
				<div class="field">
					<span>Payment Type:</span>
					<span contenteditable="true" @blur="edit">{{
						this.resDetails.payment.paymentType
					}}</span>
				</div>
				<div class="field" v-if="type == 'Buy Goods...'">
					<span>Till Number:</span>
					<span contenteditable="true" @blur="edit">{{
						this.resDetails.payment.tillNumber
					}}</span>
				</div>
				<div v-else-if="type == 'Pay Bill'">
					<div class="field">
						<span>Business Number:</span>

						<span contenteditable="true" @blur="edit">{{
							this.resDetails.payment.businessNumber
						}}</span>
					</div>
					<div class="field">
						<span>Account Number:</span>
						<span contenteditable="true" @blur="edit">{{
							this.resDetails.payment.accNumber
						}}</span>
					</div>
				</div>
				<div class="field" v-else>
					<span>Phone Number:</span>
					<span contenteditable="true" @blur="edit">{{
						this.resDetails.payment.phoneNumber
					}}</span>
				</div>
			</div>
		</section>
		<p class="sign" @click="handleSignout">
			Sign Out
			<button>
				<i class="fas fa-sign-out-alt"></i>
			</button>
		</p>
	</div>
	<div class="modal" v-if="showModal">
		<add-modal @close="this.showModal = false" @submit="handleSubmit" />
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
} from "../../includes/firebase";
import AddModal from "../../modals/AddModal.vue";
export default {
	name: "RestaurantPage",

	components: {
		AddModal,
	},
	data() {
		return {
			showModal: false,
			menu: [],
			resDetails: {},
			showDetails: false,
		};
	},

	computed: {
		displayName() {
			return auth.currentUser.displayName;
		},
		type() {
			return this.resDetails.payment.paymentType;
		},

		uid() {
			return auth.currentUser.uid;
		},
	},

	async created() {
		await this.getMenu();
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
				const newEntryRef = await addDoc(collection(db, data.type), data);
				const newEntrySnapshot = await getDoc(newEntryRef);
				this.getItems(newEntrySnapshot);
				this.$toast.success("Item Added...");
				this.showModal = false;
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
				await deleteDoc(doc(db, itemToDel.type, itemToDel.id));
				this.menu = this.menu.filter((item) => item !== itemToDel)
				this.$toast.success("Item deleted...");
			} catch (error) {
				this.$toast.error("Error deleting item...");
				console.log(error);
			}
		},

		async getDetails() {
			const resSnap = await getDoc(
				doc(db, "restaurants", auth.currentUser.uid)
			);
			this.resDetails = resSnap.data();
			this.showDetails = true;
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
	margin: 0.4rem;
	margin-bottom: 1rem;
	border-radius: 0.5rem;
	box-shadow: var(--shadow);
}

.sign {
	all: unset;
	cursor: pointer;
	color: inherit;
	position: absolute;
	bottom: 1rem;
	left: 0;
	right: 0;
}

nav {
	display: flex;
	justify-content: space-around;
}

nav > h3 {
	background: var(--main);
	color: var(--color);
	padding: 0.5rem 1.3rem;
	border-radius: 0.3rem;
	opacity: 0.7;
}

.active {
	color: var(--accent);
	opacity: 1;
}

section {
	height: 60vh;
	padding: 1rem 1.5rem;
}

.menu {
	border: 1px solid var(--main);
	padding: 0.5rem;
	border-radius: 0.4rem;
}

.cat,
.item {
	display: flex;
	justify-content: space-between;
	padding: 0.5rem;
}

.cat {
	border-bottom: 1px double var(--accent);
}

.cat > h4 {
	flex: 1;
}

.item > h5 {
	flex: 1;
}

.del {
	font-weight: bold;
}

.info,
.payment {
	display: flex;
	flex-direction: column;
	gap: 0.7rem;

	margin: 1rem 0;
}

.field {
	/* border: 1px solid var(--main); */
	display: flex;
	justify-content: space-between;
	gap: 0.5rem;
	background: var(--main);
	color: var(--color);
	padding: 0.5rem 0.8rem;
	border-radius: 0.4rem;
}

.field span:nth-child(2) {
	flex: 1;
}

/* .field > span {
	width: 100%;
} */

.modal {
	position: fixed;
	inset: 0;
	z-index: 10;
	padding: 3rem 3rem;
	background: var(--bg);
}
</style>

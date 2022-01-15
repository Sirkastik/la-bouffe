<template>
	<div class="restPage">
		<h3 v-if="info" class="title">{{ info.restaurantName }}</h3>
		<div class="wrapper">
			<app-tabs v-model:value="chosenTab" :value="chosenTab" :tabList="tabList">
				<template v-slot:tabPanel-1><menu-list :items="dishes"/></template>
				<template v-slot:tabPanel-2><menu-list :items="drinks"/></template>
				<template v-slot:tabPanel-3><menu-list :items="snacks"/></template>
				<template v-slot:tabPanel-4><menu-list :items="desserts"/></template>
			</app-tabs>
		</div>
		<h4 @click="$router.push('/')"><i class="fas fa-home"></i></h4>
	</div>
</template>

<script>
import {
	db,
	doc,
	getDoc,
	getDocs,
	query,
	where,
	collection,
} from "../../includes/firebase";
import AppTabs from "../utils/Tabs.vue";
import MenuList from "../utils/MenuList.vue";

export default {
	components: { AppTabs, MenuList },
	data() {
		return {
			menu: [],
			resDetails: {},
			tabList: ["Dishes", "Drinks", "Snacks", "Desserts"],
			chosenTab: 0,
			dishes: [],
			drinks: [],
			snacks: [],
			desserts: [],
		};
	},

	async created() {
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
	},

	methods: {
		getItems(document) {
			const item = {
				...document.data(),
				id: document.id,
			};
			if (item.type === "dishes") this.dishes.unshift(item);
			if (item.type === "drinks") this.drinks.unshift(item);
			if (item.type === "snacks") this.snacks.unshift(item);
			if (item.type === "desserts") this.desserts.unshift(item);
		},

		async getMenu() {
			const menu = await Promise.all([
				getDocs(query(collection(db, "dishes"), where("uid", "==", this.id))),
				getDocs(query(collection(db, "drinks"), where("uid", "==", this.id))),
				getDocs(query(collection(db, "snacks"), where("uid", "==", this.id))),
				getDocs(query(collection(db, "desserts"), where("uid", "==", this.id))),
			]);
			menu.forEach((query) => query.forEach(this.getItems));
		},
	},
};
</script>

<style scoped>
.restPage {
	padding: 1rem 1rem;
	text-align: center;
	min-height: 100vh;
	/* background: radial-gradient(circle, var(--bg) 0%, var(--accent) 100%);
	background-size: 500%;
	background-position: center; */
}

.title {
	width: max-content;
	margin: auto;
	padding: 0.5rem 1rem;
	color: var(--color);
		border: 1px double var(--main);
		/* border-top: 1px double var(--main); */
	background: var(--main);
	border-radius: 0.5rem;
	margin-bottom: 1.5rem;
}
</style>

<template>
	<div>
		<app-tabs v-model:value="chosenTab" :value="chosenTab" :tabList="tabList">
			<template v-slot:tabPanel-1>
				<info-page @continue="nextPage" />
			</template>
			<template v-slot:tabPanel-2>
				<payment-page @continue="nextPage" />
			</template>
			<template v-slot:tabPanel-3>
				<submit-page @continue="nextPage" @submit="handleSignup" />
			</template>
		</app-tabs>
	</div>
</template>

<script>
import { auth } from "@/includes/firebase";
import InputVue from "../utils/Input.vue";
import AppTabs from "../utils/Tabs.vue";
import InfoPage from "../InfoPage.vue";
import PaymentPage from "../PaymentPage.vue";
import SubmitPage from "../SubmitPage.vue";

export default {
	name: "AccountPage",

	components: {
		InputVue,
		AppTabs,
		InfoPage,
		PaymentPage,
		SubmitPage,
	},

	data() {
		return {
			email: "",
			password: "",
			focus: undefined,
			tabList: ["Info", "Payment", "Account"],
			chosenTab: 0,
			resData: {},
		};
	},

	computed: {
		loggedIn() {
			return auth.currentUser;
		},
	},

	methods: {
		changeFocus(id) {
			this.focus = id;
		},
		nextPage(e) {
			if (e.next) {
				this.chosenTab++;
				this.resData = { ...this.resData, ...e.data };
				console.log(this.resData);
			} else {
				this.chosenTab--;
			}
		},
		async handleSignup(creds) {
			if (!this.resData.info && !this.resData.payment) {
				this.$toast.error("Please fill in all details");
				return;
			}
			try {
				await this.$store.dispatch("register", creds);
				this.$toast.success("Signup successful...");
				await this.$store.dispatch("addRestaurant", this.resData);
				this.$router.push("/restaurant");
			} catch (error) {
				this.$toast.error("An error occurred...");
				console.log(error);
			}
		},
	},
};
</script>

<style scoped>
.top {
	display: flex;
	justify-content: space-between;
	align-items: center;
	gap: 1rem;
	padding: 1.2rem 1.5rem;
	padding-bottom: 1.5rem;
}

h2 {
	text-transform: uppercase;
}
</style>

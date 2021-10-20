<template>
	<div id="signup-page">
		<form class="form">
			<span class="close" @click="this.$router.push('/')"><i class="fas fa-times"></i></span>
			<h1>Sign Up Form</h1>
			<info-page v-if="page == 1" @continue="nextPage" />
			<payment-page v-else-if="page == 2" @continue="nextPage" />
			<submit-page v-else @continue="nextPage" @submit="handleSubmit" />
		</form>
	</div>
</template>

<script>
import InfoPage from "./InfoPage.vue";
import PaymentPage from "./PaymentPage.vue";
import SubmitPage from "./SubmitPage.vue";
import { auth } from "@/includes/firebase";
export default {
	name: "SignupPage",

	components: {
		InfoPage,
		PaymentPage,
		SubmitPage,
	},

	data() {
		return {
			page: 1,
			resDetails: {
				info: undefined,
				payment: undefined,
			},
		};
	},

	methods: {
		nextPage(emit) {
			if (emit.next) {
				this.page == 1
					? (this.resDetails.info = emit.data)
					: (this.resDetails.payment = emit.data);
				this.page += 1;
			} else this.page -= 1;
		},

		async handleSubmit(creds) {
			console.log(this.resDetails);
			console.log(creds);
			if (creds.email == "" || creds.password == "") {
				location.reload();
			} else {
				await this.$store.dispatch("register", creds);
				console.log(auth.currentUser);
				await this.$store.dispatch("addRestaurant", this.resDetails);
				console.log(auth.currentUser.displayName);
				this.$router.push("/restaurant");
			}
		},
	},
};
</script>

<style scoped>
#signup-page {
	text-align: center;
	padding: 1.5rem 2rem;
}
.close {
	position: absolute;
	right: 2rem;
	top: 1.5rem;
}
</style>

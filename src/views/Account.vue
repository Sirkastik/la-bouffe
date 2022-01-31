<template>
	<main>
		<sign-in v-if="signIn" @switch="signIn = !signIn" />
		<div class="signup" v-else>
			<info-form
				v-if="step === 1"
				@submitInfo="onInfoSubmit"
				@switch="signIn = !signIn"
			/>
			<payment-form
				v-if="step === 2"
				@submitPayment="onPaymentSubmit"
				@back="step--"
			/>
			<credentials-form
				v-if="step === 3"
				@addRestaurant="addRestaurant"
				@back="step--"
			/>
		</div>
	</main>
</template>

<script>
import SignIn from "@/components/SignIn.vue";
import InfoForm from "@/components/InfoForm";
import PaymentForm from "@/components/PaymentForm";
import CredentialsForm from "@/components/CredentialsForm";
export default {
	components: { SignIn, InfoForm, PaymentForm, CredentialsForm },

	data() {
		return {
			signIn: false,
			step: 1,
			restaurantData: {},
		};
	},

	methods: {
		async onInfoSubmit(info) {
			this.restaurantData = { ...this.restaurantData, info: info };
			this.step++;
		},

		onPaymentSubmit(paymentInfo) {
			this.restaurantData = { ...this.restaurantData, payment: paymentInfo };
			this.step++;
		},

		async addRestaurant() {
			try {
				await this.$store.dispatch("addRestaurant", this.restaurantData);
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
main {
	width: 100vw;
	height: 100vh;
	overflow: hidden;
}

.signup {
	width: 100%;
	height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 1.5rem 2rem;
}
</style>

<template>
	<div id="account">
		<login-top :signup="this.signup" @switch="signup = !signup" />
		<login-page v-if="!signup" @switch="signup = !signup" />
		<signup-page v-else @switch="signup = !signup" />
	</div>
</template>

<script>
import SignupPage from "./SignupPage.vue";
import LoginPage from "./LoginPage.vue";
import LoginTop from "../utils/LoginTop.vue";

export default {
	name: "AccountPage",

	components: { SignupPage, LoginPage, LoginTop },

	data() {
		return {
			signup: true,
		};
	},
};
</script>

<style scoped>
#account {
	min-height: 100vh;
	padding: 1rem 1rem;
	background: radial-gradient(circle, var(--bg) 0%, var(--accent) 100%);
	background-size: 500%;
	background-position: center;
}
</style>

<template>
	<div class="top">
		<h3 @click.prevent="$router.push('/')">
			<i class="fas fa-home"></i>
		</h3>
		<h2 v-if="signup">Sign Up</h2>
		<h2 v-else>Sign In</h2>
		<h3 v-if="signup" @click="this.$emit('switch')">
			<i class="fas fa-sign-in-alt"></i>
		</h3>
		<h3 v-else @click="this.$emit('switch')">
			<i class="fas fa-user-plus"></i>
		</h3>
	</div>
</template>

<script>
export default {
	props: ["signup"],
};
</script>

<style scoped>
.top {
	display: flex;
	justify-content: space-between;
	align-items: center;
	gap: 1rem;
	padding: 1.2rem 1.5rem;
	padding-top: 0.5rem;
}

h2 {
	text-transform: uppercase;
}
</style>

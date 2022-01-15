<template>
	<div class="signin">
		<form @submit.prevent="onSubmit">
			<h1>SIGN IN</h1>
			<div class="form-control">
				<label for="brand-or-phone">Brand or phone</label>
				<input type="text" id="brand-or-phone" />
				<span class="icon"><fa-icon icon="user-alt" /></span>
			</div>
			<div class="form-control">
				<label for="password">Password</label>
				<input type="password" id="password" />
				<span class="icon"><fa-icon icon="lock" /></span>
			</div>
			<button class="submitBtn">Sign In</button>
			<div class="cta">
				Dont have an account?
				<span class="link" @click.prevent="$emit('switch')">Register</span>
			</div>
		</form>
	</div>
</template>

<script>
export default {
	data() {
		return {
			phone_or_brand: "",
			password: "",
			focused: "",
		};
	},
	methods: {
		focus(id) {
			this.focused = id;
		},
		onSubmit() {
			console.log(this.phone_or_brand);
			this.$router.push("/stall/id");
		},
	},
};
</script>

<style scoped>
.signin {
	width: 100%;
	height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 1.5rem 2rem;
}

h1 {
	font-size: 1.5em;
	font-weight: bold;
	text-align: center;
	letter-spacing: 1px;
}

form {
	display: flex;
	flex-direction: column;
	gap: 1rem;
	width: 100%;
}

.form-control {
	position: relative;
}

label {
	color: var(--lighter);
	display: inline-block;
	font-size: 0.6em;
	text-transform: uppercase;
	letter-spacing: 1px;
	font-weight: bold;
}

input {
	display: block;
	padding: .65rem .75rem;
	width: 100%;
	border-bottom: 1px solid var(--lighter);
	border-left: 1px solid transparent;
	border-right: 1px solid transparent;
	border-top: 1px solid transparent;
	color: var(--main);
	border-radius: .25rem;
}

input:focus {
	border: 1px solid var(--main);
}

.icon {
	position: absolute;
	right: 0;
	bottom: 1px;
	top: 1.65rem;
	padding: .5rem .5rem;
	border-radius: 0 .25rem .25rem 0;
	background: var(--main);
	color: var(--bg);
}

.submitBtn {
	font-weight: bold;
	display: block;
	width: 100%;
	padding: 0.5rem 0;
	background: var(--main);
	color: var(--bg);
	border-radius: 0.25rem;
	text-align: center;
	margin: 1rem 0;
}

.cta {
	text-align: center;
}

.link {
	color: var(--accent);
}
</style>

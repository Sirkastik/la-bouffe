<template>
	<div class="signin">
		<form @submit.prevent="handleSubmit">
			<h1>SIGN IN</h1>
			<div class="form-control">
				<label>Email</label>
				<input type="email" v-model="email" required />
				<span class="icon"><i class="fas fa-envelope"></i></span>
			</div>
			<div class="form-control">
				<label>Password</label>
				<input type="password" v-model="password" required />
				<span class="icon"><i class="fas fa-lock"></i></span>
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
			email: "",
			password: '',
		};
	},
	methods: {
		handleSubmit() {
			if (this.validate() !== "") {
				this.$toast.error(this.validate());
			} else {
				const credentials = {
					email: this.email,
					password: this.password,
				};
				this.handleLogin(credentials);
			}
		},

		validate() {
			if (this.email == "" || this.password == "")
				return "Enter all credentials please!";
			if (this.password.length < 6)
				return "Password must be at least 6 characters";
			return "";
		},

		async handleLogin(creds) {
			try {
				await this.$store.dispatch("login", creds);
				this.$toast.success("Login successful...");
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
.signin {
	width: 100vw;
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
	animation: slide 1s ease-in-out both;
}

@keyframes slide {
	from {
		transform: translateX(70vh);
	}
	to {
		transform: translateX(0);
	}
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
	padding: 0.65rem 0.75rem;
	height: 3rem;
	width: 100%;
	border-bottom: 1px solid var(--lighter);
	border-left: 1px solid transparent;
	border-right: 1px solid transparent;
	border-top: 1px solid transparent;
	color: var(--main);
	border-radius: 0.5rem;
}

input:focus {
	border: 1px solid var(--main);
}

.icon {
	position: absolute;
	right: 0;
	bottom: 1px;
	height: calc(3rem - 2px);
	display: flex;
	align-items: center;
	padding: 0 0.5rem;
	background: var(--main);
	color: var(--bg);
	border-radius: 0 0.5rem 0.5rem 0;
}

.submitBtn {
	font-weight: bold;
	display: block;
	width: 100%;
	padding: 0.5rem 0;
	background: var(--main);
	color: var(--bg);
	border-radius: 0.5rem;
	text-align: center;
	margin: 1rem 0;
	text-transform: uppercase;
	letter-spacing: 1px;
}

.cta {
	text-align: center;
}

.link {
	color: var(--accent);
}
</style>

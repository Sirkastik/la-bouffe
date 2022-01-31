<template>
	<form @submit.prevent="handleSubmit">
		<h1>SIGN UP</h1>
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
		<div class="form-control">
			<label>Confirm Password</label>
			<input type="password" v-model="confirmPassword" required />
			<span class="icon"><i class="fas fa-lock"></i></span>
		</div>
		<button class="submitBtn">Sign Up</button>
		<div class="cta">
			Go back
			<span class="link" @click.prevent="$emit('back')">
				<i class="fas fa-arrow-alt-circle-left"></i>
			</span>
		</div>
	</form>
</template>

<script>
export default {
	data() {
		return {
			email: "",
			password: "",
			confirmPassword: "",
		};
	},

	methods: {
		async handleSubmit() {
			if (this.validate() !== "") this.$toast.error(this.validate());
			else {
				this.$toast.default("Signing up...", {
					duration: 7000,
				});
				try {
					await this.$store.dispatch("register", {
						email: this.email,
						password: this.password,
					});
					this.$toast.default("Signup successful...");
					this.$emit("addRestaurant");
				} catch (error) {
					this.$toast.error("An error occurred...");
					console.log(error);
				}
			}
		},

		validate() {
			if (this.email == "" || this.password == "")
				return "Enter all credentials please!";
			if (this.password !== this.confirmPassword)
				return "Passwords do not match!";
			if (this.password.length < 6)
				return "Password must be at least 6 characters";
			return "";
		},
	},
};
</script>

<style scoped>
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

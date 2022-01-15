<template>
	<div id="login">
		<form @submit.prevent="handleSubmit">
			<div class="sign col">
				<div class="enter">Enter restaurant credentials:</div>
				<input-vue
					label="Email"
					id="0"
					type="email"
					:focus="focus"
					v-model:value="email"
					:value="email"
					@next="changeFocus"
				>
					<template v-slot:icon>
						<div class="icon"><i class="fas fa-envelope"></i></div>
					</template>
				</input-vue>

				<input-vue
					label="Password"
					id="1"
					type="password"
					:focus="focus"
					v-model:value="password"
					:value="password"
					@next="changeFocus"
				>
					<template v-slot:icon>
						<div class="icon"><i class="fas fa-lock"></i></div>
					</template>
				</input-vue>

				<div>
					<button type="submit" class="long button">Sign In</button>
					<p>
						Don't have an account?
						<a @click="this.$emit('switch')">
							<h4>Sign Up</h4>
						</a>
					</p>
				</div>
			</div>
			<div class="svg col"></div>
		</form>
	</div>
</template>

<script>
import InputVue from "../utils/Input.vue";

export default {
	name: "AccountPage",

	components: {
		InputVue,
	},

	data() {
		return {
			email: "",
			password: "",
			focus: undefined,
		};
	},

	methods: {
		changeFocus(id) {
			this.focus = id;
		},

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
.button {
	color: var(--main);
	height: 2.8rem;
	background: var(--accent);
	margin: 2rem 0;
	box-shadow: var(--shadow);
}
/* .glogo {
	height: 1rem;
	width: 1rem;
	background: url(../assets/glogo.png) no-repeat;
	background-position: center;
	background-size: contain;
} */
.enter {
	margin-top: 1.5rem;
	font-size: 1.1rem;
	font-weight: 600;
}
.col {
	width: 100%;
	height: 100%;
	padding: 0 0.8rem;
}

.svg {
	margin-top: 1rem;
	height: 75vh;
	background: url(../../assets/account.svg) no-repeat;
	background-position: center;
	background-size: contain;
}

/* form style */
form {
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 0 2rem;
	gap: 5rem;
}

.input-div.focus .icon {
	color: var(--accent);
}

p {
	margin-top: 0.5rem;
	display: flex;
	justify-content: center;
	flex-wrap: wrap;
	gap: 0.5rem;
}

@media screen and (max-width: 600px) {
	.svg {
		display: none;
	}
	form {
		padding: 0;
	}
}
</style>

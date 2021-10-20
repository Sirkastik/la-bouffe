<template>
	<div id="account">
		<div class="sign col">
			<form @submit.prevent="handleSubmit">
				<div class="top">
					<h3 v-if="signup" @click="signup = !signup">
						<i class="fas fa-sign-in-alt"></i>
					</h3>
					<h3 v-else @click="signup = !signup">
						<i class="fas fa-user-plus"></i>
					</h3>
					<h2 v-if="signup">Sign Up</h2>
					<h2 v-else>Sign In</h2>
					<h3 @click.prevent="this.$router.push('/')">
						<i class="fas fa-home"></i>
					</h3>
				</div>

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

				<input-vue
					v-if="signup"
					label="Confirm Password"
					id="2"
					type="password"
					:focus="focus"
					v-model:value="confirmPassword"
					:value="confirmPassword"
					@next="changeFocus"
				>
					<template v-slot:icon>
						<div class="icon"><i class="fas fa-lock"></i></div>
					</template>
				</input-vue>

				<div v-if="signup">
					<button type="submit" class="long">Sign Up</button>
					<p>
						Already have an account?
						<a @click="signup = !signup">
							<h4>Sign In</h4>
						</a>
					</p>
				</div>
				<div v-else>
					<button type="submit" class="long">Sign In</button>
					<p>
						Don't have an account?
						<a @click="signup = !signup">
							<h4>Sign Up</h4>
						</a>
					</p>
				</div>
			</form>
		</div>
		<div class="svg col"></div>
	</div>
</template>

<script>
import { auth } from "@/includes/firebase";
import InputVue from "./Input.vue";

export default {
	name: "AccountPage",

	components: {
		InputVue,
	},

	data() {
		return {
			email: "",
			password: "",
			confirmPassword: '',
			signup: true,
      focus: undefined
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

		handleSubmit() {
			if (this.validate() !== "") {
				alert(this.validate());
			} else {
				const credentials = {
					email: this.email,
					password: this.password,
				};
				this.signup
					? this.handleSignup(credentials)
					: this.handleLogin(credentials);
			}
		},

		validate() {
			if (this.email == "" || this.password == "")
				return "Enter all credentials please!";
			if (this.password.length < 6)
				return "Password must be at least 6 characters";
			return "";
		},

		async handleSignup(creds) {
			try {
				await this.$store.dispatch("register", creds);
				this.$router.push("/e-foodie");
			} catch (error) {
				alert("Email already exists");
				console.log(error);
			}
		},

		async handleLogin(creds) {
			try {
				await this.$store.dispatch("login", creds);
				this.$router.push("/e-foodie");
			} catch (error) {
				alert("Invalid login details");
				console.log(error);
			}
		},
	},
};
</script>

<style scoped>
.button {
	all: unset;
	cursor: pointer;
	color: var(--bg);
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 0.5rem;
	width: 240px;

	height: 2.8rem;
	font-weight: 600;
	background: var(--main);
	border-radius: 0.2rem;
	margin: 0.7rem 0;
	box-shadow: var(--shadow);
}
.glogo {
	height: 1rem;
	width: 1rem;
	background: url(../assets/glogo.png) no-repeat;
	background-position: center;
	background-size: contain;
}
#account {
	min-height: 90vh;
	padding: 5vh 10vw;
	display: flex;
	align-items: center;
	gap: 5rem;
}

.col {
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
}

.svg {
	height: 90vh;
	background: url(../assets/account.svg) no-repeat;
	background-position: center;
	background-size: contain;
}

/* form style */
form {
	width: 100%;
	height: 100%;
}

.top {
	display: flex;
	justify-content: space-between;
	align-items: baseline;
	margin-bottom: 1rem;
}

.top h3 {
	cursor: pointer;
}

.top h3:hover {
	color: var(--accent);
}

form h2 {
	font-size: 2.9rem;
	text-transform: uppercase;
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
	form h2 {
		font-size: 2rem;
	}
}
</style>

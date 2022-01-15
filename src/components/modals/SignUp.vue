<template>
	<div class="signup">
		<form @submit.prevent="onInfoSubmit" v-if="step === 1">
			<h1>RESTAURANT INFO</h1>
			<div class="form-control">
				<label>Restaurant Name</label>
				<input type="text" v-model="restaurantName" required />
				<span class="icon"><i class="fas fa-user-alt"></i></span>
			</div>
			<div class="form-control">
				<label>Contact</label>
				<input type="number" v-model="contact" required />
				<span class="icon"><i class="fas fa-phone"></i></span>
			</div>
			<div class="dropdown">
				<div class="form-control">
					<label>Location</label>
					<input
						type="text"
						v-model="location"
						placeholder="Choose Location"
						@focus="showLocaOptions = !showLocaOptions"
						readonly
						required
					/>
					<span class="icon" @click="showLocaOptions = !showLocaOptions">
						<i v-if="showLocaOptions" class="fas fa-chevron-up"></i>
						<i v-else class="fas fa-chevron-down"></i>
					</span>
				</div>
				<div class="options" v-if="showLocaOptions">
					<div class="option" @click="setLocaOption('Stage')">
						<span>Stage</span>
					</div>
					<div class="option" @click="setLocaOption('Chebarus')">
						<span>Chebarus</span>
					</div>
					<div class="option" @click="setLocaOption('Kesses')">
						<span>Kesses</span>
					</div>
				</div>
			</div>

			<button class="submitBtn">Submit</button>
			<div class="cta">
				Aleady have an account?
				<span class="link" @click.prevent="$emit('switch')">Login</span>
			</div>
		</form>
		<form @submit.prevent="onPaymentSubmit" v-if="step === 2">
			<h1>PAYMENT INFO</h1>
			<div class="dropdown">
				<div class="form-control">
					<label>Payment Type</label>
					<input
						type="text"
						v-model="paymentType"
						placeholder="Choose Payment Option"
						@focus="showPayOptions = !showPayOptions"
						readonly
						required
					/>
					<span class="icon" @click="showPayOptions = !showPayOptions">
						<i v-if="showPayOptions" class="fas fa-chevron-up"></i>
						<i v-else class="fas fa-chevron-down"></i>
					</span>
				</div>
				<div class="options" v-if="showPayOptions">
					<div class="option" @click="setPayOption('Buy Goods and Services')">
						<span>Buy Goods and Services</span>
					</div>
					<div class="option" @click="setPayOption('Pay Bill')">
						<span>Pay Bill</span>
					</div>
					<div class="option" @click="setPayOption('Pochi la Biashara')">
						<span>Pochi la Biashara</span>
					</div>
					<div class="option" @click="setPayOption('Send Money')">
						<span>Send Money</span>
					</div>
				</div>
			</div>
			<div class="form-control" v-if="paymentType === 'Pay Bill'">
				<label>Business Number</label>
				<input type="number" v-model="businessNumber" required />
				<span class="icon"><i class="fas fa-mobile-alt"></i></span>
			</div>
			<div class="form-control">
				<label>{{ label }}</label>
				<input type="number" v-model="accountNumber" required />
				<span class="icon"><i class="fas fa-mobile-alt"></i></span>
			</div>
			<div class="form-control">
				<label>Payment Name</label>
				<input type="text" v-model="paymentName" required />
				<span class="icon"><i class="fas fa-mobile-alt"></i></span>
			</div>
			<button class="submitBtn">Confirm</button>
			<div class="cta">
				Go back
				<span class="link" @click.prevent="step -= 1">
					<i class="fas fa-arrow-alt-circle-left"></i>
				</span>
			</div>
		</form>
		<form @submit.prevent="handleSignup" v-if="step === 3">
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
				<span class="link" @click.prevent="step -= 1">
					<i class="fas fa-arrow-alt-circle-left"></i>
				</span>
			</div>
		</form>
	</div>
</template>

<script>
export default {
	data() {
		return {
			step: 1,

			restaurantName: "",
			contact: null,
			showLocaOptions: false,
			location: "",

			paymentType: "",
			showPayOptions: false,
			accountNumber: null,
			businessNumber: null,
			paymentName: "",

			resData: {},

			email: "",
			password: "",
			confirmPassword: "",
		};
	},

	computed: {
		label() {
			let label = "Till Number";
			switch (this.paymentType) {
				case "Pay Bill":
					label = "Account Number";
					break;
				case "Buy Goods and Services":
					label = "Till Number";
					break;
				case "Pochi la Biashara":
					label = "Phone Number";
					break;
				case "Send Money":
					label = "Phone number";
					break;
				default:
					break;
			}
			return label;
		},
		paymentOption() {
			if (this.paymentType === "Pay Bill") {
				return {
					businessNumber: this.businessNumber,
					accountNumber: this.accountNumber,
				};
			} else return { accountNumber: this.accountNumber };
		},
	},

	methods: {
		setLocaOption(location) {
			this.location = location;
			this.showLocaOptions = false;
		},

		setPayOption(option) {
			this.paymentType = option;
			this.showPayOptions = false;
		},

		async onInfoSubmit() {
			const res = await fetch(
				"https://source.unsplash.com/random/800x1000/?food"
			);
			const url = res.url;
			const data = {
				info: {
					restaurantName: this.restaurantName,
					contact: this.contact,
					location: this.location,
					photoUrl: url,
				},
			};
			this.resData = { ...this.resData, ...data };
			this.step += 1;
		},
		onPaymentSubmit() {
			const data = {
				payment: {
					paymentType: this.paymentType,
					paymentName: this.paymentName,
					...this.paymentOption,
				},
			};
			this.resData = { ...this.resData, ...data };
			console.log(this.resData);
			this.step += 1;
		},
		async handleSignup() {
			const credentials = {
				email: this.email,
				password: this.password,
			};
			try {
				await this.$store.dispatch("register", credentials);
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
.signup {
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

.dropdown {
	position: relative;
}

.options {
	position: absolute;
	inset: 5rem 0 auto 0;
	z-index: 1;
	padding: 1rem;
	border-radius: 0.5rem;
	overflow: hidden;
	background: radial-gradient(circle, var(--bg) 0%, var(--accent) 100%);
	background-size: 500%;
	background-position: center;
	border: 1px solid rgba(128, 128, 128, 0.103);
	box-shadow: var(--shadow);

	display: flex;
	flex-direction: column;
}

.option {
	font-size: 0.7em;
	text-transform: uppercase;
	letter-spacing: 1px;
	font-weight: bold;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0.5rem;
}

.option:hover {
	background: var(--main);
	color: var(--bg);
	border-radius: inherit;
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

.photo {
	width: 100%;
	aspect-ratio: 16/9;
	border: 1px solid rgba(128, 128, 128, 0.171);
	color: rgba(128, 128, 128, 0.507);
	border-radius: 0.25rem;
	display: grid;
	place-content: center;
	font-size: 1.5rem;
}

.photo > img {
	border-radius: inherit;
}

input[type="file"] {
	display: none;
}

.fileUpload {
	display: flex;
	align-items: center;
	gap: 0.3rem;
	font-weight: 600;
	margin: 1rem 0;
}

.fileName {
	width: 8rem;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}

.addBtn {
	all: unset;
	cursor: pointer;
	padding: 0.3rem 0.6rem;
	border-radius: 0.3rem;
	background: var(--main);
	color: var(--bg);
	box-shadow: var(--shadow);
	font-weight: normal;
	display: flex;
	gap: 0.3rem;
	opacity: 0.8;
}
</style>

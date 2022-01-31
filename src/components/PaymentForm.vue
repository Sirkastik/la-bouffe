<template>
	<form @submit.prevent="submitPayment">
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
			paymentType: "",
			showPayOptions: false,
			accountNumber: null,
			businessNumber: null,
			paymentName: "",
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
		setPayOption(option) {
			this.paymentType = option;
			this.showPayOptions = false;
		},

		submitPayment() {
			const paymentInfo = {
				paymentType: this.paymentType,
				paymentName: this.paymentName,
				...this.paymentOption,
			};
            this.$emit("submitPayment", paymentInfo)
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
</style>

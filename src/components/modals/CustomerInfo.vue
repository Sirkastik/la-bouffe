<template>
	<div class="modal">
		<form @submit.prevent="submit">
			<h1>
				<span>ENTER YOUR DETAILS</span>
				<span @click="$emit('close')" class="close">
					<i class="fas fa-times-circle"></i>
				</span>
			</h1>

			<div class="form-control">
				<label>Name</label>
				<input type="text" v-model="customerName" required />
				<span class="icon">
					<i class="fas fa-pen-fancy"></i>
				</span>
			</div>
			<div class="form-control">
				<label>Residence</label>
				<input type="text" v-model="customerLocation" required />
				<span class="icon">
					<i class="fas fa-map-marker-alt"></i>
				</span>
			</div>
			<div class="form-control">
				<label>Contact</label>
				<input type="number" v-model="customerPhone" required />
				<span class="icon">
					<i class="fas fa-phone"></i>
				</span>
			</div>

			<button class="submitBtn">Checkout</button>
		</form>
	</div>
</template>

<script>
export default {
	data() {
		return {
			customerName: "",
			customerPhone: null,
			customerLocation: "",
		};
	},
	methods: {
		submit() {
			const data = {
				customerName: this.customerName,
				customerPhone: this.customerPhone,
				customerLocation: this.customerLocation,
			};
			this.$emit("checkout", data);
		},
	},
};
</script>

<style scoped>
.modal {
	position: fixed;
	inset: 0;
	z-index: 50;
	width: 100%;
	height: 100%;
	background: radial-gradient(circle, var(--bg) 0%, var(--accent) 100%);
	background-size: 500%;
	background-position: center;
}

h1 {
	font-size: 1.5em;
	font-weight: bold;
	text-align: center;
	letter-spacing: 1px;
	display: flex;
	justify-content: space-between;
	align-items: center;
}

h1 .close {
	font-size: 0.8em;
}

form {
	display: flex;
	flex-direction: column;
	gap: 1rem;
	width: 100vw;
	height: 100vh;
	overflow-y: scroll;
	padding: 2rem 1.5rem;
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
</style>

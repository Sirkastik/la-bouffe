<template>
	<form @submit.prevent="submitInfo">
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
</template>

<script>
export default {
	data() {
		return {
			restaurantName: "",
			contact: null,
			showLocaOptions: false,
			location: "",
		};
	},

	methods: {
		setLocaOption(location) {
			this.location = location;
			this.showLocaOptions = false;
		},

		async submitInfo() {
			this.$toast.default("Submitting Info", {
				duration: 7000,
			});
			const res = await fetch(
				"https://source.unsplash.com/random/800x1000/?food"
			);
			const url = res.url;
			const info = {
				restaurantName: this.restaurantName,
				contact: this.contact,
				location: this.location,
				photoUrl: url,
			};
			this.$emit("submitInfo", info);
			this.$toast.clear();
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

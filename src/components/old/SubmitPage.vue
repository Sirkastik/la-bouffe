<template>
	<div class="page three">
		<input-vue
			label="Email"
			id="20"
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
			id="21"
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
			label="Confirm Password"
			id="22"
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

		<div class="button">
			<button class="back btn pair" @click.prevent="prevPage">Back</button>
			<button class="submit btn pair" @click.prevent="submit">Submit</button>
		</div>
	</div>
</template>

<script>
import InputVue from "./utils/Input.vue";
export default {
	name: "SubmitPage",

	components: {
		InputVue,
	},

	data() {
		return {
			email: "",
			password: "",
			confirmPassword: "",
			focus: undefined,
		};
	},

	methods: {
		changeFocus(id) {
			this.focus = id;
		},

		prevPage() {
			this.$emit("continue", { next: false });
		},

		submit() {
			if (this.validate() !== "") {
				this.$toast.error(this.validate()); 
			} else {
				const credentials = {
					email: this.email,
					password: this.password,
				};
				this.$emit("submit", credentials);
			}
		},

		validate() {
			if (this.email == "" || this.password == "")
				return "Enter all credentials please!";
			if (this.password.length < 6)
				return "Password must be at least 6 characters";
			if(this.password !== this.confirmPassword)
				return "Password do not match"
			return "";
		},
	},
};
</script>

<style scoped>
h3 {
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.title {
	border-bottom: 2px solid var(--accent);
}

.num {
	background: var(--accent);
	padding: 0.5rem 1rem;
	border-radius: 50%;
}
.input-div.focus .icon {
	color: var(--accent);
}

.select {
	margin-top: -2.3rem;
	margin-bottom: 1rem;
	padding: 0.5rem;
	border: 1px solid var(--accent);
	border-radius: 0.4rem;

	column-count: 3;
	column-rule: 1px double var(--accent);
}

.value {
	width: 100%;
}

.button {
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 1rem;
	flex-wrap: wrap;
}

.btn {
	flex-grow: 1;
	cursor: pointer;
	color: var(--main);
	background: var(--accent);
	height: 2.8rem;
	font-weight: 600;
	border-radius: 0.3rem; 
	margin: 0.7rem 0;
	box-shadow: var(--shadow);
}
</style>

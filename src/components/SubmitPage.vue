<template>
	<div class="page three">
		<h3>Credentials:</h3>
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

		<div class="button">
			<button class="back btn" @click.prevent="prevPage">Back</button>
			<button class="submit btn" @click.prevent="submit">Submit</button>
		</div>
	</div>
</template>

<script>
import InputVue from "./Input.vue";
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
			const credentials = {
				email: this.email,
				password: this.password,
			};
			this.$emit("submit", credentials);
		},
	},
};
</script>

<style scoped>
.input-div.focus .icon {
	color: var(--accent);
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
	color: var(--bg);
	height: 2.8rem;
	font-weight: 600;
	background: var(--main);
	border-radius: 0.2rem;
	margin: 0.7rem 0;
	box-shadow: var(--shadow);
}
</style>

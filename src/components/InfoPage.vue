<template>
	<div class="page one">
		<h3>Restaurant Info:</h3>
		<input-vue
			label="Name"
			id="0"
			:focus="focus"
			v-model:value="restaurantName"
			:value="restaurantName"
			@next="changeFocus"
		>
			<template v-slot:icon>
				<div class="icon"><i class="fas fa-signature"></i></div>
			</template>
		</input-vue>

		<input-vue
			label="Contact"
			id="1"
			:focus="focus"
			v-model:value="contact"
			:value="contact"
			@next="changeFocus"
		>
			<template v-slot:icon>
				<div class="icon"><i class="fas fa-phone-alt"></i></div>
			</template>
		</input-vue>

		<input-vue
			label="Location"
			id="2"
			:focus="focus"
			v-model:value="location"
			:value="location"
			@next="changeFocus"
		>
			<template v-slot:icon>
				<div class="icon"><i class="fas fa-map-marker-alt"></i></div>
			</template>
			<template v-slot:dropValue>
				<span class="value">
					{{ location }}
				</span>
			</template>
			<template v-slot:drop>
				<span @click="showSelect = !showSelect" class="icon">
					<i class="fas fa-caret-down"></i>
				</span>
			</template>
		</input-vue>
		<div class="select" v-if="showSelect">
			<h4 class="sel" v-for="(location, index) in locations" :key="index">
				<span @click="selectLocation(location)">{{ location }}</span>
			</h4>
		</div>

		<div class="button">
			<button class="continue btn long" @click.prevent="nextPage">
				Continue
			</button>
		</div>
	</div>
</template>

<script>
import InputVue from "./Input.vue";
export default {
	name: "InfoPage",

	components: {
		InputVue,
	},

	data() {
		return {
			locations: ["Stage", "Chebarus", "Kesses"],
			restaurantName: "",
			contact: "",
			location: "",
			showSelect: false,
			focus: undefined,
		};
	},

	methods: {
		changeFocus(id) {
			this.focus = id;
		},

		nextPage() {
			const info = {
				restaurantName: this.restaurantName,
				contact: this.contact,
				location: this.location,
			};
			this.$emit("continue", { next: true, data: info });
		},

		selectLocation(location) {
			this.location = location;
			this.showSelect = !this.showSelect;
		},
	},
};
</script>

<style scoped>
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
	color: var(--bg);
	height: 2.8rem;
	font-weight: 600;
	background: var(--main);
	border-radius: 0.2rem;
	margin: 0.7rem 0;
	box-shadow: var(--shadow);
}
</style>

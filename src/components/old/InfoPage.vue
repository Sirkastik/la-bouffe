<template>
	<div class="page one">
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
				<span @click="showSelect = !showSelect" class="value">
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
			<button class="continue btn pair" @click.prevent="nextPage">
				Continue
			</button>
		</div>
	</div>
</template>

<script>
import InputVue from "./utils/Input.vue";
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
			location: "Choose Location",
			showSelect: false,
			focus: undefined,
		};
	},

	methods: {
		changeFocus(id) {
			this.focus = id;
		},

		async nextPage() {
			if (this.validate() !== "") {
				this.$toast.error(this.validate());
			} else {
				const res = await fetch("https://source.unsplash.com/random/1600x900/?food");
				const url = res.url;
				const data = {
					info: {
						restaurantName: this.restaurantName,
						contact: this.contact,
						location: this.location,
						photoUrl: url
					},
				};
				this.$emit("continue", { next: true, data: data });
			}
		},

		validate() {
			if (
				this.restaurantName == "" ||
				this.contact == "" ||
				this.location == ""
			)
				return "Enter all info please!";
			return "";
		},

		selectLocation(location) {
			this.location = location;
			this.showSelect = !this.showSelect;
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
	margin-bottom: 1rem;
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

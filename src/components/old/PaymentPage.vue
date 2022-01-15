<template>
	<div class="page two">
		<input-vue
			label="Payment Type"
			id="10"
			:focus="focus"
			v-model:value="paymentType"
			:value="paymentType"
			@next="changeFocus"
		>
			<template v-slot:icon>
				<div class="icon"><i class="fas fa-money-check"></i></div>
			</template>
			<template v-slot:dropValue>
				<span @click="showSelect = !showSelect" class="value">
					{{ paymentType }}
				</span>
			</template>
			<template v-slot:drop>
				<span @click="showSelect = !showSelect" class="icon">
					<i class="fas fa-caret-down"></i>
				</span>
			</template>
		</input-vue>
		<div class="select" v-if="showSelect">
			<h4 class="sel" v-for="(type, index) in paymentOptions" :key="index">
				<span @click="selectType(type)">{{ type }}</span>
			</h4>
		</div>

		<input-vue
			v-if="paymentType == 'Buy Goods...'"
			label="Till Number"
			id="11"
			:focus="focus"
			v-model:value="tillNumber"
			:value="tillNumber"
			@next="changeFocus"
		>
			<template v-slot:icon>
				<div class="icon"><i class="fas fa-mobile"></i></div>
			</template>
		</input-vue>

		<input-vue
			v-if="paymentType == 'Send Money' || paymentType == 'Pochi la...'"
			label="Phone Number"
			id="11"
			:focus="focus"
			v-model:value="phoneNumber"
			:value="phoneNumber"
			@next="changeFocus"
		>
			<template v-slot:icon>
				<div class="icon"><i class="fas fa-mobile"></i></div>
			</template>
		</input-vue>

		<input-vue
			v-if="paymentType == 'Pay Bill'"
			label="Business Number"
			id="11"
			:focus="focus"
			v-model:value="businessNumber"
			:value="businessNumber"
			@next="changeFocus"
		>
			<template v-slot:icon>
				<div class="icon"><i class="fas fa-mobile"></i></div>
			</template>
		</input-vue>

		<input-vue
			v-if="paymentType == 'Pay Bill'"
			label="Account Number"
			id="12"
			:focus="focus"
			v-model:value="accNumber"
			:value="accNumber"
			@next="changeFocus"
		>
			<template v-slot:icon>
				<div class="icon"><i class="fas fa-mobile"></i></div>
			</template>
		</input-vue>

		<input-vue
			label="Payment Name"
			id="13"
			:focus="focus"
			v-model:value="paymentName"
			:value="paymentName"
			@next="changeFocus"
		>
			<template v-slot:icon>
				<div class="icon"><i class="fas fa-cash-register"></i></div>
			</template>
		</input-vue>

		<div class="button">
			<button class="back btn pair" @click.prevent="prevPage">Back</button>
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
			paymentOptions: ["Pay Bill", "Buy Goods...", "Pochi la...", "Send Money"],
			paymentType: "Choose Payment Type",
			tillNumber: "",
			phoneNumber: "",
			businessNumber: "",
			accNumber: "",
			paymentName: "",
			showSelect: false,
			focus: undefined,
		};
	},

	computed: {
		paymentOption() {
			if (this.tillNumber) return { tillNumber: this.tillNumber };
			else if (this.businessNumber) {
				return {
					businessNumber: this.businessNumber,
					accNumber: this.accNumber,
				};
			} else return { phoneNumber: this.phoneNumber };
		},
	},

	methods: {
		changeFocus(id) {
			this.focus = id;
		},

		nextPage() {
			if (this.validate() !== "") {
				this.$toast.error(this.validate());
			} else {
				const data = {
					payment: {
						paymentType: this.paymentType,
						paymentName: this.paymentName,
						...this.paymentOption,
					}
				};
				this.$emit("continue", { next: true, data: data });
			}
		},

		validate() {
			if (this.paymentType == "" || this.paymentName == "")
				return "Enter all info please!";
			return "";
		},

		prevPage() {
			this.$emit("continue", { next: false });
		},

		selectType(type) {
			this.paymentType = type;
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

	column-count: 4;
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

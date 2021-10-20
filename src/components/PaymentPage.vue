<template>
	<div class="page two">
		<h3>Payment Info:</h3>
		<input-vue
			label="Payment Type"
			id="0"
			:focus="focus"
			v-model:value="paymentType"
			:value="paymentType"
			@next="changeFocus"
		>
			<template v-slot:icon>
				<div class="icon"><i class="fas fa-money-check"></i></div>
			</template>
			<template v-slot:dropValue>
				<span class="value">
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
			<h4
				class="sel"
				v-for="(type, index) in paymentOptions"
				:key="index"
			>
				<span @click="selectType(type)">{{ type }}</span>
			</h4>
		</div>

		<input-vue
			v-if="paymentType == 'Buy Goods...'"
			label="Till Number"
			id="1"
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
			v-if="
				paymentType == 'Send Money' ||
					paymentType == 'Pochi La Biashara'
			"
			label="Phone Number"
			id="1"
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
			id="1"
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
			id="2"
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
			id="3"
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
			<button class="back btn" @click.prevent="prevPage">Back</button>
			<button class="continue btn" @click.prevent="nextPage">
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
			paymentOptions: [
				"Pay Bill",
				"Buy Goods...",
				"Pochi La Biashara",
				"Send Money",
			],
			paymentType: "",
			tillNumber: "",
			phoneNumber: "",
			businessNumber: "",
			accNumber: "",
			paymentName: "",
			showSelect: false,
			focus: undefined,
		};
	},

	methods: {
		changeFocus(id) {
			this.focus = id;
		},

		nextPage() {
			const paymentInfo = {
				paymentType: this.paymentType,
				tillNumber: this.tillNumber,
				phoneNumber: this.phoneNumber,
				businessNumber: this.businessNumber,
				accNumber: this.accNumber,
				paymentName: this.paymentName,
			};
			this.$emit("continue", { next: true, data: paymentInfo });
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
	color: var(--bg);
	height: 2.8rem;
	font-weight: 600;
	background: var(--main);
	border-radius: 0.2rem;
	margin: 0.7rem 0;
	box-shadow: var(--shadow);
}
</style>

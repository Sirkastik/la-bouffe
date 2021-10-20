<template>
	<div class="input-div" :class="{ focus: this.focus == id }">
		<div class="label">{{ this.label }}</div>
		<slot name="icon"></slot>
		<div
			class="input"
			:class="{
				hidden:
					this.label == 'Location' || this.label == 'Payment Type',
			}"
		>
			<input
				@keypress.enter.prevent="changeFocus"
				:type="this.type"
				:id="this.id"
				@input="$emit('update:value', $event.target.value)"
				:value="this.value"
				@focus="toggleFocus"
				@blur="blurFocus"
			/>
		</div>
		<slot name="dropValue"></slot>
		<slot name="drop"></slot>
	</div>
</template>

<script>
export default {
	name: "InputVue",

	emits: ["update:value", "next"],

	props: {
		label: {
			type: String,
			required: true,
		},
		type: {
			type: String,
			default: "text",
		},
		id: {
			type: String,
			required: true,
		},
		value: {
			type: String,
			required: true,
		},
		focus: {
			type: Number,
		},
	},

	watch: {
		focus: function() {
			const input = document.getElementById(`${this.focus}`);
			if (this.focus && input) {
				input.focus();
			}
		},
	},

	computed: {
		addTwo() {
			return this.label == "Till Number" || this.label == "Phone Number";
		},
	},

	methods: {
		changeFocus(e) {
			if (this.addTwo) this.$emit("next", parseInt(e.target.id) + 2);
			else this.$emit("next", parseInt(e.target.id) + 1);
		},

		toggleFocus(e) {
			this.$emit("next", parseInt(e.target.id));
		},

		blurFocus() {
			this.$emit("next", undefined);
		},
	},
};
</script>

<style scoped>
.input-div {
	position: relative;
	height: 3rem;
	display: flex;
	gap: 0.6rem;
	align-items: center;
	margin: 3rem 0;
	padding: 1rem;
	border: 2px solid var(--main);
	border-radius: 0.6rem;
	box-shadow: var(--shadow);
}

.input {
	width: 100%;
	color: var(--main);
}

input {
	all: unset;
	text-align: start;
	width: 100%;
}

.hidden {
	display: none;
}

.label {
	pointer-events: none;
	font-size: 1rem;
	position: absolute;
	background: var(--bg);
	padding: 0 5px;
	font-size: 0.8em;
	transform: translate(1.5rem, -160%);
	z-index: 1;
}

.input-div.focus {
	border: 2px solid var(--accent);
}

.input-div.focus input {
	color: var(--accent);
}

.input-div.focus .label {
	color: var(--accent);
}

.input-div.focus .icon {
	color: var(--accent);
}
</style>

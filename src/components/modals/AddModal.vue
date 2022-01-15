<template>
	<div class="modal">
		<form @submit.prevent="submit">
			<h1>
				<span>ADD NEW FOOD ITEM</span>
				<span @click="$emit('close')" class="close">
					<i class="fas fa-times-circle"></i>
				</span>
			</h1>

			<div class="dropdown">
				<div class="form-control">
					<label>Item Category</label>
					<input
						type="text"
						v-model="category"
						placeholder="Choose Category"
						@focus="showCatOptions = !showCatOptions"
						readonly
						required
					/>
					<span class="icon" @click="showCatOptions = !showCatOptions">
						<i v-if="showCatOptions" class="fas fa-chevron-up"></i>
						<i v-else class="fas fa-chevron-down"></i>
					</span>
				</div>
				<div class="options" v-if="showCatOptions">
					<div class="option" @click="setCategory('breakfast')">
						<span>Breakfast</span><span><i class="fas fa-coffee"></i></span>
					</div>
					<div class="option" @click="setCategory('dishes')">
						<span>Dishes</span>
						<span><i class="fas fa-utensils"></i></span>
					</div>
					<div class="option" @click="setCategory('drinks')">
						<span>Drink</span><span><i class="fas fa-cocktail"></i></span>
					</div>
					<div class="option" @click="setCategory('snacks')">
						<span>Snack</span><span><i class="fas fa-hamburger"></i></span>
					</div>
					<div class="option" @click="setCategory('desserts')">
						<span>Dessert</span><span><i class="fas fa-cookie"></i></span>
					</div>
				</div>
			</div>
			<div class="dropdown" v-if="category === 'dishes'">
				<div class="form-control">
					<label>Item Type</label>
					<input
						type="text"
						v-model="type"
						placeholder="Choose Type"
						@focus="showTypeOptions = !showTypeOptions"
						readonly
						required
					/>
					<span class="icon" @click="showTypeOptions = !showTypeOptions">
						<i v-if="showTypeOptions" class="fas fa-chevron-up"></i>
						<i v-else class="fas fa-chevron-down"></i>
					</span>
				</div>
				<div class="options" v-if="showTypeOptions">
					<div class="option" @click="setType('single')">
						<span>Single</span><span>e.g Chapati</span>
					</div>
					<div class="option" @click="setType('combo')">
						<span>Combo</span><span> e.g Chapati & beans</span>
					</div>
				</div>
			</div>
			<div class="combo" v-if="combo">
				<label class="combo-num-div">
					<span>Number of items in combo:</span>
					<div class="combo-num">
						<span @click="decreaseCount">
							<i class="fas fa-chevron-left"></i>
						</span>
						<div class="num">{{ comboItemsCount }}</div>
						<span @click="increaseCount">
							<i class="fas fa-chevron-right"></i>
						</span>
					</div>
				</label>
				<div
					class="form-control"
					v-for="(item, index) in comboItems"
					:key="index"
				>
					<div class="combo-top">
						<label>Item({{ index + 1 }}) Name</label>
						<label>Price/Item</label>
						<label>Quantity</label>
					</div>
					<div class="combo-input">
						<input type="text" v-model="item.name" />
						<input type="number" v-model="item.price" />
						<label class="combo-quantity">
							<span @click="if (item.quantity > 1) item.quantity -= 1;">
								<i class="fas fa-chevron-left"></i>
							</span>
							<div class="num">{{ item.quantity }}</div>
							<span @click="item.quantity += 1">
								<i class="fas fa-chevron-right"></i>
							</span>
						</label>
					</div>
				</div>
			</div>
			<div class="form-control">
				<label>Item Name</label>
				<input type="text" v-if="combo" v-model="comboName" required />
				<input type="text" v-else v-model="name" required />
				<span class="icon">
					<i class="fas fa-pen-fancy"></i>
				</span>
			</div>
			<div class="form-control">
				<label>Item Price</label>
				<input type="number" v-if="combo" v-model="totalPrice" required />
				<input type="number" v-else v-model="price" required />
				<span class="icon">
					<i class="fas fa-pen-fancy"></i>
				</span>
			</div>

			<button class="submitBtn">Submit</button>
		</form>
	</div>
</template>

<script>
import { auth } from "@/includes/firebase";
export default {
	data() {
		return {
			showCatOptions: false,
			category: "",
			showTypeOptions: false,
			type: "",
			comboItems: [],
			comboObj: {
				name: "",
				price: "",
				quantity: 1,
			},
			name: "",
			price: "",
		};
	},

	created() {
		for (let x = 0; x < 2; x++) this.comboItems.push({ ...this.comboObj });
	},

	computed: {
		combo() {
			return this.type === "combo";
		},
		comboItemsCount() {
			return this.comboItems.length;
		},
		comboName() {
			if (!this.comboItems[0].name) return "";
			let name = "";
			for (let x = 0; x < this.comboItems.length; x++) {
				if (x === this.comboItems.length - 1)
					name += `& ${this.comboItems[x].name}`;
				else name += `${this.comboItems[x].name} `;
			}
			return name;
		},
		totalPrice() {
			if (this.type === "single") return this.price;
			let total = 0;
			this.comboItems.forEach((item) => (total += item.price * item.quantity));
			return total ? total : "";
		},
	},

	methods: {
		setCategory(category) {
			this.category = category;
			this.showCatOptions = false;
		},
		setType(type) {
			this.type = type;
			this.showTypeOptions = false;
		},

		increaseCount() {
			this.comboItems.push({ ...this.comboObj });
		},
		decreaseCount() {
			if (this.comboItems.length > 2) this.comboItems.length -= 1;
		},

		increase(index) {
			const quantity = this.quantityArray[index];
			if (quantity) this.quantityArray[index] += 1;
			else this.quantityArray[index] = 1;
		},
		decrease(index) {
			const quantity = this.quantityArray[index];
			if (quantity) this.quantityArray[index] -= 1;
		},
		submit() {
			let data = {
				uid: auth.currentUser.uid,
				restaurant: auth.currentUser.displayName,
				category: this.category,
				type: this.type,
				name: this.name,
				price: this.price,
				quantity: 1,
			};
			if (this.type === "combo")
				data = {
					...data,
					items: this.comboItems,
					name: this.comboName,
					price: this.totalPrice,
				};
			this.$emit('add', data)
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

.dropdown {
	position: relative;
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

input:read-only {
	font-size: 0.6em;
	text-transform: uppercase;
	letter-spacing: 1px;
	font-weight: bold;
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

.combo {
	padding: 1rem 1.5rem 1.5rem 1.5rem;
	display: flex;
	flex-direction: column;
	gap: 1rem;
	box-shadow: var(--shadow);
	/* border: 1px solid var(--main); */
	border-radius: 0.5rem;
}

.combo-top {
	/* padding-left: 1.25rem; */
	display: flex;
	justify-content: space-between;
}

.combo-top:nth-child(3) {
	flex-shrink: 1;
}

.combo-num-div {
	display: flex;
	align-items: center;
}

.combo-num,
.combo-quantity {
	display: flex;
	align-items: center;
	gap: 0.5rem;
	font-weight: bold;
	margin-left: 0.75rem;
}

.edit-num {
	display: flex;
	flex-direction: column;
	gap: 0.15rem;
}

.edit-num > span {
	background: var(--main);
	color: var(--bg);
	border-radius: 0.1rem;
	padding: 0.1rem;
}

.num {
	color: var(--main);
	font-size: 1.5em;
}

.combo-input {
	display: flex;
	justify-content: space-between;
	align-items: center;
	gap: 0.75rem;
	padding-right: 0.5rem;
	margin-top: 0.5rem;
}

.combo-input > input {
	all: unset;
	font-size: 0.85rem;
	border: 1px solid var(--lighter);
	display: block;
	width: 100%;
	padding: 0.5rem;
	border-radius: 0.25rem;
}

.ind {
	font-weight: bold;
	flex-shrink: 1;
}

.combo-name {
	color: var(--main);
	font-size: 1.25em;
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

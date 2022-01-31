<template>
	<div class="modal">
		<section>
			<h1>
				<span>ORDERS</span>
				<span @click="$emit('close')" class="close">
					<i class="fas fa-times-circle"></i>
				</span>
			</h1>

			<div class="orders">
				<div class="order" v-for="order in orders" :key="order.id">
					<div class="customer">
						<span>Customer Name: {{ order.customer.customerName }}</span>
						<span>Phone: {{ order.customer.customerPhone }}</span>
						<span>Location: {{ order.customer.customerLocation }}</span>
					</div>
					<div class="customerOrders">
						<div
							class="customerOrder"
							v-for="(order, index) in order.orders"
							:key="index"
						>
							<span>Name: {{ order.name }}</span>
							<span>Price: {{ order.price }}</span>
							<span>Quantity: {{ order.quantity }}</span>
						</div>
					</div>
					<div class="accept">
						<span>Complete</span>
						<span
							class="check"
							:class="{ disabled: order.accepted !== 'confirmed' }"
						>
							<i class="fas fa-check-square"></i>
						</span>
					</div>
				</div>
			</div>
		</section>
	</div>
</template>

<script>
export default {
	props: ["orders"],
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

section {
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

section.orders {
	display: flex;
	gap: 1rem;
}

.order {
	font-size: 0.8em;
	font-weight: bold;
	text-transform: uppercase;
	letter-spacing: 1px;
	display: flex;
	flex-direction: column;
	gap: 1rem;
	padding: 1rem;
	box-shadow: var(--shadow);
}

.customer {
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
}

.customerOrders {
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
	padding-left: 1rem;
}

.customerOrder {
	display: flex;
	justify-content: space-between;
	padding: 0.5rem;
	border-radius: 0.25rem;
	border: 1px solid var(--lighter);
}

.accept {
	display: flex;
	align-items: center;
	gap: 0.5rem;
}

.check {
	font-size: 1.25em;
}

.check:hover {
	opacity: 1;
}

.disabled {
	opacity: 0.5;
}
</style>

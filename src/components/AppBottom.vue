<template>
	<nav>
		<button class="btn pointer" @click="$emit('home')">
			<i class="fas fa-store-alt"></i>
		</button>
		<button class="btn pointer" @click="$emit('open')">
			<i class="fas fa-plus-circle"></i>
		</button>
		<button class="btn pointer" @click="$emit('orders')">
			<i class="fas fa-receipt"></i>
		</button>
		<button class="btn pointer" @click="$emit('user')">
			<i class="fas fa-user-alt"></i>
		</button>
	</nav>
</template>

<script>
export default {};
</script>

<style scoped>
nav {
	background: var(--grad);
	background-size: 500%;
	background-position: center;
	height: 3.5rem;
	position: fixed;
	z-index: 2;
	inset: auto 1rem 1rem 1rem;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 1.25rem;
	border-radius: 0.5rem;
	box-shadow: var(--shadow);
	animation: slide-up 1.25s ease both;
}

@keyframes slide-up {
	from {
		transform: translateY(150%);
	}
	to {
		transform: translateY(0);
	}
}

nav::before {
	border-radius: inherit;
	content: "";
	position: absolute;
	z-index: -2;
	inset: 0 -3rem -3rem -3rem;
	background: linear-gradient(
		0deg,
		rgba(0, 0, 0, 0.4) 0%,
		rgba(255, 255, 255, 0) 100%
	);
}
nav::after {
	border-radius: inherit;
	content: "";
	position: absolute;
	z-index: -1;
	inset: 0;
	background: var(--grad);
	background-size: 250%;
	background-position: center;
}
</style>

<template>
	<nav>
		<button class="btn pointer" @click="$emit('home')">
			<i class="fas fa-store-alt"></i>
		</button>
		<button class="btn pointer" @click="$emit('open')">
			<i class="fas fa-plus-circle"></i>
		</button>
		<button class="btn pointer" @click="$emit('user')">
			<i class="fas fa-user-alt"></i>
		</button>
	</nav>
</template>

<script>
export default {
};
</script>

<style scoped>
nav {
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
</style>

<template>
	<nav v-if="show()">
		<span @click="$router.push('/')">
			<i class="fas fa-home"></i>
		</span>
		<span @click="$router.push('/search')">
			<i class="fas fa-search"></i>
		</span>
		<span @click="$router.push('/cart')">
			<i class="fas fa-shopping-cart"></i>
		</span>
	</nav>
</template>

<script>
export default {
	methods: {
		show() {
			return window.innerWidth < 600;
		},
	},
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

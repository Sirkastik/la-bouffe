<template>
	<nav>
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
</style>

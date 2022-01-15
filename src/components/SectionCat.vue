<template>
	<section>
		<header>
			<span>Categories</span> <span><i class="fas fa-th-large"></i></span>
		</header>
		<div class="contents">
			<span @click="this.$router.push('/categories/breakfast')">
				<i class="fas fa-coffee"></i>
			</span>
			<span @click="this.$router.push('/categories/dishes')">
				<i class="fas fa-utensils"></i>
			</span>
			<span @click="this.$router.push('/categories/drinks')">
				<i class="fas fa-cocktail"></i>
			</span>
			<span @click="this.$router.push('/categories/snacks')">
				<i class="fas fa-hamburger"></i>
			</span>
			<span @click="this.$router.push('/categories/desserts')">
				<i class="fas fa-cookie"></i>
			</span>
		</div>
	</section>
</template>

<script>
export default {};
</script>

<style scoped>
section {
	margin: 1.5rem 0;
}

header {
	font-weight: bold;
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.contents {
	display: flex;
	justify-content: space-between;
	padding: .5rem 0.25rem;
	margin: 1rem 0;
	border-radius: .5rem;
	box-shadow: var(--shadow);
} 

.contents span {
	width: 3.3rem;
	height: 3.3rem;
	display: grid;
	place-content: center;
	padding: 1rem;
	border-radius: 0.6rem;
}

.contents span:hover {
	color: var(--main);
	background: var(--accent);
}
</style>

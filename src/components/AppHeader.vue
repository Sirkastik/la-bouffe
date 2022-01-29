<template>
	<header>
		<div class="logo" @click="$router.push('/')">
			<img id="logo" src="@/assets/logo.png" alt="AppLogo" />
		</div>
		<h3 class="name">La Bouffe</h3>
		<div class="links">
			<span class="search" v-if="show()">
				<i class="fas fa-search"></i>
			</span>
			<span class="cart" v-if="show()">
				<i class="fas fa-shopping-cart"></i>
			</span>
			<span class="link" @click="$router.push('/account')">
				<i class="fas fa-external-link-alt"></i>
			</span>
		</div>
	</header>
</template>

<script>
export default {
	methods: {
		show() {
			return window.innerWidth > 600
		}
	}
}
</script>

<style scoped>
header {
	height: 3.5rem;
	/* position: fixed; */
	/* z-index: 10; */
	/* inset: .5rem .75rem auto .75rem; */
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 1.25rem;
	border-radius: 0.5rem;
	box-shadow: var(--shadow);
}

.name {
	font-weight: bolder;
}

.logo {
	height: 1.6rem;
}

img {
	height: 100%;
}

.links {
	display: flex;
	gap: 1rem;
}

.links > span {
	cursor: pointer;
}

</style>

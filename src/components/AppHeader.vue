<template>
	<header>
		<div class="logo" @click="$router.push('/')">
			<img id="logo" src="@/assets/logo.png" alt="AppLogo" />
		</div>
		<h3 class="name">La Bouffe</h3>
		<span class="link" @click="$router.push('/account')">
			<i class="fas fa-external-link-alt"></i>
		</span>
	</header>
</template>

<style scoped>
header {
	height: 3.5rem;
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
</style>

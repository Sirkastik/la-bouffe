<template>
	<div class="homepage">
		<img id="logo" src="../assets/logo.png" alt="AppLogo" />
		<h1>Welcome To <span class="appName">La Bouffé</span></h1>
		<p>
			You get the chance to order food, and get it delivered to your
			doorstep. To get started as a Foodie, Sign in below... Bon
			appétit😋!
		</p>
		<div class="svg">
			<img id="main" src="../assets/main.svg" alt="mainImage" />
		</div>
		<button @click="this.$router.push('/account')" class="button">
			<i class="fas fa-envelope"></i> Sign in with Email
		</button>

		<p>
			Restaurants and Chefs can also create an account
			<span
				@click="this.$router.push('/restaurant/account')"
				class="underlined"
				>here</span
			>🥧
		</p>
	</div>
</template>

<script>
export default {
	name: "HomePage",
};
</script>

<style scoped>
.homepage {
	height: 100vh;
	padding: 0 2rem;
	display: flex;
	justify-content: center;
	flex-direction: column;
	align-items: center;
	color: var(--main);
	text-align: center;
}

#logo {
	height: 6.8rem;
	margin-bottom: 1rem;
}

h1 {
	margin: 0 0 1rem 0;
}

p {
	font-weight: 500;
	margin: 1rem;
}
.svg {
	margin-block: 1rem;
	height: 30vh;
}

#main {
	height: 100%;
}

.button {
	all: unset;
	cursor: pointer;
	color: var(--bg);
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 0.5rem;
	width: 240px;

	height: 2.8rem;
	font-weight: 600;
	background: var(--main);
	border-radius: 0.2rem;
	margin: 0.7rem 0;
	box-shadow: var(--shadow);
}

.white {
	background: white;
	color: var(--main);
}

.button:hover {
	cursor: pointer;
	box-shadow: var(--hoverShadow);
}

.underlined {
	color: var(--accent);
	border-bottom: 1px dashed currentColor;
	cursor: pointer;
}

@media screen and (max-width: 800px) {
	h1 {
		font-size: 2rem;
	}
	.button {
		font-size: 1rem;
	}
	.svg {
		display: none;
	}
}
</style>

<template>
	<div class="food">
		<div class="card">
			{{ item.category }} <span>@ {{ item.price }}</span>
		</div>
		<div class="img">
			<img :src="item.photoUrl" alt="photo" />
		</div>
		<div class="info">
			<h2>{{ item.name }}</h2>
			<h3>{{ item.restaurant }}</h3>
		</div>
	</div>
</template>
<script>
export default {
	props: ["item"],
};
</script>
<style scoped>
.food {
	cursor: pointer;
	aspect-ratio: 1/1;
	border-radius: 0.25rem;
	box-shadow: var(--shadow);
	position: relative;
}

.img {
	border-radius: 0.25rem;
	position: absolute;
	inset: 0;
	z-index: -1;
	width: inherit;
	height: 100%;
	overflow: hidden;
}

img {
	max-width: unset;
	height: 100%;
	aspect-ratio: 1/1;
	border-radius: 0.5rem;
	filter: brightness(50%);
}

.info {
	position: absolute;
	inset: auto 0 0 0;
	color: white;
	padding: 0.75rem;
	border-radius: 0 0 0.5rem 0.5rem;
	display: flex;
	flex-direction: column;
	gap: 0.4rem;

	text-transform: uppercase;
	letter-spacing: 1px;
	font-weight: 600;
}

.card {
	position: absolute;
	inset: 1rem 0 auto auto;
	background: var(--grad);
	background-size: 500%;
	background-position: center;
	color: var(--main);
	padding: 0.3rem 0.5rem;
	border-radius: 0.3rem 0 0 0.3rem;

	font-size: 0.7em;
	text-transform: uppercase;
	letter-spacing: 1px;
	font-weight: bold;
}

h2 {
	font-size: 0.8em;

	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}

h2 span {
	font-size: 0.75em;
}

h3 {
	font-size: 0.7em;
	letter-spacing: 1.5px;
	font-weight: 500;

	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}
</style>

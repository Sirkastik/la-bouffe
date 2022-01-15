<template>
	<div class="restaurant">
		<div class="img">
			<img :src="restaurant.photoUrl" alt="photo" />
		</div>
		<div class="info">
			<h3 class="name">{{ restaurant.restaurantName }}</h3>
			<span
				><i class="fas fa-map-marker-alt"></i> {{ restaurant.location }}</span
			>
		</div>
	</div>
</template>
<script>
export default {
	props: ["restaurant"],
};
</script>
<style scoped>
.restaurant {
	cursor: pointer;
	aspect-ratio: 4/5;
	border-radius: 0.75rem;
	box-shadow: var(--shadow);
	position: relative;
}

.img {
	border-radius: 0.75rem;
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
	aspect-ratio: 4/5;
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
	gap: 0.6rem;
}

h3 {
	font-size: 0.9em;
	text-transform: uppercase;
	letter-spacing: 1px;
	font-weight: bold;

	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}
.info span {
	font-size: 0.7em;
	text-transform: uppercase;
	letter-spacing: 1px;
}
</style>

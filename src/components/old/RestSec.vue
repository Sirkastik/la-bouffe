<template>
	<div class="section">
		<h3>
			<span>Restaurants</span> <span><i class="fas fa-store"></i></span>
		</h3>
		<div class="restaurants">
			<div
				v-for="res in restaurants"
				v-bind:key="res.id"
				class="res"
				@click="navigate(res.id)"
			>
				<img :src="res.photoUrl" alt="photo" />
				<div class="info">
					<h3 class="name">{{ res.restaurantName }}</h3>
					<span>{{ res.location }}</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { db, collection, getDocs } from "../includes/firebase";
export default {
	data() {
		return {
			restaurants: [],
			images: [],
		};
	},

	async created() {
		const resSnap = await getDocs(collection(db, "restaurants"));
		resSnap.forEach(this.getItems);
	},

	methods: {
		async getItems(document) {
			const data = document.data();
			const info = {
				...data.info,
				id: document.id,
			};
			this.restaurants.unshift(info);
		},

		navigate(id) {
			this.$router.push(`/client/restaurant/${id}`);
		},
	},
};
</script>

<style scoped>
.section {
	padding: 0 1rem;
	padding-bottom: 3rem;
}

.section > h3 {
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.restaurants {
	display: flex;
	flex-direction: column;
	gap: 1rem;
	padding: 1rem 0;
}

.res {
	/* background: var(--bg); */
	/* padding: 1rem;	 */
	position: relative;
	width: 320px;
	margin: auto;
	aspect-ratio: 16/9;
	box-shadow: var(--shadow);
	border-radius: 0.5rem;
	overflow: hidden;

	display: flex;
	align-items: flex-end;
}

.info {
	height: 100%;
	width: 100%;
	color: var(--color);
	text-align: center;
	background: #3f3d56a2;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0.7rem 1rem;
}

img {
	position: absolute;
	inset: 0;
	z-index: -10;
	height: 100%;
	width: 100%;
}

/* .img::after {
	content: "";
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	z-index: 1;
	border-radius: 1.5rem;
	background: radial-gradient(
		circle,
		rgba(63, 61, 86, 1) 23%,
		rgb(124, 128, 143) 87%,
		rgb(65, 65, 65) 100%
	);
	opacity: 0.4;
	box-shadow: var(--shadow);
} */

/* .img {
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	z-index: -3;
	height: 180px;
	width: 320px;
	border-radius: 1.5rem;

	box-shadow: var(--shadow);
} */

/* img {
	height: 100%;
	width: 100%;
	border-radius: 1.5rem;
} */
</style>

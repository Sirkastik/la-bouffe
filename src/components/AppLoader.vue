<template>
	<div class="product">
		<div class="left loading"></div>
		<div class="right">
			<div class="short loading"></div>
			<div class="long loading"></div>
		</div>
	</div>
</template>

<style scoped>
.product {
	width: 100%;
	height: 25vw;
	display: flex;
	align-items: center;
	gap: 1rem;
	padding-right: 1rem;
	margin-bottom: 1rem;

	border-radius: 0.75rem;
	overflow: hidden;
	box-shadow: var(--shadow);
}

.left {
	flex: 1;
	aspect-ratio: 1/1;
	overflow: hidden;
	background: #ffbc2133;

}

.right {
	flex: 1.75;
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
}

.short {
	background: #fcb61433;
	width: 35%;
	height: 0.65rem;
	border-radius: 5rem;
}

.long {
	width: 80%;
	height: 0.5rem;
	border-radius: 5rem;
	background: var(--color);
}

.loading {
	position: relative;
	overflow: hidden;
}

.loading::after {
	position: absolute;
	inset: 0;
	transform: translateX(-100%);
	background-image: linear-gradient(
		90deg,
		rgba(255, 255, 255, 0) 0,
		rgba(255, 255, 255, 0.2) 20%,
		rgba(255, 255, 255, 0.5) 60%,
		rgba(255, 255, 255, 0)
	);
	animation: shimmer 2s infinite;
	content: "";
}

@keyframes shimmer {
	100% {
		transform: translateX(100%);
	}
}
</style>
<template>
	<div class="categories">
		<h3><span>Categories</span> <span><i class="fas fa-th-large"></i></span></h3>
		<div class="contents">
			<span title="dishes" @click="this.$router.push('/categories/dishes')">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					xmlns:xlink="http://www.w3.org/1999/xlink"
					viewBox="0 0 24 24"
				>
					<g fill="none">
						<path
							d="M18 3a1 1 0 0 1 .993.883L19 4v16a1 1 0 0 1-1.993.117L17 20v-5h-1a1 1 0 0 1-.993-.883L15 14V8c0-2.21 1.5-5 3-5zm-6 0a1 1 0 0 1 .993.883L13 4v5a4.002 4.002 0 0 1-3 3.874V20a1 1 0 0 1-1.993.117L8 20v-7.126a4.002 4.002 0 0 1-2.995-3.668L5 9V4a1 1 0 0 1 1.993-.117L7 4v5a2 2 0 0 0 1 1.732V4a1 1 0 0 1 1.993-.117L10 4l.001 6.732a2 2 0 0 0 .992-1.563L11 9V4a1 1 0 0 1 1-1z"
							fill="currentColor"
						></path>
					</g>
				</svg>
			</span>
			<span title="drinks" @click="this.$router.push('/categories/drinks')">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					xmlns:xlink="http://www.w3.org/1999/xlink"
					viewBox="0 0 24 24"
				>
					<path
						d="M19 19H3c-.55 0-1 .45-1 1s.45 1 1 1h16c.55 0 1-.45 1-1s-.45-1-1-1zm1-16H9v2.4l1.81 1.45c.12.09.19.24.19.39v4.26c0 .28-.22.5-.5.5h-4c-.28 0-.5-.22-.5-.5V7.24c0-.15.07-.3.19-.39L8 5.4V3H6c-1.1 0-2 .9-2 2v8c0 2.21 1.79 4 4 4h6c2.21 0 4-1.79 4-4v-3h2c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 5h-2V5h2v3z"
						fill="currentColor"
					></path>
				</svg>
			</span>
			<span title="desserts" @click="this.$router.push('/categories/desserts')">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					xmlns:xlink="http://www.w3.org/1999/xlink"
					viewBox="0 0 20 20"
				>
					<g fill="none">
						<path
							d="M9.996 1.992c-.77 0-1.279.541-1.568 1.027c-.294.493-.45 1.07-.471 1.442c-.041.74.07 1.388.439 1.856c.384.488.96.675 1.6.675c.649 0 1.223-.209 1.605-.697c.369-.472.488-1.115.44-1.839c-.023-.352-.181-.926-.474-1.421c-.287-.485-.796-1.043-1.57-1.043z"
							fill="currentColor"
						></path>
						<path
							d="M3.01 9.79l3.204 2.94a1 1 0 0 0 1.424-.073l.866-.975a2 2 0 0 1 2.992 0l.865.975a1 1 0 0 0 1.424.073l3.204-2.94A2 2 0 0 0 15 8H5a2 2 0 0 0-1.99 1.79z"
							fill="currentColor"
						></path>
						<path
							d="M17 11.137l-2.539 2.33a2 2 0 0 1-2.847-.146l-.866-.976a1 1 0 0 0-1.496 0l-.866.976a2 2 0 0 1-2.848.146L3 11.137V16h-.5a.5.5 0 0 0 0 1h15a.5.5 0 0 0 0-1H17v-4.863z"
							fill="currentColor"
						></path>
					</g>
				</svg>
			</span>
			<span title="snacks" @click="this.$router.push('/categories/snacks')">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					xmlns:xlink="http://www.w3.org/1999/xlink"
					viewBox="0 0 24 24"
				>
					<g fill="none">
						<path
							d="M5.003 4.66c0-1.496 1.231-2.804 2.821-2.647A20.782 20.782 0 0 1 21.266 8.84c1.07 1.193.737 2.964-.479 3.845l-.423.307l-.363-.54l-.008-.011c-3.19-4.407-8.38-7.275-14.24-7.275h-.75V4.66zm13.768 8.65l.378.563l-3.947 2.865l-.202.15v2.102a1 1 0 0 1-2 0v-.06a.5.5 0 0 0-.996.06v1.501a1 1 0 0 1-1.995.1l-1.44 1.04c-1.489 1.074-3.57.011-3.569-1.826l.003-13.14h.75c5.354 0 10.096 2.617 13.018 6.645zm-9.767-2.32a1 1 0 1 0 0-2a1 1 0 0 0 0 2zm4 2.998a1 1 0 1 0 0-2a1 1 0 0 0 0 2zm-4 2.998a1 1 0 1 0 0-2a1 1 0 0 0 0 2z"
							fill="currentColor"
						></path>
					</g>
				</svg>
			</span>
		</div>
	</div>
	
</template>

<script>
export default {};
</script>

<style scoped>
.categories {
	margin: 1rem 0;
	padding: 0 1rem;
}

h3 {
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.contents {
	display: flex;
	justify-content: space-between;
	padding: 1.4rem 0;
	padding-inline: .4rem;
}

.contents > span {
	height: 3.3rem;
	width: 3.3rem;
	background: var(--main);
	color: var(--color);
	padding: 1rem;
	display: grid;
	place-content: center;
	border-radius: .6rem;
}

.contents > span:hover {
	background: var(--accent);
	color: var(--main);
}

svg {
	height: 100%;
	width: 100%;
}
</style>

<template>
	<div>
		<ul>
			<li
				v-for="(tab, index) in tabList"
				:key="index"
				:class="{ active: index === value }"
			>
				<label>
					<div class="label">{{ tab }}</div>
					<input
						type="radio"
						name="activeTab"
						:value="index"
						@input="$emit('update:value', parseInt($event.target.value))"
						class="hidden"
					/>
				</label>
			</li>
		</ul>
		<template v-for="(tab, index) in tabList" :key="index">
			<div v-show="index === value" class="tab">
				<slot :name="`tabPanel-${index + 1}`" />
			</div>
		</template>
	</div>
</template>

<script>
export default {
	props: {
		tabList: {
			type: Array,
			required: true,
		},
		value: {
			type: Number,
			required: true,
		},
	},
};
</script>

<style scoped>
ul {
	display: flex;
	justify-content: space-between;
	align-items: center;
	list-style: none;
	padding: 0.4rem 0.5rem;
	border-radius: 0.6rem;
	border: 1px solid var(--main);
	margin-bottom: 2rem;
}

li {
	color: var(--main);
}

.active {
	padding: 0.3rem 1.2rem;
	color: var(--accent);
	background: var(--main);
	border-radius: 0.4rem;
}
.tab {
	padding: 0 0.7rem;
}
</style>

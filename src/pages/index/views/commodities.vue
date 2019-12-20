<template>
	<el-row style="padding: 5px;">
		<el-col v-for="(o, index) in 20" :key="o" :span="12" :xs="12" :md="8" :lg="4"><commodity-card /></el-col>
	</el-row>
</template>

<script>
import commodityCard from '../compoents/commodityCard.vue';

export default {
	components: {
		commodityCard
	},
	methods: {
		
	}
};
</script>

<style></style>

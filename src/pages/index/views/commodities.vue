<template>
	<el-col :span="22" :offset="1" :lg="{ span: 16, offset: 4 }">
		<el-row style="padding: 5px;">
			<el-col v-for="(o, index) in 20" :key="o" :span="12" :xs="12" :md="8" :lg="4"><commodity-card /></el-col>
		</el-row>
	</el-col>
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

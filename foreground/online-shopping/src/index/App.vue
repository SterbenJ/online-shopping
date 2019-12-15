<template>
	<div id="app">
		<el-row type="flex" justify="space-around">
			<el-col :span="12" :xs="20" :lg="8"><router-view /></el-col>
		</el-row>
	</div>
</template>

<script>
export default {
	data() {
		return {};
	},
	components: {
		
	},
	methods: {}
};
</script>

<style lang="stylus" scoped>
	#appfont-family
		Helvetica, sans-serif
</style>

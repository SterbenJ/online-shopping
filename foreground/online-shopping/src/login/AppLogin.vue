<template>
	<div id="login">
		<el-container>
			<el-col class="aside" :lg="8">
				<el-row class="aside" type="flex" justify="center" align="middle">
					<el-col><router-view /></el-col>
				</el-row>
			</el-col>
			<el-col id="content" :lg="16">
				
			</el-col>
		</el-container>
	</div>
</template>

<script>
export default {
	data() {
		return {};
	}
};
</script>

<style lang="stylus" scoped>
	.aside
		height 800px
	#content
		height 800px
		background #42B983
</style>

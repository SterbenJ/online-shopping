<template>
	<el-link type="info" :href="url">还没有账号？点我注册</el-link>
</template>

<script>
import pageRoutes from '../../../../api/pageRoutes.js'

export default {
	data () {
		return {
			url: pageRoutes.register
		}
	}
};
</script>

<style lang="stylus" scoped>
</style>

<template>
	<el-link type="warning" :href="url">忘记密码？</el-link>
</template>

<script>
let defaultUrl = ""

export default {
	props: {
		url: {
			type: String,
			required: false,
			defautl: () => {
				return defaultUrl
			}
		}
	},
	data () {
		return {
			
		}
	}
};
</script>

<style lang="stylus" scoped>
</style>

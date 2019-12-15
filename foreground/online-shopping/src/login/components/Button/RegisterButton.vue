<template>
	<div><el-button class="register_btn" @click="JumpToRegister">注册</el-button></div>
</template>

<script>
export default {
	methods: {
		JumpToRegister() {
			console.log('JunmToRegister');
		}
	}
};
</script>

<style lang="stylus" scoped>
	.register_btn
		width 128px
</style>

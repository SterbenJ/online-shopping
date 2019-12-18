<template>
	<div id="app">
		<header/>
		<router-view class="content" name="content"/>
	</div>
</template>

<script>
import header from '../../common/compoents/header.vue'
	
export default {
	data() {
		return {};
	},
	components: {
		header
	},
	methods: {}
};
</script>

<style lang="stylus" scoped>
#appfont-family
	Helvetica , sans-serif
</style>

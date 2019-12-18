<template>
	<div id="app">
		<router-view class="header" name="header"/>
		<router-view class="content" name="content"/>
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
	Helvetica , sans-serif
</style>

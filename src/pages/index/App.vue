<template>
	<div>
		<my-header/>
		<router-view class="content" name="content"/>
	</div>
</template>

<script>
import MyHeader from '../../common/compoents/header.vue'
	
export default {
	data() {
		return {};
	},
	components: {
		MyHeader
	},
	methods: {}
};
</script>

<style lang="stylus" scoped>
#appfont-family
	Helvetica , sans-serif
</style>

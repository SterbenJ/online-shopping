<template>
	<div>
		<div class="my-header" style="height: 60px;">
			<my-header id="my-header"/>
		</div>
		<div class="content" >
			<router-view name="content"/>
		</div>
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
	methods: {},
	mounted() {
		
	}
};
</script>

<style lang="stylus" scoped>
$nav-height 60px
#appfont-family
	Helvetica , sans-serif
#my-header
	z-index 1000
	width 100%
	position fixed
	top 0
.content
	margin-top $nav-height
</style>

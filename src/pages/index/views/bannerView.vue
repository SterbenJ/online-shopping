<template>
	<el-carousel class="my-banner" indicator-position="inside">
		<el-carousel-item v-for="item in 10" :key="item">
			<banner-content/>
		</el-carousel-item>
	</el-carousel>
</template>

<script>
import bannerContent from '../compoents/bannerContent.vue'
	
export default {
	data() {
		return {};
	},
	components: {
		bannerContent,
	},
	methods: {
	}
};
</script>

<style lang="stylus" scoped>
.my-banner
	margin 0 20px
	background-color whitesmoke
.el-carousel__item
	color #475669
	font-size 18px
	opacity 0.75
	line-height 300px
	margin 0
	.el-image
		width 100%
.el-carousel__item:nth-child(2n)
	background-color #99a9bf
.el-carousel__item:nth-child(2n+1)
	background-color #d3dce6
</style>

<template>
	<el-carousel indicator-position="inside">
		<el-carousel-item v-for="item in 10" :key="item">
			<el-image fit="fill" src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"/>
		</el-carousel-item>
	</el-carousel>
</template>

<script>
export default {
	
}
</script>

<style lang="stylus" scoped>
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

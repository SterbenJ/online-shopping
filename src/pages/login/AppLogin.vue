<template>
	<div id="login">
		<el-container>
			<el-col style="z-index: 10000;" class="aside" :lg="8" :md="12">
				<el-row class="aside" type="flex" justify="center" align="middle">
					<el-col><router-view /></el-col>
				</el-row>
			</el-col>
			<el-col id="content" class="hidden-sm-and-down" :md="12" :lg="16">
				<p id="first-name" class="shop-name">Online</p>
				<p id="second-name" class="shop-name">Shopping</p>
			</el-col>
		</el-container>
	</div>
</template>

<script>
export default {
	data() {
		return {}
	}
}
</script>

<style lang="stylus" scoped>
$big-font-size = 210px
$layout-height = 800px
$base-margin = 20px

@font-face
	font-family bfabc
	src url(../../../public/bfabc.woff2)

.el-container
	height $layout-height

.aside
	height $layout-height
	background white
	
#content
	height $layout-height
	background #409EFF
	opacity 0.8

.shop-name
	margin 0px
	position absolute
	color white
	font-family bfabc
	@media screen and (max-width: 1200px) 
			font-size $big-font-size * 0.5
	@media screen and (min-width: 1200px)
			font-size $big-font-size
	
#first-name
	margin-left $base-margin
	@media screen and (max-width: 1200px)
		bottom $big-font-size * 0.75 * 1.5 + $base-margin
	@media screen and (min-width: 1200px)
		bottom $big-font-size * 1.5 + $base-margin
	
#second-name
	margin-right $base-margin
	right 0px
	bottom $big-font-size * 0.5 + $base-margin
	
</style>

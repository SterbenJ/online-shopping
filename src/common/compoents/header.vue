<template>
	<el-row>
		<el-col>
			<el-menu class="el-menu-demo" mode="horizontal" @select="handleSelect" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b" :router="false">
				<li id="logo">
					<a href="">Online Shopping</a>
				</li>
				<el-menu-item :route="{ path: '/test' }" index="login">
					<template slot="title">
						<i class="el-icon-user"></i>
						<span slot="title">登入</span>
					</template>
				</el-menu-item>
				<el-submenu index="2">
					<template slot="title">
						我的工作台
					</template>
					<el-menu-item index="2-1">选项1</el-menu-item>
					<el-menu-item index="2-2">选项2</el-menu-item>
					<el-menu-item index="2-3">选项3</el-menu-item>
					<el-submenu :popper-append-to-body="true" index="2-4">
						<template slot="title">
							选项4
						</template>
						<el-menu-item index="2-4-1">选项1</el-menu-item>
						<el-menu-item index="2-4-2">选项2</el-menu-item>
						<el-menu-item index="2-4-3">选项3</el-menu-item>
					</el-submenu>
				</el-submenu>
				<el-menu-item index="3" disabled>消息中心</el-menu-item>
				<el-menu-item index="4"><a href="" target="_self">订单管理</a></el-menu-item>
			</el-menu>
		</el-col>
	</el-row>
</template>

<script>
export default {
	methods: {
		handleSelect(key, keyPath) {
			console.log(key, keyPath);
		}
	}
};
</script>

<style lang="stylus" scoped>
@font-face
	font-family bfabc
	src url(../../../public/bfabc.woff2)
#app
	height 20px
#logo
	float left
	line-height 61px
#logo > a
	font-size 20px
	font-family bfabc
	text-decoration none
	color white
	padding 0px 20px
</style>

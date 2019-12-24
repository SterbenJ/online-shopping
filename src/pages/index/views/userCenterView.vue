<template>
	<el-row>
		<el-col :span="22" :offset="1" :lg="{ span: 16, offset: 4 }">
			<el-row :gutter="20">
				<el-col class="aside-contain" :span="6" :lg="4">
					<el-menu ref="asideMenu" default-active="userShoppingCart" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
						
						<el-menu-item index="userShoppingCart">
							<i class="el-icon-shopping-cart-2"></i>
							<span slot="title">购物车</span>
						</el-menu-item>
						
						<el-submenu index="userOrder">
							<template slot="title">
								<i class="el-icon-s-order"></i>
								<span>我的订单</span>
							</template>
							<el-menu-item-group>
								<el-menu-item index="userOrderActive">进行中</el-menu-item>
								<el-menu-item index="userOrderFinish">已完成</el-menu-item>
							</el-menu-item-group>
						</el-submenu>
						
						<el-submenu index="userInfo">
							<template slot="title">
								<i class="el-icon-user-solid"></i>
								<span>个人信息</span>
							</template>
							<el-menu-item-group>
								<el-menu-item index="userCheckInfo">我的个人信息</el-menu-item>
								<el-menu-item index="userChangePwd">修改密码</el-menu-item>
								<el-menu-item index="userChangeInfo">修改个人信息</el-menu-item>
							</el-menu-item-group>
						</el-submenu>
						
					</el-menu>
				</el-col>
				<el-col class="main-contain" :span="18" :lg="20">
					<router-view name="main"></router-view>
				</el-col>
			</el-row>
		</el-col>
	</el-row>
</template>

<script>
export default {
	data() {
		return {};
	},
	methods: {},
	computed: {},
	mounted() {
		this.$refs['asideMenu'].open('userOrder')
		this.$refs['asideMenu'].open('userInfo')
	}
};
</script>

<style lang="stylus" scoped>
.aside-contain
	background-color #409EFF
.main-contain
	background-color #99A9BF
</style>

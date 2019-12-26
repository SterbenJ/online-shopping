<template>
	<el-row>
		<el-col :span="22" :offset="1" :lg="{ span: 16, offset: 4 }">
			<el-row :gutter="20">
				<el-col class="aside-contain" :span="6" :lg="4">
					<el-menu mode="vertical" :router="true" ref="asideMenu" default-active="userShoppingCart" class="el-menu-vertical-demo">
						
						<el-menu-item :route="{name: 'shoppingCart'}" index="userShoppingCart">
							<i class="el-icon-shopping-cart-2"></i>
							<span slot="title">购物车</span>
						</el-menu-item>
						
						<el-submenu index="userOrder">
							<template slot="title">
								<i class="el-icon-s-order"></i>
								<span>我的订单</span>
							</template>
							<el-menu-item-group>
								<el-menu-item 
									:route="{
										name: 'orderList', 
										params: {
											finished: false
										}
									}" 
									index="userOrderActive">进行中
								</el-menu-item>
								<el-menu-item :route="{
										name: 'orderList', 
										params: {
											finished: true
										}
									}"
									index="userOrderFinish">已完成
								</el-menu-item>
							</el-menu-item-group>
						</el-submenu>
						
						<el-menu-item :route="{
										name: 'userFollowList', 
										params: {
											finished: true
										}
									}"
									index="userFollow">
							<i class="el-icon-s-shop"></i>
							<span slot="title">关注店铺</span>
						</el-menu-item>
						
						<el-menu-item :route="{
										name: 'userCollectionList', 
										params: {
											finished: true
										}
									}"
									index="userCollection">
							<i class="el-icon-star-on"></i>
							<span slot="title">收藏商品</span>
						</el-menu-item>
						
						<el-submenu index="userInfo">
							<template slot="title">
								<i class="el-icon-user-solid"></i>
								<span>个人信息</span>
							</template>
							<el-menu-item-group>
								<el-menu-item :route="{
										name: 'userInfo', 
										params: {
											finished: true
										}
									}"
									index="userCheckInfo">
									我的个人信息
								</el-menu-item>
								<el-menu-item :route="{
										name: 'userChangePwd', 
										params: {
											finished: true
										}
									}"
									index="userChangePwd">
									修改密码
								</el-menu-item>
								<el-menu-item :route="{
										name: 'userChangeInfo', 
										params: {
											finished: true
										}
									}"
									index="userChangeInfo">
									修改个人信息
								</el-menu-item>
							</el-menu-item-group>
						</el-submenu>
						
					</el-menu>
				</el-col>
				<el-col class="main-contain" :span="18" :lg="20">
					<transition name="el-fade-in-linear" :appear="true">
						<router-view name="main"></router-view>
					</transition>
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
	}
};
</script>

<style lang="stylus" scoped>
// .aside-contain
// 	background-color #409EFF
// .main-contain
// 	background-color #99A9BF
</style>

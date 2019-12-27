<template>
	<el-row>
		<el-col style="height: 61px;">
			<el-menu style="border-bottom: 0px;" mode="horizontal" @select="handleSelect" background-color="#ffffff" text-color="#409EFF" active-text-color="#409EFF" :router="true">
				<!-- logo -->
				<el-menu-item index="index" :route="{ name: 'index'}" class="my-menu-item" id="logo"><router-link class="a-no-line" :to="{ name: 'index' }">Online Shopping</router-link></el-menu-item>
				<!-- 搜索 -->
				<el-col style="margin: 10px;" :span="10" :lg="7">
					<el-input v-model="searchInput"><el-button @click="toSearch" slot="append" icon="el-icon-search">搜索</el-button></el-input>
				</el-col>
				<!-- 登入/用户中心按钮 -->
				<el-popover :open-delay="cuserPopper.openDelay" :close-delay="cuserPopper.closeDelay" ref="user-popover" trigger="hover" placement="bottom">
					<simple-user-info></simple-user-info>
				</el-popover>
				<el-menu-item index="login" :route="{ name: 'userCenter', params: { user_id: userID } }" v-popover:user-popover class="nav-right-item my-menu-item">
					<template slot="title">
						<i class="el-icon-user" />
						<span slot="title">{{ userNickname ? userNickname : '登入' }}</span>
					</template>
				</el-menu-item>
				<!-- 购物车按钮 -->
				<el-menu-item :route="{ name: 'shoppingCart', params: { user_id: userID } }" class="nav-right-item my-menu-item" index="shopping-cart">
					<template slot="title">
						<i class="el-icon-shopping-cart-2"></i>
						<span slot="title">购物车</span>
						<el-badge v-if="userShoppingCartCount" :value="userShoppingCartCount" />
					</template>
				</el-menu-item>
			</el-menu>
		</el-col>
	</el-row>
</template>

<script>
import pageRoutes from '../../api/pageRoutes.js';
import simpleUserInfo from './simpleUserInfo.vue';
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex';

// 默认配置
const defaultConfig = {
	// 购物车弹窗
	shoppingPopper: {
		openDelay: 200, // 打开延迟
		closeDelay: 200 // 关闭延迟
	},
	// 用户信息弹窗
	userPopper: {
		openDelay: 200, // 打开延迟
		closeDelay: 200 // 关闭延迟
	}
};

export default {
	data() {
		return {
			// 搜索框内容
			searchInput: '',
		};
	},
	components: {
		simpleUserInfo
	},
	computed: {
		...mapState([]),
		...mapGetters({
			userNickname: 'userNickname',
			userShoppingCartCount: 'userShoppingCartCount',
			loginState: 'loginState',
			userID: 'userID'
		}),
		// 购物车弹窗配置
		cshoppingPopper: () => {
			return defaultConfig.shoppingPopper;
		},
		cuserPopper: () => {
			return defaultConfig.userPopper;
		}
	},
	methods: {
		// 分发点击 header item 的事件
		handleSelect(key, keyPath) {
			
		},
		// 搜索
		toSearch() {
			if (this.searchInput.length > 0) {
				this.$router.push({
					name: 'search',
					params: {
						searchStr: this.searchInput
					}
				})
			}
		}
	}
};
</script>

<style lang="stylus" scoped>
@font-face
	font-family bfabc
	src url('../../../public/bfabc.woff2')
.el-menu
	box-shadow 0px 1px 5px gray
#app
	height 20px
.nav-right-item
	float right
#logo
	float left
	line-height 61px
#logo > a
	font-size 20px
	font-family bfabc
	color #409EFF
	padding 0px 20px
.a-no-line
	text-decoration none
.my-menu-item
	border 0
	height 61px
</style>

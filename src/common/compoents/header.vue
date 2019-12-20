<template>
	<el-row>
		<el-col>
			<el-menu mode="horizontal" @select="handleSelect" background-color="#ffffff" text-color="#409EFF" active-text-color="#ffd04b" :router="false">
				<!-- logo -->
				<li class="my-menu-item" id="logo"><router-link class="a-no-line" :to="{name: 'index'}">Online Shopping</router-link></li>
				<!-- 搜索 -->
				<el-col :span="10" :lg="7">
					<el-menu-item class="my-menu-item" style="border-bottom-color: transparent; text-align: center;" index="2">
						<el-input v-model="searchInput">
							<el-button @click="toSearch" slot="append" icon="el-icon-search"></el-button>
						</el-input>
					</el-menu-item>
				</el-col>
				<!-- 登入/用户中心按钮 -->
				<el-menu-item class="nav-right-item my-menu-item" index="login">
					<template slot="title">
						<i class="el-icon-user"/>
						<span slot="title">{{ userNickname ? userNickname : '登入'}}</span>
					</template>
				</el-menu-item>
				<!-- 购物车按钮 -->
				<el-popover 
					:open-delay="cshoppingPopper.openDelay" 
					:close-delay="cshoppingPopper.closeDelay"
					ref="shopping-cart-popover" 
					trigger="hover" placement="bottom" 
					title="title" 
					content="content content contet"/>
				<el-menu-item v-popover:shopping-cart-popover class="nav-right-item my-menu-item" index="shopping-cart">
					<template slot="title">
						<i class="el-icon-shopping-cart-2"></i>
						<span slot="title">购物车</span>
						<el-badge v-if="shoppingCartCount != 0" :value="shoppingCartCount" />
					</template>
				</el-menu-item>
			</el-menu>
		</el-col>
	</el-row>
</template>

<script>
import pageRoutes from '../../api/pageRoutes.js';
import {
  mapState,
  mapGetters,
  mapActions,
  mapMutations
} from 'vuex'

// 默认配置
const defaultConfig = {
	// 购物车弹窗
	shoppingPopper: {
		openDelay: 200, // 打开延迟
		closeDelay: 200 // 关闭延迟
	}
}

export default {
	data() {
		return {
			// 主页路径
			indexPath: pageRoutes.index,
			searchInput: ''
		};
	},
	computed: {
		...mapMutations([
			
		]),
		...mapState([
			
		]),
		...mapActions([
			
		]),
		...mapGetters({
			userNickname: 'userNickname'
		}),
		// 购物车商品数量
		shoppingCartCount: () => {
			// Todo: 异步获取
			return 0;
		},
		// 购物车弹窗配置
		cshoppingPopper: () => {
			return defaultConfig.shoppingPopper
		},
		loginOrUser() {
			return this.userNickname ? '' : pageRoutes.login // Todo: 有问题
		}
	},
	methods: {
		handleSelect(key, keyPath) {
			if (key == 'login') {
				if (this.hasLogin) {
					this.toUserCenter();
				} else {
					this.toLogin();
				}
			}
		},
		// 跳转到登入页面
		toLogin() {
			window.open(this.loginOrUser, '_self');
		},
		// 跳转到用户中心
		toUserCenter() {
			this.$router.push({name: 'user'})
		},
		toSearch() {
			// Todo: 跳转到搜索界面
			// this.$store.commit('updateUser', {nickname: this.searchInput})
		}
	}
};
</script>

<style lang="stylus" scoped>
@font-face
	font-family bfabc
	src url('../../../public/bfabc.woff2')
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

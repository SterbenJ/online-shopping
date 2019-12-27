<template>
	<div>
		<div class="my-header" style="height: 60px;">
			<my-header id="my-header"/>
		</div>
		<div class="content">
			<transition name="el-fade-in-linear" :appear="true">
				<router-view name="content"/>
			</transition>
		</div>
		<div class="footer">
			<my-footer />
		</div>
		<to-top-button />
	</div>
</template>

<script>
import toTopButton from '../../common/compoents/toTopButton.vue';
import MyHeader from '../../common/compoents/header.vue';
import MyFooter from '../../common/compoents/footer.vue';

import userApi from '../../api/userApi.js';
import stateCode from '../../api/stateCode.js'

import { mapGetters, mapActions, mapMutations } from 'vuex';

export default {
	data() {
		return {};
	},
	components: {
		MyHeader,
		MyFooter,
		toTopButton
	},
	computed: {
		...mapGetters({
			loginState: 'loginState'
		})
	},
	methods: {
		// 请求用户信息
		requestUserInfo: function() {
			let vm = this;
			// 如果没登入
			vm.$axios({
				method: 'GET',
				url: userApi.hasLogin
			})
				.then(r => {
					if (r.data.code == 200 && r.data.data.hasLogin) {
						console.log("getUserInfo")
						vm.getUserInfo()
					}
				})
				.catch(r => {
					console.log('userInfo error 1');
					vm.$notify({
						title: '获取用户信息失败',
						type: 'error',
						offset: 80
					});
				});
		},
		// 获取用户信息
		getUserInfo: function() {
			let vm = this;
			vm.$axios({
				method: 'GET',
				url: userApi.userInfo
			})
				.then(r => {
					if (r.data.code == 200) {
						vm.updateUser(r.data.data);
					} else {
						vm.$notify({
							title: '获取用户信息失败',
							message: r.data.message ? r.data.message : '',
							type: 'error',
							offset: 80
						});
					}
				})
				.catch(r => {
					console.log('userInfo error 2');
					vm.$notify({
						title: '获取用户信息失败',
						type: 'error',
						offset: 80
					});
				})
		},
		...mapMutations({
			updateUser: 'updateUser'
		})
	},
	mounted() {
		this.requestUserInfo();
	}
};
</script>

<style lang="stylus" scoped>
$nav-height = 60px
#appfont-family
	Helvetica , sans-serif
#my-header
	z-index 1000
	width 100%
	position fixed
	top 0
.content
	margin-top $nav-height
.footer
	margin-top $nav-height * 3
</style>

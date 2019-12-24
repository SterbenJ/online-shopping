<template>
	<el-col :span="22" :offset="1">
		<div v-if="loginState">
			<div class="title">
				<h3>
					{{ userNickname }}
				</h3>
			</div>
			<div class="content">
				<div class="content-main">等级：{{ userLevel }}</div>
				<div class="content-main">积分：{{ userPoint }}</div>
			</div>
			<el-divider />
			<div class="action">
				<el-button @click="logout" type="danger" plain>登出</el-button>
			</div>
		</div>
		<div v-if="!loginState">
			<div class="action">
				<el-link type="primary" :underline="false" :href="loginPageUrl">请先登入</el-link>
			</div>
		</div>
	</el-col>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

import userApi from '../../api/userApi.js';
import pageRoutes from '../../api/pageRoutes.js'

export default {
	data() {
		return {
			loginPageUrl: pageRoutes.login + '?fromWhere=' + window.location.href
		}
	},
	computed: {
		...mapGetters({
			userNickname: 'userNickname',
			userLevel: 'userLevel',
			userPoint: 'userPoint',
			loginState: 'loginState'
		}),
	},
	methods: {
		...mapActions({
			updateUserAsync: 'updateUserAsync'
		}),
		// 登出
		logout() {
			let vm = this;
			vm.$axios({
				method: 'POST',
				url: userApi.logout
			})
			.then(r => {
				if (r.data.code == 200) {
					vm.updateUserAsync(undefined)
					vm.$notify({
						title: '登出成功',
						type: 'info',
						position: 'bottom-right'
					})
					window.open(pageRoutes.index, '_self')
				} else {
					vm.$notify({
						title: '登出失败',
						message: r.data.message ? r.data.message : '',
						type: 'error',
						position: 'bottom-right'
					})
				}
			})
			.catch(r => {
				vm.$notify({
					title: '登出失败',
					type: 'error',
					position: 'bottom-right'
				})
			})
		}
	}
};
</script>

<style lang="stylus" scoped>
.title
	text-align center
.content
	padding 10px
	text-align center
	.content-main
		padding 5px
		display inline-block
.action
	text-align center
	.el-button
		width 100%
</style>

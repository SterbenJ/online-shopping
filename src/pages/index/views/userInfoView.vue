<template>
	<el-row style="margin: 1.75rem;">
		<el-col>
			<el-card :body-style="{padding: '30px 60px'}">
				<p class="info-title">uid<span class="info-content">{{ userInfo.user_id }}</span></p>
				<p class="info-title">账号<span class="info-content">{{ userInfo.account }}</span></p>
				<p class="info-title">昵称<span class="info-content">{{ userInfo.nickname }}</span></p>
				<p class="info-title">手机号码<span class="info-content">{{ userInfo.phone_number }}</span></p>
				<p class="info-title">邮箱<span class="info-content">{{ userInfo.email }}</span></p>
				<p class="info-title">等级<span class="info-content">{{ userInfo.level }}</span></p>
				<p class="info-title">积分<span class="info-content">{{ userInfo.point }}</span></p>
			</el-card>
		</el-col>
	</el-row>
</template>

<script>
import userApi from '../../../api/userApi.js'
	
export default {
	props: {

	},
	data () {
		return {
			userInfo: {
				user_id: '',
				account: '',
				email: '',
				phone_number: '',
				nickname: '',
				level: -1,
				point: -1,
				banned: false
			}
		}
	},
	computed: {
		
	},
	methods: {
		// 获得个人信息
		getUserInfo() {
			let vm = this;
			vm.$axios({
				method: 'GET',
				url: userApi.userInfo
			})
				.then(r => {
					if (r.data.code == 200) {
						vm.userInfo = {...r.data.data}
						vm.success()
					} else {
						vm.fail(r.data.message)
					}
				})
				.catch(e => {
					vm.fail()
				})
		},
		// 成功
		success() {
			
		},
		// 失败
		fail(message) {
			this.$notify({
				title: '获取个人信息失败',
				message: message ? message : '',
				type: 'error',
				offset: 80
			})
		}
	},
	mounted() {
		this.getUserInfo()
	}
};
</script>

<style lang="stylus" scoped>
@font-face
	font-family bfabc
	src '../../../../public/bfabc.woff2'
.info-title
	font-family bfabc
	color darkgrey
.info-content
	margin-left 6.25rem
	color black
</style>

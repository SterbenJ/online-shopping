<template>
	<div>
		<el-card>
			<el-row :gutter="10" type="flex" justify="space-around">
				<el-col :span="18">
					<p class="title">登入</p>
					<el-row :gutter="10" type="flex" justify="space-around">
						<el-col :span="24">
							<el-input 
							v-model="request.data.account" 
							placeholder="6-32位"
							clearable>
								<template slot="prepend">账号</template>
							</el-input>
						</el-col>
					</el-row>
					<el-row :gutter="10" type="flex" justify="space-around">
						<el-col :span="24">
							<el-input 
							v-model="request.data.password" 
							placeholder="6-32位"
							clearable
							show-password>
								<template slot="prepend">密码</template>
							</el-input>
						</el-col>
					</el-row>
					<el-row :gutter="10" type="flex" justify="space-around">
						<el-col :span="12">
							<login-button :request="request" @LoginSuccess="LoginSuccess()" @LoginFail="LoginFail()" />
						</el-col>
						<el-col :span="12">
							<register-button />
						</el-col>
					</el-row>
				</el-col>
			</el-row>
		</el-card>
	</div>
</template>

<script>
import LoginButton from '../components/Button/LoginButton.vue';
import RegisterButton from '../components/Button/RegisterButton.vue';

export default {
	data () {
		return {
			request: {
				data: {
					account: '',
					password: ''
				}
			}
		}
	},
	components: {
		LoginButton,
		RegisterButton
	},
	methods: {
		LoginSuccess(r) {
			this.$notify({
				title: '登入成功',
				type: 'success'
			})
			// TODO: 登入成功
		},
		LoginFail(r) {
			this.$notify.error({
				title: '登入失败',
			})
			// TODO: 登入失败
		}
	}
};
</script>

<style lang="stylus" scoped>
	.title
		letter-spacing 16px
		font-size 32px
		margin 8px
	.el-row
		// margin 20px
	.el-col
		margin-bottom 16px
		margin-top 16px
		text-align center
</style>

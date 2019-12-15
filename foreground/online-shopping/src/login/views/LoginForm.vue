<template>
	<div>
		<div>
			<el-row :gutter="10" type="flex" justify="space-around">
				<el-col :span="20">
					<el-row>
						<el-form>
							<p class="title">登入</p>
							<el-col :span="24">
								<el-form-item label="账号"><el-input v-model="request.data.account" placeholder="6-32位" clearable /></el-form-item>
							</el-col>
							<el-col :span="24">
								<el-form-item label="密码"><el-input v-model="request.data.password" placeholder="6-32位" clearable show-password /></el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item><login-button :request="request" @LoginSuccess="LoginSuccess()" @LoginFail="LoginFail()" /></el-form-item>
							</el-col>
						</el-form>
					</el-row>
					<el-row>
						<el-col :span="12" type="flex" justify="space-around">
							<regsiter-link-text id="register-link-text" />
						</el-col>
						<el-col :span="12" type="flex" justify="space-around">
							<forget-password-link-text id="forget-password-link-text" />
						</el-col>
					</el-row>
				</el-col>
			</el-row>
		</div>
	</div>
</template>

<script>
import LoginButton from '../components/Button/LoginButton.vue';
import RegsiterLinkText from '../components/LinkText/RegsiterLinkText.vue';
import ForgetPasswordLinkText from '../components/LinkText/ForgetPasswordLinkText.vue'

export default {
	data() {
		return {
			request: {
				data: {
					account: '',
					password: ''
				}
			}
		};
	},
	components: {
		LoginButton,
		RegsiterLinkText,
		ForgetPasswordLinkText
	},
	methods: {
		LoginSuccess(r) {
			this.$notify({
				title: '登入成功',
				type: 'success'
			});
			// TODO: 登入成功
		},
		LoginFail(r) {
			this.$notify.error({
				title: '登入失败'
			});
			// TODO: 登入失败
		}
	}
};
</script>

<style lang="stylus" scoped>
	.title
		letter-spacing 16px
		font-size 48px
		text-align left
		font-family sans-serif
		font-weight 700
	#forget-password-link-text
		justify-content: space-between
</style>

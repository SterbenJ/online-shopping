<template>
	<div>
		<div>
			<el-row :gutter="10" type="flex" justify="space-around">
				<el-col :span="20">
					<el-row>
						<el-form :model="request.data" :rules="rules" status-icon :ref="request.formName">
							<p class="title">登入</p>
							<el-col>
								<el-form-item label="账号" prop="account">
									<el-input v-model="request.data.account" :minlength="accountMinlength" :maxlength="accountMaxlength" :placeholder="accountHolder" clearable />
								</el-form-item>
							</el-col>
							<el-col>
								<el-form-item label="密码" prop="password">
									<el-input v-model="request.data.password" :placeholder="passwordHolder" clearable show-password />
								</el-form-item>
							</el-col>
							<el-col>
								<el-button @click="submitForm()"></el-button>
								<el-form-item><login-button id="login-button" :request="request" :validateFun="submitForm" @LoginSuccess="LoginSuccess()" @LoginFail="LoginFail()" /></el-form-item>
							</el-col>
						</el-form>
					</el-row>
					<el-row>
						<el-col :span="12"><regsiter-link-text id="register-link-text" /></el-col>
						<el-col :span="12"><forget-password-link-text id="forget-password-link-text" /></el-col>
					</el-row>
				</el-col>
			</el-row>
		</div>
	</div>
</template>

<script>
import LoginButton from '../components/Button/LoginButton.vue';
import RegsiterLinkText from '../components/LinkText/RegsiterLinkText.vue';
import ForgetPasswordLinkText from '../components/LinkText/ForgetPasswordLinkText.vue';
import config from '../config.js';

export default {
	data() {
		/**
		 * 校验方法
		 */
		// 校验账号
		let CheckAccount = (rule, value, callback) => {
			if (!value) {
				return callback(new Error('账号不能为空'));
			}
			setTimeout(() => {
				if (value.length < config.accountMinlength) {
					callback(new Error('必须大于 6 位'));
				} else {
					callback();
				}
			}, 100);
		};
		// 校验密码
		let CheckPassword = (rule, value, callback) => {
			if (!value) {
				return callback(new Error('密码不能为空'));
			}
			setTimeout(() => {
				if (value.length < config.passwordMinlength) {
					callback(new Error('必须大于 6 位'));
				} else {
					callback();
				}
			}, 100);
		};
		return {
			request: {
				data: {
					account: '',
					password: ''
				},
				formName: 'login-form'
			},
			accountMinlength: config.accountMinlength,
			passwordMinlength: config.passwordMinlength,
			accountMaxlength: config.accountMaxlength,
			passwordMaxlength: config.passwordMaxlength,
			rules: {
				account: [{ validator: CheckAccount, trigger: 'blur' }],
				password: [{ validator: CheckPassword, trigger: 'blur' }]
			}
		};
	},
	computed: {
		// 根据
		accountHolder() {
			let vm = this;
			return `${vm.accountMinlength}-${vm.accountMaxlength}位`;
		},
		passwordHolder() {
			let vm = this;
			return `${vm.passwordMinlength}-${vm.passwordMaxlength}位`;
		}
	},
	components: {
		LoginButton,
		RegsiterLinkText,
		ForgetPasswordLinkText
	},
	methods: {
		// 成功登入调用
		LoginSuccess(r) {
			this.$notify({
				title: '登入成功',
				type: 'success'
			});
			// TODO: 登入成功
		},
		// 失败登入调用
		LoginFail(r) {
			this.$notify({
				title: '登入失败',
				type: 'error'
			});
			// TODO: 登入失败
		},
		// 校验表单
		submitForm(vm, formName) {
			vm.$refs[formName].validate(valid => {
				if (valid) {
					return true
				} else {
					return false
				}
			})
		}
	}
};
</script>

<style lang="stylus" scoped>
.title
	letter-spacing 16px
	font-size 36px
	text-align left
	font-family sans-serif
	font-weight 700
#login-button
	padding 20px 0px 20px 0px
#register-link-text
	float left
#forget-password-link-text
	float right
</style>

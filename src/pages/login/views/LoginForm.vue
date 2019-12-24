<template>
	<div>
		<div>
			<el-row :gutter="10" type="flex" justify="space-around">
				<el-col :span="20">
					<el-row>
						<el-form :model="request.data" :rules="rules" status-icon :ref="formName">
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
								<el-form-item>
									<login-button
										id="login-button"
										:request="request"
										:validateFun="submitForm"
										:formName="formName"
										:parent="this"
										@LoginSuccess="LoginSuccess()"
										@LoginFail="LoginFail()"
									/>
								</el-form-item>
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
import LoginButton from '../components/button/LoginButton.vue';
import RegsiterLinkText from '../components/linkText/RegsiterLinkText.vue';
import ForgetPasswordLinkText from '../components/linkText/ForgetPasswordLinkText.vue';


import config from '../config.js';
import pageRoutes from '../../../api/pageRoutes.js';

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
			if (value.length < config.accountMinlength) {
				callback(new Error('必须大于 6 位'));
			} else {
				callback();
			}
		};
		// 校验密码
		let CheckPassword = (rule, value, callback) => {
			if (!value) {
				return callback(new Error('密码不能为空'));
			}
			if (value.length < config.passwordMinlength) {
				callback(new Error('必须大于 6 位'));
			} else {
				callback();
			}
		};
		return {
			request: {
				data: {
					account: '',
					password: ''
				}
			},
			formName: 'login-form',
			rules: {
				// account: [{ validator: CheckAccount, trigger: 'blur' }],
				// password: [{ validator: CheckPassword, trigger: 'blur' }]
				account: [
					{ required: true, message: '请输入账号', trigger: 'blur' },
					{
						min: config.accountMinlength,
						max: config.accountMaxlength,
						message: `长度在 ${config.accountMinlength} 到 ${config.accountMaxlength} 个字符`,
						trigger: 'blur'
					}
				],
				password: [
					{ required: true, message: '请输入密码', trigger: 'blur' },
					{
						min: config.passwordMinlength,
						max: config.passwordMaxlength,
						message: `长度在 ${config.passwordMinlength} 到 ${config.passwordMaxlength} 个字符`,
						trigger: 'blur'
					}
				]
			}
		};
	},
	computed: {
		accountMinlength() {
			return config.accountMinlength;
		},
		passwordMinlength() {
			return config.passwordMinlength;
		},
		accountMaxlength() {
			return config.accountMaxlength;
		},
		passwordMaxlength() {
			return config.passwordMaxlength;
		},
		// 根据长短来显示tip
		accountHolder() {
			return `${config.accountMinlength}-${config.accountMaxlength}位`;
		},
		passwordHolder() {
			return `${config.passwordMinlength}-${config.passwordMaxlength}位`;
		},
		// 从哪跳转来，默认首页
		fromWhere() {
			return this.$route.query ? this.$route.query.fromWhere : pageRoutes.index
		}
		//
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
			console.log(this.fromWhere)
			window.open(this.fromWhere, '_self')
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
			let result = false;
			vm.$refs[formName].validate(valid => {
				if (valid) {
					console.log('form true');
					result = true;
				} else {
					console.log('form false');
					result = false;
				}
			});
			return result;
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

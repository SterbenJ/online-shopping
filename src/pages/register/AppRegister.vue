<template>
	<div id="register">
		<el-row class="main-contain">
			<el-col :span="12" :offset="6">
				<el-form :model="form" :rules="rules" ref="form" label-width="auto">
					<el-form-item prop="account" label="账号(用于登入)">
						<el-input v-model="form.account"></el-input>
					</el-form-item>
					<el-form-item show-password prop="password" label="密码">
						<el-input v-model="form.password" ></el-input>
					</el-form-item>
					<el-form-item prop="nickname" label="昵称">
						<el-input v-model="form.nickname" ></el-input>
					</el-form-item>
					<el-form-item maxlength="11" prop="phone_number" label="手机号码">
						<el-input v-model="form.phone_number" ></el-input>
					</el-form-item>
					<el-form-item prop="email" label="邮箱">
						<el-input v-model="form.email"></el-input>
					</el-form-item>
				</el-form>
				<el-row style="padding-top: 1.875rem;">
					<el-col :span="16" :offset="5">
						<el-button @click="register" style="width: 100%;" type="primary">注册</el-button>
					</el-col>
				</el-row>
			</el-col>
		</el-row>
	</div>
</template>

<script>
import userApi from '../../api/userApi.js'
import pageRoutes from '../../api/pageRoutes.js'

export default {
	data() {
		// 检测邮箱
		var checkEmail = (rule, value, callback) => {
			if (!value) {
				callback()
			} else if (/^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/.test(value) == false) {
				callback(new Error('请输入正确的邮箱'))
			} else {
				callback()
			}
		}
		// 校验手机号的规则
		var checkPhoneNumber = (rule, value, callback) => {
			if (!value) {
				callback()
			} else if (/^1[3456789]\d{9}$/.test(value) == false) {
				callback(new Error('请输入正确的手机号码'))
			} else {
				callback()
			}
		}
		return {
			form: {
				account: '',
				password: '',
				nickname: '',
				email: null,
				phone_number: null
			},
			rules: {
				// account: [{ validator: CheckAccount, trigger: 'blur' }],
				// password: [{ validator: CheckPassword, trigger: 'blur' }]
				account: [
					{ required: true, message: '请输入账号', trigger: 'change' },
					{
						min: 6,
						max: 32,
						message: '长度在 6 到 32 个字符',
						trigger: 'change'
					}
				],
				password: [
					{ required: true, message: '请输入密码', trigger: 'change' },
					{
						min: 6,
						max: 32,
						message: '长度在 6 到 32 个字符',
						trigger: 'change'
					}
				],
				nickname: [
					{ required: true, message: '请输入昵称', trigger: 'change' },
					{
						min: 6,
						max: 32,
						message: '长度在 6 到 32 个字符',
						trigger: 'change'
					}
				],
				email: [
					{ required: true, message: '请输入邮箱', trigger: 'change' },
					{ validator: checkEmail, trigger: 'change' }
				],
				phone_number: [
					{ required: true, message: '请输入手机号码', trigger: 'change' },
					{ validator: checkPhoneNumber, trigger: 'change' }
				]
			}
		}
	},
	methods: {
		// 注册
		register() {
			let vm = this;
			if (!vm.submitForm(vm, 'form')) {
				return
			}
			if (!vm.phone_number) {
				vm.phone_number = null
			}
			console.log(vm.phone_number)
			if (!vm.email) {
				vm.email = null
			}
			console.log(vm.email);
			vm.$axios({
				method: 'POST',
				url: userApi.register,
				data: vm.form
			})
				.then(r => {
					if (r.data.code == 200) {
						vm.success()
					} else {
						vm.fail(r.data.message)
					}
				})
				.catch(e => {
					vm.fail()
				})
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
		},
		//注册成功
		success() {
			this.$notify({
				title: '注册成功',
				type: 'success'
			})
			setTimeout(() => {
				window.open(pageRoutes.login, '_self')
			}, 200)
		},
		// 注册失败
		fail(message) {
			this.$notify({
				title: '注册失败',
				message: message ? message : '',
				type: 'error'
			})
		}
	}
}
</script>

<style lang="stylus" scoped>
.main-contain
	margin-top 10.25rem
.el-form-item
	padding-top 1.25rem
</style>

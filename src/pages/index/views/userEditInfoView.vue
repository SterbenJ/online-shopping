<template>
	<el-row class="main-contain">
		<el-col :span="12" :offset="6">
			<el-form :model="form" :rules="rules" ref="form" label-width="auto">
				<el-form-item prop="nickname" label="昵称"><el-input v-model="form.nickname"></el-input></el-form-item>
				<el-form-item prop="phone_number" label="手机号码"><el-input v-model="form.phone_number"></el-input></el-form-item>
				<el-form-item prop="email" label="邮箱"><el-input v-model="form.email"></el-input></el-form-item>
			</el-form>
			<el-row style="padding-top: 1.875rem;">
				<el-col :span="16" :offset="5"><el-button @click="updateUser" style="width: 100%;" type="primary">修改信息</el-button></el-col>
			</el-row>
		</el-col>
	</el-row>
</template>

<script>
import userApi from '../../../api/userApi.js'
	
export default {
	// 检测邮箱
	data() {
		var checkEmail = (rule, value, callback) => {
			if (!value) {
				callback();
			} else if (/^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/.test(value) == false) {
				callback(new Error('请输入正确的邮箱'));
			} else {
				callback();
			}
		};
		// 校验手机号的规则
		var checkPhoneNumber = (rule, value, callback) => {
			if (!value) {
				callback();
			} else if (/^1[3456789]\d{9}$/.test(value) == false) {
				callback(new Error('请输入正确的手机号码'));
			} else {
				callback();
			}
		};
		return {
			form: {
				nickname: '',
				email: null,
				phone_number: null
			},
			rules: {
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
		};
	},
	computed: {},
	methods: {
		// 修改信息
		updateUser() {
			let vm = this;
			if (!vm.submitForm(vm, 'form')) {
				vm.fail()
				return
			}
			vm.$axios({
				method: 'POST',
				url: userApi.userEditInfo,
				data: vm.form
			})
				.then(r => {
					if (r.data.code == 200) {
						vm.updateSuccess()
					} else {
						vm.updateFail(r.data.message)
					}
				})
				.catch(e => {
					vm.updateFail()
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
		// 修改成功
		updateSuccess() {
			this.$notify({
				title: '修改成功',
				type: 'success'
			})
			setTimeout(() => {
				window.open(window.location.href, '_self')
			}, 200)
		},
		// 修改失败
		updateFail(message) {
			this.$notify({
				title: '修改失败',
				message: message ? message : '',
				type: 'error',
			})
		},
		// 获得个人信息
		getUserInfo() {
			let vm = this;
			vm.$axios({
				method: 'GET',
				url: userApi.userInfo
			})
				.then(r => {
					if (r.data.code == 200) {
						vm.form = {...r.data.data}
						vm.success()
					} else {
						vm.fail(r.data.message)
					}
				})
				.catch(e => {
					vm.fail()
				})
		},
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
	},
	mounted() {
		this.getUserInfo()
	}
};
</script>

<style lang="stylus" scoped>
.main-contain
	margin-top 4.25rem
.el-form-item
	padding-top 1.25rem
</style>

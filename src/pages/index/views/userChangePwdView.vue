<template>
	<el-row class="main-contain">
		<el-col :span="12" :offset="6">
			<el-form :model="form" :rules="rules" ref="form" label-width="auto">
				<el-form-item prop="oldPassword" label="旧密码">
					<el-input type="text" show-word-limit clearable show-password minlength="6" maxlength="32" v-model="form.oldPassword" />
				</el-form-item>
				<el-form-item prop="newPassword" label="新密码">
					<el-input type="text" show-word-limit clearable show-password minlength="6" maxlength="32" v-model="form.newPassword" />
				</el-form-item>
			</el-form>
			<el-row style="padding-top: 1.875rem;">
				<el-col :span="16" :offset="5"><el-button @click="changePassword" style="width: 100%;" type="primary">修改密码</el-button></el-col>
			</el-row>
		</el-col>
	</el-row>
</template>

<script>
import userApi from '../../../api/userApi.js'	
import pageRoutes from '../../../api/pageRoutes.js'

export default {
	props: {

	},
	data () {
		return {
			form: {
				oldPassword: '',
				newPassword: ''
			},
			rules: {
				oldPassword: [
					{ required: true, message: '请输入密码', trigger: 'change' },
					{
						min: 6,
						max: 32,
						message: '长度在 6 到 32 个字符',
						trigger: 'change'
					}
				],
				newPassword: [
					{ required: true, message: '请输入密码', trigger: 'change' },
					{
						min: 6,
						max: 32,
						message: '长度在 6 到 32 个字符',
						trigger: 'change'
					}
				],
			}
		}
	},
	computed: {
		
	},
	methods: {
		// 修改密码
		changePassword() {
			// 修改密码
			let vm = this;
			if (!vm.submitForm(vm, 'form')) {
				return
			}
			vm.$axios({
				method: 'POST',
				url: userApi.changePassword,
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
		// 修改成功
		success() {
			this.$notify({
				title: '修改密码成功',
				type: 'success',
				offset: 80
			})
			setTimeout(() => {
				window.open(pageRoutes.index, '_self')
			}, 200)
		},
		// 修改失败
		fail(message) {
			this.$notify({
				title: '修改密码失败',
				message: message ? message : '',
				type: 'error',
				offset: 80
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
	},
};
</script>

<style lang="stylus" scoped>
.main-contain
	margin-top 2.25rem
.el-form-item
	padding-top 1.25rem
</style>

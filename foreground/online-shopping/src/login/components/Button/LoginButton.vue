<template>
	<div><el-button type="primary" @click="httpRequest">登入</el-button></div>
</template>

<script>
let defaultData = {
	url: '/login',
	method: 'POST',
	data: {
		account: '',
		password: ''
	},
	formName: ''
};

export default {
	props: {
		// 请求参数
		request: {
			type: Object,
			required: false,
			default: () => {
				return defaultData
			}
		},
		validateFun: {
			type: Function,
			required: false,
			default: () => {
				return
			}
		}
	},
	computed: {
		// 合并默认值和传入了的值
		cRequest() {
			return Object.assign(defaultData, this.request)
		}
	},
	methods: {
		// http 请求
		httpRequest() {
			let vm = this;
			if (vm.validateFun(vm.$parent, vm.cRequest.formNme)) {
				vm.LoginFail()
				return
			}
			return vm
				.$axios({
					method: vm.cRequest.method,
					url: vm.cRequest.url,
					data: vm.cRequest.data
				})
				.then(r => {
					vm.LoginSuccess(r)
				})
				.catch(r => {
					vm.LoginFail(r)
				});
		},
		// 登入成功
		LoginSuccess(r) {
			let vm = this;
			vm.$emit('LoginSuccess', r)
		},
		// 登入失败
		LoginFail(r) {
			let vm = this;
			vm.$emit('LoginFail', r)
		}
	}
};
</script>

<style lang="stylus" scoped>
</style>

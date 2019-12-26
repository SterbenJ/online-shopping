<template>
	<div><el-button type="primary" @click="httpRequest">登入</el-button></div>
</template>

<script>
import Api from '../../../../api/userApi.js'

let defaultRequestData = {
	url: Api.login,
	method: 'POST',
	data: {
		account: '',
		password: ''
	}
};

export default {
	props: {
		// 请求参数
		request: {
			type: Object,
			required: false,
			default: () => {
				return defaultRequestData;
			}
		},
		formName: {
			type: String,
			required: true,
			default: () => {
				return '';
			}
		},
		validateFun: {
			type: Function,
			required: false,
			default: () => {
				return;
			}
		},
		parent: {
			type: Object,
			required: true,
			default: () => {
				return null;
			}
		}
	},
	computed: {
		// 合并默认值和传入了的值
		cRequest() {
			return Object.assign(defaultRequestData, this.request);
		}
	},
	methods: {
		// http 请求
		httpRequest() {
			let vm = this;
			if (vm.validateFun) {
				if (!vm.validateFun(vm.parent, vm.formName)) {
					vm.LoginFail();
					return;
				}
			}
			return vm
				.$axios({
					method: vm.cRequest.method,
					url: vm.cRequest.url,
					data: vm.cRequest.data
				})
				.then(r => {
					vm.LoginSuccess(r);
				})
				.catch(r => {
					vm.LoginFail(r);
				});
		},
		// 登入成功
		LoginSuccess(r) {
			let vm = this;
			vm.$emit('LoginSuccess', r);
		},
		// 登入失败
		LoginFail(r) {
			let vm = this;
			vm.$emit('LoginFail', r);
		}
	}
};
</script>

<style lang="stylus" scoped>

</style>

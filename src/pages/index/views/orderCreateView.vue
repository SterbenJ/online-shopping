<template>
	<el-row>
		<el-col :lg="{ span: 16, offset: 4}" :span="22" :offset="1">
			<el-card :body-style="{ margin: '1.875rem' }" shadow="never">

				<el-row class="form-info">
					<el-col :lg="{ span: 18, offset: 3}" :span="22" :offset="1">
						<el-form label-width="auto" label-position="left" ref="form" :model="formData" :rules="rules">
							<el-form-item label="收货人" prop="acceptUserName">
								<el-input show-word-limit maxlength="12" placeholder="1 - 12 位" v-model="formData.acceptUserName" suffix-icon="el-icon-user-solid" clearable></el-input>
							</el-form-item>
							<el-form-item label="收获地址" prop="acceptUserAddress">
								<el-input show-word-limit maxlength="64" placeholder="1 - 64 个字符" v-model="formData.acceptUserAddress" suffix-icon="el-icon-location" clearable></el-input>
							</el-form-item>
							<el-form-item label="手机号码" prop="acceptUserPhoneNumber">
								<el-input show-word-limit maxlength="11" v-model="formData.acceptUserPhoneNumber" suffix-icon="el-icon-phone" clearable></el-input>
							</el-form-item>
							<el-form-item label="订单备注" prop="mark">
								<el-input show-word-limit maxlength="64" placeholder="1 - 64 个字符" v-model="formData.mark" suffix-icon="el-icon-s-comment" clearable></el-input>
							</el-form-item>
						</el-form>
					</el-col>
				</el-row>

				<el-divider></el-divider>

				<el-row class="form-items">
					<el-col :span="22" :offset="1">
						<el-row>
							<el-col v-for="(obj, index) in item_list" :key="obj.itemInfo.item_id" :span="6">
								<order-item-info :noAction="true" :item="obj.itemInfo" :count="obj.count"></order-item-info>
							</el-col>
						</el-row>
					</el-col>
				</el-row>

				<el-divider></el-divider>

				<transition name="el-fade-in-linear" :appear="true">
					<el-row class="form-action" type="flex" justify="end" align="middle">
						<span>总价：<span class="price">￥{{totlaPrice}}</span></span>
						<el-button @click="createOrder" :loading="loading" class="btn-pay" type="success" round>提交订单</el-button>
					</el-row>
				</transition>

			</el-card>
		</el-col>
	</el-row>
</template>

<script>
import baseOrderView from './baseOrderView.vue'
import orderItemInfo from '../compoents/orderItemInfo.vue'

import orderApi from '../../../api/orderApi.js'

export default {
	extends: baseOrderView,
	props: {

	},
	components: {
		'orderItemInfo': orderItemInfo
	},
	data () {
		// 校验手机号的规则
		var checkPhoneNumber = (rule, value, callback) => {
			if (/^1[3456789]\d{9}$/.test(value) == false) {
				callback(new Error('请输入正确的手机号码'))
			} else {
				callback()
			}
		}
		return {
			loading: false,
			formData: {
				acceptUserName: '',
				acceptUserAddress: '',
				acceptUserPhoneNumber: '',
				mark: '',
				items: this.makeOrderItemList
			},
			rules: {
				acceptUserName: [
					{ required: true, message: '请输入收货人', trigger: 'blur' },
					{ min: 1, max: 12, message: '长度在 1 到 12 个字符', trigger: 'blur'}
				],
				acceptUserAddress: [
					{ required: true, message: '请输入地址', trigger: 'blur' },
					{ min: 1, max: 64, message: '长度在 1 到 64 个字符', trigger: 'blur'}
				],
				acceptUserPhoneNumber: [
					{ required: true, message: '手机号码不能为空', trigger: 'blur' },
					{ validator: checkPhoneNumber, trigger: 'blur' }
				],
				mark: [
					{ min: 1, max: 64, message: '长度在 1 到 64 个字符', trigger: 'blur'}
				],
			}
		}
	},
	computed: {
		// 计算出简略的物品信息
		makeOrderItemList() {
			var arr = this.item_list.filter((value) => true)
			arr.forEach((value, index, arr) => {
				arr[index] = {
					count: value.count,
					item_id: value.item.item_id
				}
			})
			return arr
		},
		// 总价格
		totlaPrice() {
			return this.item_list.reduce((result, value, index, arr) => {
				return result + value.item.price * value.count
			}, 0).toFixed(2)
		}
	},
	methods: {
		// 提交订单
		createOrder() {
			// Todo: 提交订单
			let vm = this;
			if (!vm.submitForm(vm, 'form')) {
				vm.fail();
				return
			}
			vm.loading = true;
			vm.$axios({
				method: 'POST',
				url: orderApi.create
			})
				.then(r => {
					vm.loading = false;
					if (r.data.code == 200) {
						vm.success(r.data.data.order_id);
					} else {
						vm.fail(r.data.message);
					}
				})
				.catch(e => {
					vm.loading = false;
					vm.fail();
				});
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
		// 创建成功
		success(id) {
			this.$notify({
				title: '创建成功',
				type: 'success'
			})
			this.$router.replace({
				name: 'orderInfo', 
				params: {
					order_id: id
				},
			})
		},
		// 创建失败
		fail(message) {
			this.$notify({
				title: '创建失败',
				message: message ? message : '',
				type: 'error'
			})
		}
	},
	mounted() {

	}
};
</script>

<style lang="stylus" scoped>
.test
	width 100px
.el-form-item
	padding-top 1.25rem
.form-info
	margin-bottom 2.875rem
.form-items
	margin 3.875rem 0
.form-action
	padding-top 1.25rem
.btn-pay
	float right
	margin 1.625rem 1.25rem
	box-shadow 0px 5px 5px gray
.price
	color orangered
	font-size 1.25rem
</style>

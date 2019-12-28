<template>
	<el-row v-loading="loading">
		<el-col :lg="{ span: 16, offset: 4 }" :span="22" :offset="1">
			<el-row>
				<el-col :span="22" :offset="1">
					<p class="info-title">
						状态：
						<span class="info-content order-state">{{ orderState }}</span>
					</p>
					<p class="info-title">
						收件人：
						<span class="info-content order-accept-name">{{ data.accept_user_name }}</span>
					</p>
					<p class="info-title">
						手机号码：
						<span class="info-content order-phone-number">{{ data.accept_user_phone_number }}</span>
					</p>
					<p class="info-title">
						收获地址：
						<span class="info-content order-address">{{ data.accept_user_address }}</span>
					</p>
					<p class="info-title">
						备注：
						<p class="info-content order-mark">{{ data.mark }}</p>
					</p>
					<el-timeline class="my-timeline">
						<el-timeline-item v-for="(obj, index) in timelineData" :key="index" :type="obj.active ? 'primary' : ''" :timestamp="obj.time">
							{{ obj.display }}
						</el-timeline-item>
					</el-timeline>
				</el-col>
			</el-row>

			<el-divider></el-divider>

			<el-row class="form-items">
				<el-col :span="22" :offset="1">
					<el-row>
						<el-col v-for="(obj, index) in data.items" :key="obj.item.item_id" :span="6">
							<order-item-info :item="obj.item" :count="obj.count"></order-item-info>
						</el-col>
					</el-row>
				</el-col>
			</el-row>

			<el-divider></el-divider>

			<transition name="el-fade-in-linear" :appear="true">
				<el-row class="form-action" type="flex" justify="end" align="middle">
					<span v-if="!data.payment_time">
						总价：
						<span class="price">￥{{ data.price }}</span>
					</span>
					<el-button @click="pay" v-if="!data.payment_time" :loading="btnPayloading" class="btn-pay" type="primary" round>支付</el-button>
					<el-button @click="cancel" :loading="btnCancelLoading" class="btn-pay" type="warning" round>取消订单</el-button>
				</el-row>
			</transition>
		</el-col>
	</el-row>
</template>

<script>
import orderItemInfo from '../compoents/orderItemInfo.vue';

import orderApi from '../../../api/orderApi.js';
import pageRoutes from '../../../api/pageRoutes.js';

export default {
	props: {
		order_id: {
			type: String,
			required: true
		}
	},
	components: {
		orderItemInfo
	},
	data() {
		return {
			data: {
				user_id: '',
				price: -1,
				create_time: '',
				payment_time: '',
				delivery_time: '',
				receipt_time: '',
				accept_user_name: '',
				accept_user_address: '',
				accept_user_phone_number: '',
				mark: '',
				close: false,
				items: []
			},
			btnPayLoading: false,
			btnCancelLoading: false,
			loading: true
		};
	},
	computed: {
		// 处理时间线数据
		timelineData() {
			let vm = this;
			var keyArr = ['create_time', 'payment_time', 'delivery_time', 'receipt_time'];
			var valueArr = ['创建时间', '付款时间', '发货时间', '收货时间'];
			keyArr.reduce((result, value, index, arr) => {
				arr[index] = {
					time: vm.data[value] ? new Date(vm.data[value]).toLocaleString() : '',
					active: vm.data[value] ? true : false,
					display: valueArr[index]
				};
			}, 0);
			return keyArr;
		},
		// 根据数据决定状态
		orderState() {
			let vm = this;
			return vm.close ? (vm.data.receipt_time ? '已完成' : '已取消') : '进行中'
		}
	},
	methods: {
		// 请求服务端数据
		getOrderInfo() {
			let vm = this;
			vm.$axios({
				method: 'GET',
				url: orderApi.info,
				params: {
					order_id: vm.order_id
				}
			})
				.then(r => {
					if (r.data.code == 200) {
						vm.getInfoSuccess();
						vm.loading = false;
						console.log(r.data.data);
						vm.data = { ...r.data.data };
					} else {
						vm.loading = false;
						vm.getInfoFail(r.data.message);
					}
				})
				.catch(e => {
					vm.getInfoFail();
				});
		},
		// 请求信息成功
		getInfoSuccess() {},
		// 请求信息失败
		getInfoFail(message) {
			this.$notify({
				title: '请求信息失败',
				message: message ? message : '',
				type: 'error',
				offset: 80
			});
			setTimeout(() => {
				// Todo: 跳转回订单列表
			}, 200)
		},
		// 支付
		pay() {
			let vm = this;
			vm.btnPayLoading = true;
			vm.$axios({
				method: 'POST',
				url: orderApi.pay,
				data: {
					order_id: vm.order_id
				}
			})
				.then(r => {
					vm.btnPayLoading = false;
					if (r.data.code == 200) {
						vm.paySuccess();
					} else {
						vm.payFail(r.data.message);
					}
				})
				.catch(e => {
					vm.btnPayLoading = false;
					vm.payFail();
				});
		},
		// 支付成功
		paySuccess() {
			this.$notify({
				title: '支付成功',
				type: 'success',
				offset: 80
			});
			setTimeout(() => {
				window.open(window.location.href, '_self');
			}, 200)
		},
		// 支付失败
		payFail(message) {
			this.$notify({
				title: '支付失败',
				message: message ? message : '',
				type: 'error',
				offset: 80
			});
		},
		// 取消订单
		cancel() {
			let vm = this;
			vm.btnCancelLoading = true;
			vm.$axios({
				method: 'POST',
				url: orderApi.cancel,
				data: {
					order_id: vm.order_id
				}
			})
				.then(r => {
					vm.btnCancelLoading = false;
					if (r.data.code == 200) {
						vm.cancelSuccess();
					} else {
						vm.cancelFail(r.data.message);
					}
				})
				.catch(e => {
					vm.btnCancelLoading = false;
					vm.cancelFail();
				});
		},
		// 取消订单成功
		cancelSuccess() {
			this.$notify({
				title: '取消订单成功',
				type: 'success',
				offset: 80
			});
			setTimeout(() => {
				window.open(pageRoutes.index, '_self');
			}, 200)
		},
		// 取消订单失败
		cancelFail(message) {
			this.$notify({
				title: '取消订单失败',
				message: message ? message : '',
				type: 'error',
				offset: 80
			});
			setTimeout(() => {
				window.open(window.location.href, '_self');
			}, 200)
		},
	},
	mounted() {
		this.getOrderInfo();
	}
};
</script>

<style lang="stylus" scoped>
@font-face
	font-family bfabc
	src '../../../../public/bfabc.woff2'
.form-action
	padding-top 1.25rem
.btn-pay
	float right
	margin 1.625rem 1.25rem
	box-shadow 0px 5px 5px gray
.price
	color orangered
	font-size 1.25rem
.my-timeline
	padding-top 1.25rem
.info-title
	font-size 1rem
	color darkgray
	.info-content
		color dimgray
		font-size 1.5rem
	.order-state
		font-weight 700
		color palevioletred
	.order-accept-name
		color #409EFF
	.order-phone-number
		font-family bfabc
	
</style>

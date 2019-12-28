<template>
	<div v-loading="loading">
		<transition-group name="el-fade-in-linear" :appear="true">
			<div v-for="(obj, index) in order_list" :key="obj.order_id">
				<order-item :order="obj"/>
			</div>
		</transition-group>
		<el-row type="flex" justify="center">
			<el-link @click="getOrderList">加载更多数据</el-link>
		</el-row>
	</div>
</template>

<script>
import orderApi from '../../../api/orderApi.js'

import orderItem from '../compoents/orderItem.vue'
	
export default {
	props: {
		finished: {
			type: String,
			required: true
		}
	},
	data () {
		return {
			order_list: [],
			loading: true,
			page: 1
		}
	},
	components: {
		orderItem
	},
	computed: {
		// 根据 finished 返回 true false
		hasFinish() {
			return this.finished == '1' ? true : false
		}
	},
	methods: {
		// 请求订单列表
		getOrderList() {
			let vm = this;
			vm.$axios({
				method: 'GET',
				url: orderApi.list,
				params: {
					page: vm.page,
					closed: vm.hasFinish
				}
			})
				.then(r => {
					vm.loading = false
					if (r.data.code == 200) {
						vm.order_list.push(...r.data.data)
						if (r.data.data.length > 0) {
							vm.page++
						}
						vm.getOrderListSuccess()
					} else {
						vm.getOrderListFail(r.data.message)
					}
				})
				.catch(e => {
					vm.loading = false
					vm.getOrderListFail()
				})
		},
		// 获取订单列表成功
		getOrderListSuccess() {
			
		},
		// 获取订单列表失败
		getOrderListFail(message) {
			this.$notify({
				title: '获取订单列表失败',
				message: message ? message : '',
				type: 'error'
			})
		}
	},
	mounted() {
		console.log(this.finished);
		if (this.loading){
			this.getOrderList()
		}	
	},
	watch: {
		// 因为只变换了参数，所以组件不会刷新，要监听路由变化来加载数据
		'$route' (to, from) {
			console.log(2333)
			this.page = 1
			this.loading = true
			this.getOrderList()
			this.order_list = []
		}
	}
};
</script>

<style lang="stylus" scoped>
	
</style>

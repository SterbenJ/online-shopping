<template>
	<el-row>
		<el-button @click="addItemToShoppingCart" type="primary" round>加入购物车</el-button>
		<el-button @click="addItemToCollection" type="warning" :icon="citemInfo.collected ? 'el-icon-star-on' : 'el-icon-star-off'" round>{{ citemInfo.collected ? '取消收藏' : '收藏' }}</el-button>
	</el-row>
</template>

<script>
import commodityApi from '../../../api/commodityApi.js';
import { mapMutations, mapActions } from 'vuex';
import stateCode from '../../../api/stateCode.js';

const defaultInfo = {
	itemInfo: {
		item_id: '1111',
		name: '我是商品名称',
		price: 233.331,
		sales: 6661,
		quantity: 771,
		description:
			'1很长很长的描述很长很长的描述很长很长的描述很长很长的描述很长很长的描述很长很长的描述很长很长的描述很长很长的描述很长很长的描述很长很长的描述很长很长的描述很长很长的描述',
		image_path: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
		address: '我是产地1',
		tags: ['标签一1', '我是标签1'],
		collected: false
	}
};

export default {
	model: {
		prop: 'itemInfo',
		event: 'changeItemInfo'
	},
	props: {
		itemInfo: {
			type: Object,
			required: true,
			default: () => {
				return defaultInfo
			}
		}
	},
	data() {
		return {};
	},
	computed: {
		citemInfo: function() {
			return Object.assign(defaultInfo, this.itemInfo)
		}
	},
	methods: {
		...mapMutations({
			updateUser: 'updateUser'
		}),
		...mapActions({
			updateUserAsync: 'updateUserAsync'
		}),
		// 加入购物车
		addItemToShoppingCart: function() {
			let vm = this;
			vm.$axios({
				method: 'POST',
				url: commodityApi.addItemToShoppingCart
			}) // Todo: 更改响应接受数据
				.then(r => {
					console.log('add cart success');
					vm.updateUserAsync({
						shopping_cart_count: r.data.data.shopping_cart_count
					});
					vm.$notify({
						title: '添加购物车成功',
						type: 'success'
					});
				})
				.catch(r => {
					vm.$notify({
						title: '添加购物车失败',
						type: 'error'
					});
				});
		},
		// 加入收藏
		addItemToCollection: function() {
			let vm = this;
			vm.$emit('changeItemInfo', Object.assign(vm.citemInfo, {collected: !vm.citemInfo.collected }))
			vm.$axios({
				method: 'POST',
				url: commodityApi.addItemToCollection
			})
				.then(r => {
					if (r.data.code == stateCode.collectSuccess) {
						vm.$notify({
							title: '成功添加至收藏夹',
							type: 'success'
						});
						vm.$emit('changeItemInfo', Object.assign(vm.citemInfo, {collected: r.data.data.result }))
					}
					else if (r.data.code == stateCode.uncollectSuccess) {
						vm.$notify({
							title: '成功取消收藏',
							type: 'success'
						});
						vm.$emit('changeItemInfo', Object.assign(vm.citemInfo, {collected: r.data.data.result }))
					} else {
						vm.$notify({
							title: '操作失败',
							message: r.data ? r.data.message : '',
							type: 'error'
						});
						vm.$emit('changeItemInfo', Object.assign(vm.citemInfo, {collected: r.data.data.result }))
					}
					
				})
				.catch(r => {
					vm.$notify({
						title: '操作失败',
						message: r.data ? r.data.message : '',
						type: 'error'
					});
				});
		}
	}
};
</script>

<style></style>

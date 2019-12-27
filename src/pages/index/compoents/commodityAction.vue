<template>
	<el-row gutter="20">
		<el-col :span="24"><el-input-number class="action-item" :step="1" :precision="0" size="medium" v-model="count" :min="1" :max="99" label="数量"/></el-col>
		<el-col :span="24"><el-button class="action-item" @click="addItemToShoppingCart" type="primary" round>加入购物车</el-button></el-col>
		<el-col :span="24">
			<el-button class="action-item" @click="addItemToCollection" type="warning" :icon="citemInfo.collected ? 'el-icon-star-on' : 'el-icon-star-off'" round>
				{{ citemInfo.collected ? '取消收藏' : '收藏' }}
			</el-button>
		</el-col>
	</el-row>
</template>

<script>
import collectionApi from '../../../api/collectionApi.js';
import shoppingCartApi from '../../../api/shoppingCartApi.js';
import { mapMutations, mapActions } from 'vuex';

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
				return defaultInfo;
			}
		}
	},
	data() {
		return {
			count: 1
		};
	},
	computed: {
		citemInfo: function() {
			return Object.assign(defaultInfo, this.itemInfo);
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
				url: shoppingCartApi.addItem,
				data: {
					itemID: vm.citemInfo.item_id,
					count: vm.count
				}
			})
				.then(r => {
					vm.updateUserAsync({
						shopping_cart_count: r.data.data.shopping_cart_count
					});
					vm.$notify({
						title: '添加购物车成功',
						type: 'success',
						offset: 80
					});
				})
				.catch(r => {
					vm.$notify({
						title: '添加购物车失败',
						type: 'error',
						offset: 80
					});
				});
		},
		// 加入收藏
		addItemToCollection: function() {
			let vm = this;
			vm.$axios({
				method: 'POST',
				url: collectionApi.addItem
			})
				.then(r => {
					if (r.data.data.added) {
						vm.$notify({
							title: '成功添加至收藏夹',
							type: 'success',
							offset: 80
						});
						vm.$emit('changeItemInfo', Object.assign(vm.citemInfo, { collected: r.data.data.result }));
					} else if (!r.data.data.added) {
						vm.$notify({
							title: '成功取消收藏',
							type: 'success',
							offset: 80
						});
						vm.$emit('changeItemInfo', Object.assign(vm.citemInfo, { collected: r.data.data.result }));
					} else {
						vm.$notify({
							title: '操作失败',
							message: r.data.message ? r.data.message : '',
							type: 'error',
							offset: 80
						});
						vm.$emit('changeItemInfo', Object.assign(vm.citemInfo, { collected: r.data.data.result }));
					}
				})
				.catch(r => {
					vm.$notify({
						title: '操作失败',
						message: r.data.message ? r.data.message : '',
						type: 'error',
						offset: 80
					});
				});
		}
	}
};
</script>

<style lang="stylus" scoped>
.action-item
	margin 0.625rem 1.25rem
	width 94%
</style>

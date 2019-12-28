<template>
	<el-card class="main-contain" :body-style="{padding: '0px'}">
		<el-row type="flex" justify="space-between" align="middle">
			<img @click="openProductDetails" class="my-image" :src="cItem.image_path"/>
			<el-col :span="4">
				<span class="my-info info-name">{{ cItem.name }}</span>
			</el-col>
			<p class="info-title">单价<span class="my-info info-price">￥{{ cItem.price }}</span></p>
			<el-input-number @change="changeCount" @blur="updateCount" class="my-info info-count" v-model="count" :min="1" :max="99" label="数量"/>
			<p class="info-title">小计<span class="my-info info-price">￥{{ totalPrice }}</span></p>
			<el-row class="action-contain">
				<el-col>
					<el-button @click="deleteItem" :loading="loading" type="danger">
						删除
					</el-button>
				</el-col>
			</el-row>
		</el-row>
	</el-card>
</template>

<script>
import shoppingCartApi from '../../../api/shoppingCartApi.js';
	
import baseCommodityCompoent from './baseCommodityCompoent.vue';

export default {
	extends: baseCommodityCompoent,
	// 双向绑定
	model: {
		prop: 'count',
		event: 'changeCount'
	},
	props: {
		count: {
			type: Number,
			required: true,
			default: 1
		}
	},
	data() {
		return {
			loading: false
		};
	},
	computed: {
		// 动态计算单个物品总价
		totalPrice: function () {
			return (this.count * this.cItem.price).toFixed(2)
		}
	},
	methods: {
		// 双向绑定 count
		changeCount: function () {
			this.$emit('changeCount', this.count)
			console.log('changeCount')
		},
		// 更新商品数量
		updateCount: function () {
			let vm = this;
			vm.$axios({
				method: 'POST',
				url: shoppingCartApi.updateCount,
				data: {
					item_id: vm.cItem.item_id,
					count: vm.count
				}
			})
				.then(r => {
					if (r.data.code == 200) {
						vm.count = r.data.data.count
					} else {
						vm.$notify({
							title: '更改数量失败',
							message: r.data.message ? r.data.message : '',
							type: 'error'
						})
					}
				})
				.catch(e => {
					vm.$notify({
						title: '更改数量失败',
						type: 'error'
					})
				})
		},
		// 删除购物车物品
		deleteItem: function () {
			let vm = this;
			vm.loading = true
			vm.$axios({
				method: 'POST',
				url: shoppingCartApi.removeItem,
				data: {
					item_id: vm.cItem.item_id
				}
			})
				.then(r => {
					if (r.data.code == 200) {
						vm.$emit('removeItem', vm.cItem.item_id)
					} else {
						vm.$notify({
							title: '删除失败',
							message: r.data.message ? r.data.message : '',
							type: 'error'
						})
					}
					vm.loading = false
				})
				.catch(e => {
					vm.loading = false
				})
		}
	}
};
</script>

<style lang="stylus" scoped>
.main-contain
	border 0px
	margin 1.625rem 1.25rem
	.my-image
		object-fit fill
		height 10.75rem
		width 10.75rem
	.my-info
		font-size 1.25rem
	.info-price
		color orangered
	.info-name
		word-break break-all
		overflow hidden
		text-overflow ellipsis
		display -webkit-box
		-webkit-line-clamp 3
		-webkit-box-orient vertical
		font-weight 900
	.info-title
		color darkgray
		font-size 0.75rem
	.action-contain
		margin-right 1.5rem
</style>

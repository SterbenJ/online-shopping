<template>
	<div v-loading="loading">
		<transition-group name="el-fade-in-linear" :appear="true">
			<div v-for="(obj, index) in itemList" :key="obj.item.item_id">
				<el-col :span="1"><input class="my-checkbox" :value="obj.item.item_id" v-model="selectedList" type="checkbox" /></el-col>
				<el-col :span="23"><shopping-cart-item @removeItem="deleteItem" :ref="obj.item.item_id" :item="obj.item" v-model="obj.count" /></el-col>
			</div>
		</transition-group>
		<transition name="el-fade-in-linear" :appear="true">
			<el-card shadow="never">
				<el-row type="flex" justify="end" align="middle">
					<span>
						总价：
						<span class="price">￥{{ totalPrice }}</span>
					</span>
					<el-button @click="makeOrder" :disabled="selectedList.length == 0" class="btn-pay" type="success" round>结算({{ selectedList.length }})</el-button>
				</el-row>
			</el-card>
		</transition>
	</div>
</template>

<script>
import shoppingCartItem from '../compoents/shoppingCartItem.vue';

import shoppingCartApi from '../../../api/shoppingCartApi.js';

export default {
	props: {},
	data() {
		return {
			itemList: [],
			selectedList: [],
			loading: true
		};
	},
	components: {
		shoppingCartItem
	},
	computed: {
		// 总价格
		totalPrice() {
			let vm = this;
			if (vm.selectedList.length == 0) {
				return 0;
			}
			return vm.selectedList
				.reduce((result, value) => {
					console.log(vm.$refs[value][0].totalPrice);
					result += Number(vm.$refs[value][0].totalPrice);
					return result;
				}, 0)
				.toFixed(2);
		},
		// 被选中的物品和数量
		makeOrderData() {
			var arr = this.itemList.filter((obj, index, self) => {
				return this.selectedList.includes(obj.item.item_id);
			});
			return arr;
		}
	},
	methods: {
		// 获得购物车列表
		getItemList: function() {
			let vm = this;
			vm.$axios({
				method: 'GET',
				url: shoppingCartApi.getList
			})
				.then(r => {
					if (r.data.code == 200) {
						vm.itemList = r.data.data
					} else {
						vm.$notify({
							title: '获取购物车列表失败',
							message: r.data.message ? r.data.message : '',
							type: 'error',
							offset: 80
						});
					}
					vm.loading = false;
				})
				.catch(e => {
					vm.$notify({
						title: '获取购物车列表失败',
						type: 'error',
						offset: 80
					});
					vm.loading = false;
				});
		},
		// 删除物品
		deleteItem: function(item_id) {
			this.itemList = this.itemList.filter(item => {
				return item.item.item_id != item_id;
			});
			this.selectedList = this.selectedList.filter(item => {
				return item != item_id;
			});
		},
		// 结算选中物品
		makeOrder: function() {
			this.$router.push({
				name: 'orderCreate',
				params: {
					item_list: this.makeOrderData
				}
			});
		}
	},
	mounted() {
		this.getItemList();
	}
};
</script>

<style lang="stylus" scoped>
.my-checkbox
	margin-top 6.25rem
	height 1.25rem
	width 1.25rem
.btn-pay
	float right
	margin 1.625rem 1.25rem
	box-shadow 0px 5px 5px gray
.price
	color orangered
	font-size 1.25rem
</style>

<template>
	<div v-loading="loading">
		<div v-for="(obj, index) in itemList" :key="obj.itemInfo.item_id">
			<el-col :span="1">
				<input class="my-checkbox" :value="obj.itemInfo.item_id" v-model="selectedList" type="checkbox" />
			</el-col>
			<el-col :span="23">
				<transition name="el-fade-in-linear" :appear="true">
					<shopping-cart-item @removeItem="deleteItem" class="test" :ref="obj.itemInfo.item_id" :item="obj.itemInfo" v-model="obj.count" />
				</transition>
			</el-col>
		</div>
		<transition name="el-fade-in-linear" :appear="true">
			<el-card shadow="never">
				<el-row type="flex" justify="end" align="middle">
					<span>总价：<span class="price">￥{{totalPrice}}</span></span>
					<el-button :disabled="selectedList.length == 0" class="btn-pay" type="success" round>结算({{selectedList.length}})</el-button>
				</el-row>
			</el-card>
		</transition>
	</div>
</template>

<script>
import shoppingCartItem from '../compoents/shoppingCartItem.vue';
import { mapGetters, mapActions, mapMutations } from 'vuex';

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
		...mapGetters({
			shoppingCartList: 'shoppingCartList',
			selectedShoppingCartList: 'selectedShoppingCartList'
		}),
		// 总价格
		totalPrice () {
			let vm = this;
			if (vm.selectedList.length == 0) {
				return 0
			}
			return vm.selectedList.reduce((result, value) => {
				console.log(vm.$refs[value][0].totalPrice)
				result += Number(vm.$refs[value][0].totalPrice)
				return result
			}, 0).toFixed(2)
		}
	},
	methods: {
		...mapActions({
			updateShoppingCartAsync: 'updateShoppingCartAsync',
			updateSelectedShoppingCartAsync: 'updateSelectedShoppingCartAsync'
		}),
		...mapMutations({
			updateShoppingCart: 'updateShoppingCart',
			updateSelectedShoppingCart: 'updateSelectedShoppingCart'
		}),
		// 获得购物车列表
		getItemList: function() {
			let vm = this;
			vm.$axios({
				method: 'GET',
				url: shoppingCartApi.getList
			})
				.then(r => {
					if (r.data.code == 200) {
						vm.itemList = r.data.data.itemList;
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
		deleteItem: function (item_id) {
			console.log(item_id)
			this.itemList = this.itemList.filter(item => {
				return item.itemInfo.item_id != item_id
			})
			this.totalPrice()
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
	height: 1.25rem
	width: 1.25rem
.btn-pay
	float right
	margin 1.625rem 1.25rem
	box-shadow 0px 5px 5px gray
.price
	color orangered
	font-size 1.25rem
</style>

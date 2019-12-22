<template>
	<div>
		<el-row>
			<el-col :span="22" :offset="1" :lg="{ span: 16, offset: 4 }">
				<el-row type="flex">
					<el-col class="main-contain" :span="12" :lg="{ span: 10 }">
						<el-carousel class="my-banner" indicator-position="inside">
							<el-carousel-item v-for="(obj, index) in 5" :key="index">
								<img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"/>
							</el-carousel-item>
						</el-carousel>
					</el-col>
					<el-col class="main-contain" :span="12" :lg="{ span: 14 }">
						<el-row class="info-contain" v-loading="loading">
							<el-col>
								<h2>{{ itemInfo.name }}</h2>
								<p>价格：<span>{{ priceStringArr[0] }}</span><span>.</span><span>{{ priceStringArr[1] }}</span></p>
								<p>产地：<span>{{ itemInfo.address }}</span></p>
								<p>描述：<span class="test">{{ itemInfo.description }}</span></p>
							</el-col>
						</el-row>
						<el-row class="action-contain">
							<el-col>
								
							</el-col>
						</el-row>
					</el-col>
				</el-row>
			</el-col>
		</el-row>
	</div>
</template>

<script>
import commodityApi from '../../../api/commodityApi.js'

export default {
	props: ['item_id'],
	data() {
		return {
			itemInfo: {},
			loading: true
		}
	},
	computed: {
		// 把价格小数点前后拆开
		priceStringArr() {
			return this.itemInfo.price.toString().split('.');
		},
	},
	methods: {
		// 获取商品信息
		getItemInfo: function () {
			let vm = this;
			vm.$axios({
				method: 'GET',
				url: commodityApi.itemInfo,
				data: {
					itemID: vm.item_id
				}
			})
			.then(r => {
				vm.itemInfo = {...r.data.data.itemInfo}
				vm.loading = false
			})
			.catch(r => {
				vm.$notify({
					message: '获取商品信息失败',
					type: 'error'
				})
				vm.loading = false
			})
		}
	},
	mounted() {
		this.getItemInfo()
	}
}
</script>

<style lang="stylus" scoped>
.my-banner
	background-color whitesmoke
	img
		width 100%
.main-contain
	padding 0.625rem
	h1, h2, p
		margin 0
		padding 0
.info-contain
	h1, h2, p
		padding 0.625rem 0.625rem
</style>

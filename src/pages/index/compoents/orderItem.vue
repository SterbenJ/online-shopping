<template>
	<el-card @click.native="toOrderInfo" class="main-contain" :body-style="{padding: '20px'}">
		<el-row type="flex" justify="space-between" align="middle">
			<p class="info-title">订单编号<span class="my-info">{{ order.order_id }}</span></p>
			<el-col :span="4">
				<span class="my-info info-name">{{ itemsName }}</span>
			</el-col>
			<p class="info-title">金额<span class="my-info info-price">￥{{ order.price }}</span></p>
			<p class="info-title">创建时间<span class="my-info">{{ timeString }}</span></p>
		</el-row>
	</el-card>
</template>

<script>
export default {
	props: {
		order: {
			type: Object,
			required: true
		}
	},
	data () {
		return {
			
		}
	},
	computed: {
		// 前三个商品名字
		itemsName() {
			var arr = []
			this.order.items.slice(0, 3).forEach(item => {
				arr.push(item.itemInfo.name)
			})
			console.log(arr)
			return arr.join(' ')
		},
		// 格式化时间
		timeString() {
			return new Date(this.order.create_time).toLocaleString()
		}
	},
	methods: {
		// 跳转到订单详情
		toOrderInfo() {
			this.$router.push({ 
				name: 'orderInfo',
				params: {
					order_id: this.order.order_id
				}
			})
		}
	},
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
		margin-left 0.325rem
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

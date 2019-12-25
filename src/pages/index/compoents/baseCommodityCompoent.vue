<template>
	<span></span>
</template>

<script>
import pageRoutes from '../../../api/pageRoutes.js'

export default {
	props: {
		// 商品信息对象
		item: {
			type: Object,
			required: true,
			default: () => {
				return {}
			}
		}
	},
	methods: {
		// 打开商品详情页面
		openProductDetails: function() {
			// window.open(pageRoutes.commodity.concat('/' + this.cItem.item_id), '_blank')
			this.$router.push({ name: 'commodity', params: { item_id: this.cItem.item_id } })
		}
	},
	computed: {
		cItem: function() {
			return this.item
		}
	}
};
</script>

<style></style>

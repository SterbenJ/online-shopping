<template>
	<span></span>
</template>

<script>
import pageRoutes from '../../../api/pageRoutes.js'
	
// 默认商品信息
const defaultItem = {
	item_id: '233',
	name: '商品名称',
	price: 233.33,
	sales: 666,
	image_path: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
	shop_id: '',
	address: '产地',
	tags: ['标签一', '我是标签']
};

export default {
	props: {
		// 商品信息对象
		item: {
			type: Object,
			required: true,
			default: () => {
				return defaultItem;
			}
		}
	},
	methods: {
		// 打开商品详情页面
		openProductDetails: function() {
			window.open(pageRoutes.commodity.concat('/' + this.cItem.item_id), '_blank')
		}
	},
	computed: {
		// 合并默认和传入值
		cItem: function() {
			return Object.assign(defaultItem, this.item);
		}
	}
};
</script>

<style></style>

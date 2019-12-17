<template>
	<div>
		<el-card id="item-card" shadow="hover" :body-style="{ padding: '0px', margin: '0px' }">
			<img id="item-img" :src="cItem.image_path" />
			<div id="item-content">
				<div class="text-block">
					<span>{{ cItem.name }}</span>
				</div>
				<div class="text-block">
					<span>{{ priceStringArr[0] }}</span>
					.
					<span>{{ priceStringArr[1] }}</span>
				</div>
			</div>
		</el-card>
	</div>
</template>

<script>
// 默认商品信息
const defaultItem = {
	item_id: '',
	name: '商品名称',
	price: 233.33,
	sales: 666,
	image_path: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
	shop_id: '',
	address: '产地',
	open: 1,
	tags: ['标签一', '我是标签']
};

export default {
	data() {
		return {};
	},
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
	computed: {
		// 合并默认和传入值
		cItem() {
			return Object.assign(defaultItem, this.item);
		},
		priceStringArr() {
			return this.cItem.price.toString().split('.');
		}
	}
};
</script>

<style lang="stylus" scoped>
#item-img
	display blockq
	width 100%

#item-content
	margin 0px

.text-block
	margin 5% 10%
</style>

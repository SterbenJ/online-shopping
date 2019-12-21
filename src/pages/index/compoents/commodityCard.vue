<template>
	<el-card @click.native="openProductDetails" id="item-card" shadow="hover" :body-style="{ padding: '0px', margin: '0px' }">
		<img id="item-img" :src="cItem.image_path" />
		<div id="item-content">
			<div class="text-block">
				<span class="price">￥</span>
				<span class="large-text price">{{ priceStringArr[0] }}</span>
				<span class="price">.</span>
				<span class="small-text price">{{ priceStringArr[1] }}</span>
			</div>
			<div class="text-block">
				<span class="large-text name">{{ cItem.name }}</span>
			</div>
			<div class="text-block">
				<span v-for="(item, index) in tagString" :key="index" class="msg-text small-text">
					{{ item }}
					<span v-show="index != 1">|</span>
				</span>
			</div>
			<div class="text-block">
				<span class="msg-text small-text address p-oneline">产地 {{ cItem.address }}</span>
				<span class="msg-text small-text sales p-oneline">销量{{ cItem.sales }}</span>
			</div>
		</div>
	</el-card>
</template>

<script>

import baseCommodityCompoent from './baseCommodityCompoent.vue';

export default {
	extends: baseCommodityCompoent,
	data() {
		return {};
	},
	props: {
	},
	methods: {
	},
	computed: {
		// 把价格小数点前后拆开
		priceStringArr() {
			return this.cItem.price.toString().split('.');
		},
		// 只显示两个标签
		tagString() {
			return this.cItem.tags.slice(0, 2);
		}
	}
};
</script>

<style lang="stylus" scoped>
#item-card
	margin 10px
#item-img
	display block
	width 100%
#item-content:before, #item-content:after
	margin 0px
	display table
	content ''
.p-oneline
	display inline-block
	width 50%
.sales
	text-align right
.address
	text-align left
.price
	color orange
.msg-text
	color grey
.small-text
	font-size 0.75rem
.large-text
	font-size 1.25rem
.text-block
	margin 5% 10%
</style>

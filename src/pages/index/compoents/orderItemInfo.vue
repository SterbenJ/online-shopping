<template>
	<el-card @click.native="openProductDetails" id="item-card" shadow="hover" :body-style="{ padding: '0px', margin: '0px' }">
		<img id="item-img" :src="cItem.image_path" />
		<div id="item-content">
			<div class="text-block">
				<p class="large-text name">{{ cItem.name }}</p>
			</div>
			<div class="text-block">
				<span class="msg-text small-text sales p-oneline">数量 {{ count }}</span>
			</div>
			<div class="text-block">
				<span class="msg-text small-text">小计<span class="price">￥<span class="large-text price">{{ totalPrice }}</span></span></span>
			</div>
		</div>
	</el-card>
</template>

<script>
import shoppingCartItem from './shoppingCartItem.vue'

export default {
	extends: shoppingCartItem,
	props: {

	},
	data () {
		return {
			
		}
	},
	computed: {
		
	},
	methods: {
	},
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
.name
	word-break break-all
	overflow hidden
	text-overflow ellipsis
	display -webkit-box
	-webkit-line-clamp 2
	-webkit-box-orient vertical
.p-oneline
	display inline-block
	width 50%
.sales
	width 100%
	text-align left
.price
	color orange
.msg-text
	color darkgrey
.small-text
	font-size 0.75rem
.large-text
	font-size 1.5rem
.text-block
	margin 5% 10%
</style>
<template>
	<img @click="openProductDetails" :src="cItem.image_path" />
</template>

<script>
import baseCommodityCompoent from './baseCommodityCompoent.vue'
	
export default {
	extends: baseCommodityCompoent
}
</script>

<style lang="stylus" scoped>
	img
		width 100%
</style>

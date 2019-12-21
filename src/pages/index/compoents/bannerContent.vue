<template>
	<img @click="openProductDetails" src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" />
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

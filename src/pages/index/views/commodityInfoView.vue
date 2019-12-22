<template>
	<div>
		{{ item_id }}
	</div>
</template>

<script>
export default {
	props: ['item_id'],
	mounted() {
		console.log(this.$route.params);
		console.log(item_id);
	}
}
</script>

<style lang="stylus" scoped>
</style>

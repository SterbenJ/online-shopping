<template>
	<el-row v-loading="loading" style="padding: 5px;">
		<el-col v-for="(obj, index) in itemList" :key="obj.item_id" :span="12" :xs="12" :md="8" :lg="4">
			<transition name="el-fade-in-linear" :appear="true">
				<commodity-card :item="obj"/>
			</transition>
		</el-col>
	</el-row>
</template>

<script>
import commodityCard from '../compoents/commodityCard.vue'
import commodityApi from '../../../api/commodityApi.js'

export default {
	data () {
		return {
			itemList: [],
			loading: true
		}
	},
	components: {
		commodityCard
	},
	computed: {
	},
	methods: {
		// 获得主页商品推送列表
		getIndexItemList() {
			let vm = this
			vm.loading = true
			vm.$axios({
				method: 'POST',
				url: commodityApi.indexItemList
			})
			.then(r => {
				vm.itemList = r.data.data.indexItemList
				vm.loading = false
			})
			.catch(r => {
				console.log('list fail')
				vm.loading = false
			})
		}
	},
	mounted() {
		this.getIndexItemList()
	}
};
</script>

<style lang="stylus" scoped>
	
</style>

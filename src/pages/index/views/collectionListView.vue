<template>
	<div v-loading="loading">
		<transition-group name="el-fade-in-linear" :appear="true">
			<div v-for="(obj, index) in collectionList" :key="obj.item_id">
				<el-col :span="6">
					<commodity-card :item="obj" />
				</el-col>
			</div>
		</transition-group>
		<el-col style="padding-top: 2.25rem;">
			<el-row type="flex" justify="center">
				<el-link @click="getCollectionList">加载更多数据</el-link>
			</el-row>
		</el-col>
	</div>
</template>

<script>
import commodityCard from '../compoents/commodityCard.vue'

import collectionApi from '../../../api/collectionApi.js'
	
export default {
	props: {

	},
	data () {
		return {
			collectionList: [],
			page: 1,
			loading: true
		}
	},
	components: {
		commodityCard
	},
	computed: {
		
	},
	methods: {
		// 请求收藏列表
		getCollectionList() {
			let vm = this;
			vm.$axios({
				method: 'GET',
				url: collectionApi.getList,
				params: {
					page: vm.page
				}
			})
				.then(r => {
					vm.loading = false
					if (r.data.code == 200) {
						vm.collectionList.push(...r.data.data)
						vm.getCollectionListSuccess()
						if (r.data.data.length > 0) {
							vm.page++
						}
					} else {
						vm.getCollectionListFail(r.data.message)
					}
				})
				.catch(e => {
					vm.loading = false
					vm.getCollectionListFail()
				})
		},
		// 请求成功
		getCollectionListSuccess() {
			
		},
		// 请求失败
		getCollectionListFail(message) {
			this.$notify({
				title: '请求收藏列表失败',
				message: message ? message : '',
				type: 'error'
			})
		}
	},
	mounted() {
		this.getCollectionList()
	}
};
</script>

<style lang="stylus" scoped>
	
</style>

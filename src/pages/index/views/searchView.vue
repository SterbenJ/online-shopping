<template>
	<div v-loading="loading">
		<el-row>
			<el-col :span="22" :offset="1" :lg="{ span: 16, offset: 4 }">
				<p class="title">搜索结果：<span class="content">{{searchStr}}</span></p>
			</el-col>
			<el-col :span="22" :offset="1" :lg="{ span: 16, offset: 4 }">
				<transition-group name="el-fade-in-linear" :appear="true">
					<div v-for="(obj, index) in itemList" :key="obj.item_id">
						<el-col :span="6">
							<commodity-card :item="obj" />
						</el-col>
					</div>
				</transition-group>
			</el-col>
		</el-row>
		<el-col style="padding-top: 2.25rem;">
			<el-row type="flex" justify="center">
				<el-link @click="getSearchList">加载更多数据</el-link>
			</el-row>
		</el-col>
	</div>
</template>

<script>
import commodityApi from '../../../api/commodityApi.js'

import commodityCard from '../compoents/commodityCard.vue'

export default {
	props: {
		searchStr: {
			type: String,
			required: true,
		}
	},
	data () {
		return {
			page: 1,
			loading: true,
			itemList: []
		}
	},
	components: {
		commodityCard
	},
	computed: {
		
	},
	methods: {
		getSearchList() {
			let vm = this
			vm.loading = true
			vm.$axios({
				method: 'GET',
				url: commodityApi.indexItemList,
				params: {
					search: vm.searchStr,
					page: vm.page
				}
			})
			.then(r => {
				vm.loading = false
				if (r.data.code == 200) {
					vm.itemList.push(...r.data.data)
					if (r.data.data.lengh == 18) {
						vm.page++
					}
				}
			})
			.catch(r => {
				vm.loading = false
			})
		}
	},
	mounted() {
		if (this.loading) {
			this.itemList = []
			this.getSearchList()
		}
	},
	watch: {
		'$route' (to, from) {
			this.itemList = []
			this.page = 1
			this.getSearchList()
		}
	}
};
</script>

<style lang="stylus" scoped>
.title
	color darkgrey
.content
	color black
	font-size 1.5rem
</style>

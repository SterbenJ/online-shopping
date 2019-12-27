<template>
	<el-card :body-style="{padding: '0px'}" class="my-banner">
		<el-carousel v-loading="loading" indicator-position="inside">
			<el-carousel-item v-for="(obj, index) in indexBannerList" :key="obj.item_id">
				<banner-content :item="obj"/>
			</el-carousel-item>
		</el-carousel>
	</el-card>
</template>

<script>
import commodityApi from '../../../api/commodityApi.js'
import bannerContent from '../compoents/bannerContent.vue'
	
export default {
	data() {
		return {
			indexBannerList: [],
			loading: true
		};
	},
	components: {
		bannerContent,
	},
	methods: {
		// 获取主页 banner 列表
		getIndexBannerList() {
			let vm = this
			vm.loading = true
			vm.$axios({
				method: 'get',
				url: commodityApi.indexBannerList
			})
			.then(r => {
				vm.indexBannerList = r.data.data
				vm.loading = false
			})
			.catch(r => {
				console.log('list fail')
				vm.loading = false
			})
		}
	},
	mounted() {
		this.getIndexBannerList()
	}
};
</script>

<style lang="stylus" scoped>
.my-banner
	margin 0 20px
	background-color whitesmoke
.el-carousel__item
	color #475669
	font-size 18px
	opacity 0.75
	line-height 300px
	margin 0
	.el-image
		width 100%
.el-carousel__item:nth-child(2n)
	background-color #99a9bf
.el-carousel__item:nth-child(2n+1)
	background-color #d3dce6
</style>

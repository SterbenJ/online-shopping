<template>
	<div>
		<div class="my-header" style="height: 60px;">
			<my-header id="my-header" />
		</div>
		<div class="banner">
			<el-row>
				<el-col :span="22" :offset="1" :lg="{ span: 16, offset: 4 }">
					<banner-view />
				</el-col>
			</el-row>
		</div>
		<div class="content">
			<el-row>
				<el-col :span="22" :offset="1" :lg="{ span: 16, offset: 4 }"><router-view name="content" /></el-col>
			</el-row>
		</div>
		<div class="footer">
			<my-footer />
		</div>
	</div>
</template>

<script>
import MyHeader from '../../common/compoents/header.vue'
import bannerView from './views/bannerView.vue'
import MyFooter from '../../common/compoents/footer.vue'

export default {
	data() {
		return {};
	},
	components: {
		MyHeader,
		bannerView,
		MyFooter
	},
	methods: {},
	mounted() {}
};
</script>

<style lang="stylus" scoped>
$nav-height = 60px
#appfont-family
	Helvetica , sans-serif
#my-header
	z-index 1000
	width 100%
	position fixed
	top 0
.content
.banner
	margin-top $nav-height
.footer
	margin-top $nav-height
</style>

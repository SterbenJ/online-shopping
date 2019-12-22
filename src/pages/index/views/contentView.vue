<template>
	<div>
		<div class="banner">
			<el-row>
				<el-col :span="22" :offset="1" :lg="{ span: 16, offset: 4 }"><banner-view /></el-col>
			</el-row>
		</div>
		<div class="content">
			<el-row>
				<el-col :span="22" :offset="1" :lg="{ span: 16, offset: 4 }"><commodities-view  /></el-col>
			</el-row>
		</div>
	</div>
</template>

<script>
import bannerView from './bannerView.vue';
import commoditiesView from './commoditiesView.vue';

export default {
	components: {
		bannerView,
		commoditiesView
	}
};
</script>

<style lang="stylus" scoped>
$nav-height = 60px
.content
.banner
	margin-top $nav-height
</style>

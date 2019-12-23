<template>
	<el-col :span="22" :offset="1">
		<div class="title">
			<h3>
				{{ userNickname }}
			</h3>
		</div>
		<div class="content">
			<div class="content-main">等级：{{ userLevel }}</div>
			<div class="content-main">积分：{{ userPoint }}</div>
		</div>
	</el-col>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
	computed: {
		...mapGetters({
			userNickname: 'userNickname',
			userLevel: 'userLevel',
			userPoint: 'userPoint'
		}),
	}
};
</script>

<style lang="stylus" scoped>
.title
	text-align center
.content
	padding 10px
	text-align center
	.content-main
		padding 5px
		display inline-block
</style>

<template>
	<div id="app">
		<el-row type="flex" justify="space-around">
			<el-col :span="12" :xs="20" :lg="8"><router-view /></el-col>
		</el-row>
	</div>
</template>

<script>
import LoginForm from '../login/views/LoginForm.vue';
export default {
	data() {
		return {};
	},
	components: {
		LoginForm
	},
	methods: {}
};
</script>

<style>
#app {
	font-family: Helvetica, sans-serif;
}
</style>

<template>
	<div>
		<div class="my-header" style="height: 60px;">
			<my-header id="my-header"/>
		</div>
		<div class="content">
			<transition name="el-fade-in-linear" :appear="true">
				<router-view name="content"/>
			</transition>
		</div>
		<div class="footer">
			<my-footer />
		</div>
		<to-top-button />
	</div>
</template>

<script>
import toTopButton from '../../common/compoents/toTopButton.vue';
import MyHeader from '../../common/compoents/header.vue';
import MyFooter from '../../common/compoents/footer.vue';
import userApi from '../../api/userApi.js';
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex';

export default {
	data() {
		return {};
	},
	components: {
		MyHeader,
		MyFooter,
		toTopButton
	},
	computed: {
		...mapGetters({
			loginState: 'loginState'
		})
	},
	methods: {
		// 请求当前 session 的用户信息
		requestUserInfo: function() {
			let vm = this;
			vm.$axios({
				method: 'GET',
				url: userApi.userInfo
			})
				.then(r => {
					vm.updateUser(r.data.data.user);
				})
				.catch(r => {
					vm.$notify({
						message: '获取用户信息失败',
						type: 'error'
					});
				});
		},
		...mapMutations({
			updateUser: 'updateUser'
		})
	},
	mounted() {
		this.requestUserInfo();
	}
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
	margin-top $nav-height
.footer
	margin-top $nav-height
</style>

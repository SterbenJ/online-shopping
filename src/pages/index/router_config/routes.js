export default [{
		path: '/',
		redirect: {
			name: 'index'
		}
	},
	{
		name: 'index',
		path: '/index.html',
		props: true,
		scrollBehavior(to, from, savedPosition) { // 配置跳转路由后的滚动行为
			if (savedPosition) {
				return savedPosition // 滚动到上次位置
			} else {
				return {
					x: 0,
					y: 0
				} // 滚动到最顶端
			}
		},
		components: {
			content: () => import('../views/commoditiesView.vue')
		}
}]
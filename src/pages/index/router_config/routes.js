export default [
	{
		path: '/',
		redirect: {
			name: 'index'
		}
	},
	{
	name: 'index',
	path: '/index.html/',
	props: true,
	components: {
		content: () => import('../views/commoditiesView.vue')
	}
}]

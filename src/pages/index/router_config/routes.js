export default [
	{
		path: '/',
		redirect: {
			name: 'index'
		}
	},
	{
	name: 'index',
	path: '/index/',
	props: true,
	components: {
		content: () => import('../views/commodities.vue')
	}
}]

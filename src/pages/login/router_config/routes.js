export default [
	{
		path: '/login',
		redirect: {
			name: 'login'
		}
	},
	{
		name: 'login',
		path:'/login.html',
		props: true,
		component: () => import('../views/LoginForm.vue')
	}
]
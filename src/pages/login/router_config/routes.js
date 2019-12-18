export default [
	{
		name: 'login',
		path:'/login/',
		props: true,
		component: () => import('../views/LoginForm.vue')
	}
]
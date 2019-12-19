export default [
	{
		name: 'login',
		path:'/login.html/',
		props: true,
		component: () => import('../views/LoginForm.vue')
	}
]
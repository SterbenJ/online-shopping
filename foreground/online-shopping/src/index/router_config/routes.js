export default [
	{
		path:'/index.html/login',
		props: true,
		component: () => import('../../login/views/LoginForm.vue')
	}
]
export default [
	{
		path: '/register',
		redirect: {
			name: 'register'
		}
	},
	{
		name: 'register',
		path:'/register.html',
		props: true,
		// component: () => import('')
	}
]
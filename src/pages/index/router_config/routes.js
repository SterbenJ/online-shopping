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
		components: {
			content: () => import('../views/contentView.vue')
		}
	},
	{
		name: 'commodity',
		path: '/index.html/commodity/:item_id',
		components: {
			content: () => import('../views/commodityInfoView.vue')
		},
		props: {
			content: true
		}
	}
]

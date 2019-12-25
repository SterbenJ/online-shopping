import userApi from '../../../api/userApi.js'
import axios from 'axios'
import pageRoutes from '../../../api/pageRoutes.js'

export default [{
		path: '/',
		redirect: {
			name: 'index'
		}
	},
	// 主页
	{
		name: 'index',
		path: '/index.html',
		components: {
			content: () => import('../views/contentView.vue')
		},
		props: {
			content: true
		}
	},
	// 商品详情
	{
		name: 'commodity',
		path: '/index.html/commodity/:item_id',
		components: {
			content: () => import('../views/commodityInfoView.vue')
		},
		props: {
			content: true
		}
	},
	// 用户中心
	{
		name: 'userCenter',
		path: '/index.html/userCenter/:user_id',
		components: {
			content: () => import('../views/userCenterView.vue')
		},
		// 默认子路由-购物车
		redirect: {
			name: 'shoppingCart'
		},
		props: {
			content: true
		},
		children: [
			// 购物车
			{
				name: 'shoppingCart',
				path: '/index.html/userCenter/:user_id/shoppingCart',
				components: {
					main: () => import('../views/shoppingCartItemListView.vue')
				},
				props: {
					main: true
				}
			},
			// 订单列表
			{
				name: 'orderList',
				path: '/index.html/userCenter/:user_id/orderList/:finished',
				components: {
					main: () => import('../views/orderListView.vue')
				},
				props: {
					main: true
				}
			}
		]
	}
]

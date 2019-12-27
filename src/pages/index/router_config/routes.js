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
	// 搜索页面
	{
		name: 'search',
		path: '/index.html/search/:searchStr',
		components: {
			content: () => import('../views/searchView.vue')
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
			},
			// 收藏列表
			{
				name: 'collectionList',
				path: '/index.html/userCenter/:user_id/collectionList',
				components: {
					main: () => import('../views/collectionListView.vue')
				}
			},
			// 查看个人信息
			{
				name: 'userInfo',
				path: '/index.html/userCenter/:user_id/info',
				components: {
					main: () => import('../views/userInfoView.vue')
				}
			},
			// 修改个人信息
			{
				name: 'userChangeInfo',
				path: '/index.html/userCenter/:user_id/editInfo',
				components: {
					main: () => import('../views/userEditInfoView.vue')
				}
			},
			// 修改密码
			{
				name: 'userChangePwd',
				path: '/index.html/userCenter/:user_id/changePwd',
				components: {
					main: () => import('../views/userChangePwdView.vue')
				}
			}
		]
	},
	// 订单信息(查看信息/付款/取消订单)
	{
		name: 'orderInfo',
		path:'/index.html/order/info/:order_id',
		components: {
			content: () => import('../views/orderInfoView.vue')
		},
		props: {
			content: true
		},
		// beforeEnter: (to, from, next)=> {
		// 	if (to.params.item_list) {
		// 		next()
		// 	} else {
		// 		next({ name: 'index'})
		// 	}
		// },
	},
	// 创建订单
	{
		name: 'orderCreate',
		path:'/index.html/order/create',
		components: {
			content: () => import('../views/orderCreateView.vue')
		},
		props: {
			content: true
		},
		beforeEnter: (to, from, next)=> {
			console.log(to)
			if (to.params.item_list) {
				next()
			} else {
				next({ name: 'index'})
			}
		},
	}
]

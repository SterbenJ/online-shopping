import Router from 'vue-router'
import routes from './routes'
import axios from 'axios'
import userApi from '../../../api/userApi.js'
import pageRoutes from '../../../api/pageRoutes.js'

export default () => {
	const router =  new Router({
		routes,
		mode: 'history',
		fallback: true
	})
	// 全局前置守卫
	router.beforeEach((to, from, next) => {
		console.log(to.name)
		console.log(['userCenter', 'shoppingCart'].indexOf(to.name) != -1)
		if (['userCenter', 'shoppingCart'].indexOf(to.name) != -1) {
			axios({
					method: 'GET',
					url: userApi.hasLogin
				})
				.then(r => {
					if (!r.data.data.login) {
						window.open(pageRoutes.login + '?fromWhere=' + window.location.href, '_self')
					} else {
						next()
					}
				})
				.catch(r => {
					window.open(pageRoutes.login + '?fromWhere=' + window.location.href, '_self')
				})
		} else {
			next()
		}
	})
	return router
}
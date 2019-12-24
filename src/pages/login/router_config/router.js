import Router from 'vue-router'
import routes from './routes'
import axios from 'axios'
import pageRoutes from '../../../api/pageRoutes.js'
import userApi from '../../../api/userApi.js'

export default () => {
	const router = new Router({
		routes,
		mode: 'history',
		fallback: true
	})
	// 如果已经登入就跳转到主页
	router.beforeEach((to, from, next) => {
		axios({
			method: 'GET',
			url: userApi.hasLogin
		})
		.then(r => {
			if (r.data.data.hasLogin) {
				window.open(pageRoutes.index, '_self')
			} else {
				next()
			}
		})
		.catch(r => {
			window.open(pageRoutes.index, '_self')
		})
	})
	return router
}

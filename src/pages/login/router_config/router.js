import Router from 'vue-router'
import routes from './routes'
import axios from 'axios'
import pageRoutes from '../../../api/pageRoutes.js'

export default () => {
	const router = new Router({
		routes,
		mode: 'history',
		fallback: true
	})
	router.beforeEach((to, from, next) => {
		axios({
			method: 'GET',
			url: 'hasLogin'
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

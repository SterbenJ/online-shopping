import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import App from './App.vue'

import axios from 'axios'

import createStore from './store/store.js'
import createRouter from './router_config/router.js'

import baseApi from '../../api/baseApi.js'
import stateCode from '../../api/stateCode.js'
import pageRoutes from '../../api/pageRoutes.js'


Vue.use(Vuex)
Vue.use(VueRouter)
Vue.use(ElementUI)


const store = createStore()
const router = createRouter()


// 根据环境设定 baseUrl
axios.defaults.baseURL = process.env.NODE_ENV === 'production' ? (baseApi.backgroundHost + baseApi.apiPrefix) : baseApi
	.apiPrefix,

	axios.interceptors.response.use(r => {
		// 如果没权限
		if (r.data.code == stateCode.notAuthority) {
			// 带着当前页面 url 跳到登入界面
			window.open(pageRoutes.login + '?fromWhere=' + window.location.href, '_self')
		}
		return r
	}, function(e) {
		// Do something with response error
		return Promise.reject(e)
	})
Vue.prototype.$axios = axios


new Vue({
	el: '#app',
	store,
	router,
	render: (h) => {
		return h(App)
	}
})

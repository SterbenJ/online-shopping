import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'element-ui/lib/theme-chalk/display.css';
import VueRouter from 'vue-router'
import App from './AppLogin.vue'

import axios from 'axios'

import createRouter from './router_config/router.js'

import baseApi from '../../api/baseApi.js'


Vue.use(VueRouter)
Vue.use(ElementUI)


const router = createRouter()

console.log(process.env.NODE_ENV === 'production')
axios.defaults.baseURL = process.env.NODE_ENV === 'production' ? (baseApi.backgroundHost + baseApi.apiPrefix) : baseApi.apiPrefix
console.log(axios.defaults.baseURL)
Vue.prototype.$axios = axios


new Vue({
	el: '#login',
	router,
	render: (h) => {
		return h(App)
	}
})

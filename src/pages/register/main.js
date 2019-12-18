import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'element-ui/lib/theme-chalk/display.css';
import VueRouter from 'vue-router'
import App from './AppRegister.vue'

import axios from 'axios'

import createRouter from './router_config/router.js'

import baseApi from '../../api/baseApi.js'


Vue.use(VueRouter)
Vue.use(ElementUI)


const router = createRouter()


axios.defaults.baseURL = baseApi.apiPrefix
Vue.prototype.$axios = axios


new Vue({
	el: '#register',
	router,
	render: (h) => {
		return h(App)
	}
})

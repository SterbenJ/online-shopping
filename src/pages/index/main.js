import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import App from './App.vue'

import axios from 'axios'

import createRouter from './router_config/router.js'

Vue.use(VueRouter)
Vue.use(Vuex)
Vue.use(ElementUI)


const router = createRouter()


axios.defaults.baseURL = '/api'
Vue.prototype.$axios = axios


new Vue({
	el: '#app',
	router,
	render: (h) => {
		return h(App)
	}
})

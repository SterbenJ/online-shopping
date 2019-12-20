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


Vue.use(Vuex)
Vue.use(VueRouter)
Vue.use(ElementUI)


const store = createStore()
const router = createRouter()


axios.defaults.baseURL = process.env.NODE_ENV === 'production' ? (baseApi.backgroundHost + baseApi.apiPrefix) : baseApi.apiPrefix
Vue.prototype.$axios = axios


new Vue({
	el: '#app',
	store,
	router,
	render: (h) => {
		return h(App)
	}
})

import Vuex from 'vuex'

import state from './state/state.js'
import mutations from './mutations/mutations.js'
import getters from './getters/getters.js'
import actions from './actions/actions.js'

const isDev = process.env.NODE_ENV === 'development'

export default () => {
	const store = new Vuex.Store({
		strict: isDev,
		state,
		mutations,
		getters,
		actions
	})
	if (module.hot) { // 热更新
		module.hot.accept([
			'./state/state',
			'./mutations/mutations',
			'./getters/getters',
			'./actions/actions'
		], () => {
			const newState = require('./state/state').default
			const newMutations = require('./mutations/mutations').default
			const newGetters = require('./getters/getters').default
			const newActions = require('./actions/actions').default

			store.hotUpdate({
				state: newState,
				mutations: newMutations,
				getters: newGetters,
				actions: newActions
			})
		})
	}
	return store
}

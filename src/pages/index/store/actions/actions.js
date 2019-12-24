export default {
	updateUserAsync (store, newUser) {
		store.commit('updateUser', newUser)
	}
}
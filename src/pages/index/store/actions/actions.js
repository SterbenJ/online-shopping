export default {
	// 异步更新用户信息
	updateUserAsync(store, newUser) {
		store.commit('updateUser', newUser)
	},
}

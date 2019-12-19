export default {
	// 是否登入
	loginState (state) {
		return state.user ? true : false
	},
	// 获得用户名称
	userNickname (state) {
		return state.user ? state.user.nickname : false
	}
}
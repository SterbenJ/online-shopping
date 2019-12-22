export default {
	// 是否登入
	loginState (state) {
		return state.user ? true : false
	},
	// 用户名称
	userNickname (state) {
		return state.user ? state.user.nickname : false
	},
	// 用户等级
	userLevel (state) {
		return state.user ? state.user.level : false
	},
	// 用户积分
	userPoint (state) {
		return state.user ? state.user.point : false
	}
}
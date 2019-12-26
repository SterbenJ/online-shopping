export default {
	// 是否登入
	loginState (state) {
		return state.user ? true : false
	},
	// 用户ID
	userID (state) {
		return state.user ? state.user.user_id : false
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
	},
	// 购物车数量
	userShoppingCartCount (state) {
		return state.user ? state.user.shopping_cart_count : false
	}
}
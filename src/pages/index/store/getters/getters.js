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
		if (state.shoppingCart) {
			return state.shoppingCart.length
		}
		return state.user ? state.user.shopping_cart_count : false
	},
	// 购物车列表
	shoppingCartList (state) {
		return state.shoppingCart ? state.shoppingCart : []
	},
	// 已经勾选的商品列表
	selectedShoppingCartList (state) {
		if (state.selectedShoppingCart) {
			return state.selectedShoppingCart.filter(item => {
				return shoppingCartList.findIndex(iitem => {
					item.item_id == iitem.itemid
				}) != -1
			})
		} else {
			return []
		}
	}
}
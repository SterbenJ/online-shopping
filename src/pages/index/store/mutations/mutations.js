export default {
	// 更新用户信息
	updateUser(state, newUser) {
		if (state.user) {
			if (newUser) {
				state.user = { ...(Object.assign(state.user, newUser))
				}
			} else {
				state.user = undefined
			}
		} else {
			state.user = { ...newUser}
		}
	},
	// 更新购物车信息
	updateShoppingCart(state, newShoppingCart) {
		if (newShoppingCart.length == 0 || !newShoppingCart) {
			state.shoppingCart = undefined
		} else {
			state.shoppingCart = newShoppingCart
		}
	},
	// 更新选择的购物车物品信息
	updateSelectedShoppingCart(state, newSelectedShoppingCart) {
		if (newSelectedShoppingCart.length == 0 || !newSelectedShoppingCart) {
			state.selectedShoppingCart = undefined
		} else {
			state.selectedShoppingCart = newSelectedShoppingCart
		}
	}
}

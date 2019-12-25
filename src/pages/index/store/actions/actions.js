export default {
	// 异步更新用户信息
	updateUserAsync(store, newUser) {
		store.commit('updateUser', newUser)
	},
	// 异步更新购物车信息
	updateShoppingCartAsync(store, newShoppingCart) {
		store.commit('updateShoppingCart', newShoppingCart)
	},
	// 异步更新已经选择了的购物车物品信息
	updateSelectedShoppingCartAsync(store, newSelectedShoppingCart) {
		store.commit('updateSelectedShoppingCart', newSelectedShoppingCart)
	}
}

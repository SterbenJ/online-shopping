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
}

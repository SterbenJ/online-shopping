export default {
	updateUserAsync (store, newUser) {
		// Todo: 异步更新用户信息
		let state = store.state
		console.log(state.user)
		if (state.user !== undefined){
			state.user = {...(Object.assign(state.user, newUser))}
		} else {
			state.user = {...newUser}
		}
	}
}
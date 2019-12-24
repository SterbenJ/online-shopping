export default {
	updateUser(state, newUser) {
		console.log(state.user)
		if (state.user){
			console.log('update user 1');
			if (newUser) {
				state.user = {...(Object.assign(state.user, newUser))}
			} else {
				state.user = undefined
			}
		} else {
			console.log('update user 2')
			state.user = {...newUser}
		}
	}
}

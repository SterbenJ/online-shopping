export default {
	updateUser(state, newUser) {
		console.log(state.user)
		if (state.user !== undefined){
			console.log('update user 1');
			state.user = {...(Object.assign(state.user, newUser))}
		} else {
			console.log('update user 2')
			state.user = {...newUser}
		}
	}
}

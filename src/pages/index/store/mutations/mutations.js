export default {
	updateUser(state, newUser) {
		console.log(newUser)
		state.user = {...newUser}
	}
}

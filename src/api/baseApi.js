
const forground = 'http://127.0.0.1' // change to yours host
const forgroundPort = '8000'

const background =  'http://127.0.0.1' // change to yours host
const backgroundPort = '8080'

export default {
	foregroundHost: forground + ':' + forgroundPort,
	backgroundHost: background + ':' + backgroundPort,
	apiPrefix: '/api'
}
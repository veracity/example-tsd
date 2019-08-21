module.exports = {
	clientSecret: process.env.CLIENT_SECRET,
	clientID: process.env.CLIENT_ID,
	apiKeys: {
		servicesApi: process.env.SERVICES_API_KEY
	},
	weatherApi: {
		username: process.env.WEATHER_API_USERNAME,
		password: process.env.WEATHER_API_PASSWORD
	},
	containerName: process.env.CONTAINER_NAME,
	hostUri: process.env.HOST_URI,
	sasKey: process.env.SAS_KEY,
	
}
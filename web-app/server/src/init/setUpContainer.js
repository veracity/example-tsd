const request = require("request-promise-native")
const promiseRouteHandler = require("../utils/promiseRouteHandler")
const notAuthMiddleware = require("../utils/notAuthMiddleware")
const azure = require("azure-storage")



module.exports = (app, authConfig) => {
	app.get("/_api/ships", notAuthMiddleware, promiseRouteHandler( async (req, res) => {
		const sharedBlobSvc = await azure.createBlobServiceWithSas(authConfig.hostUri, authConfig.sasKey)
		sharedBlobSvc.listBlobsSegmentedWithPrefix(authConfig.containerName, "ships/", null, (error, result) => {
			if(error) {
				res.send(error)
			} else {
				res.send(result.entries.map(entry => entry.name))
			}
		})
	}))

	app.get("/_api/ship", notAuthMiddleware, promiseRouteHandler( async (req, res) => {
		const sharedBlobSvc = await azure.createBlobServiceWithSas(authConfig.hostUri, authConfig.sasKey)
		sharedBlobSvc.getBlobToText(authConfig.containerName, `ships/${req.headers.shipname}`, (error, blobContent, blob) => {
			if(error) {
				res.send(error)
			} else {
				res.send(blobContent)
			}
		})
	}))

	app.get("/_api/locations", notAuthMiddleware, promiseRouteHandler( async (req, res) => {
		const sharedBlobSvc = await azure.createBlobServiceWithSas(authConfig.hostUri, authConfig.sasKey)
		sharedBlobSvc.getBlobToText(authConfig.containerName, "locations.json", (error, blobContent, blob) => {
			if(error) {
				res.send(error)
			} else {
				res.send(blobContent)
			}
		})
	}))

		// This endpoint will change later on when we have location data on MMSI for the ships.
	app.get("/_api/ship/predict", notAuthMiddleware, promiseRouteHandler( async (req, res) => {
		try {
			const date = new Date(Date.now() - 3600*1000*4).toISOString()
			const rounded_lat = Math.round(parseFloat(req.headers.lat) * 1000) / 1000
			const rounded_lng = Math.round(parseFloat(req.headers.lng) * 1000) / 1000
			const url = `https://api.meteomatics.com/${date}PT6H:PT1H/msl_pressure:hPa,precip_1h:mm,relative_humidity_2m:p,t_2m:C,wind_speed_10m:ms/${rounded_lat},${rounded_lng}/json`
			const response1 = await request({
				url,
				auth: {
					username: authConfig.weatherApi.username,
					password: authConfig.weatherApi.password
				}
			})
			const json = await JSON.parse(response1)
			const weatherDataAvg = json.data.map(param => param.coordinates[0].dates.reduce((a,b) => a + (b.value || 0), 0) / param.coordinates[0].dates.length)
			const weatherDataAvgRounded = weatherDataAvg.map(n => Math.round(n * 100) / 100) 
			const d = new Date(Date.now())
			const monthDay = d.getMonth() + "-" + d.getDay()
			const predictionClasses = [monthDay, rounded_lat, rounded_lng, ...weatherDataAvgRounded]
			const prediction = await request({
				method: "POST",
				url: "https://tsd-python.azurewebsites.net/_api/predict",
				body: (predictionClasses),
				json: true
			})
			const parsedWeather = {}
			json.data.forEach((param, i) => parsedWeather[param.parameter] = weatherDataAvgRounded[i])
			res.send({
				prediction: !!prediction[0],
				weather: parsedWeather,
				currentLocation: {
					lat: rounded_lat,
					lng: rounded_lng
				}
			})
		} catch(error) {
			res.status(error.statusCode).send(error.message)
		}
	}))
}


export const calculateCenterOfCoordinates = (points) => {
	if(points.length === 0) return null
	if(points.length === 1) return {
		lat: parseFloat(points[0].lat),
		lng: parseFloat(points[0].lng)
	}

	let x = 0
	let y = 0
	let z = 0

	points.forEach(point => {
		if (point) {
			const latitude = parseFloat(point.lat) * Math.PI / 180
			const longitude = parseFloat(point.lng) * Math.PI / 180
			x += Math.cos(latitude) * Math.cos(longitude)
			y += Math.sin(latitude) * Math.sin(longitude)
			z += Math.sin(latitude)
		}
	})


	const total = points.length

	x = x / total
	y = y / total
	z = z / total

	const centralLongitute = Math.atan(y, x)
	const centralSquareRoot = Math.sqrt( x * x + y * y)
	const centralLatitude = Math.atan2(z, centralSquareRoot)

	return {
		lat: centralLatitude * 180 / Math.PI,
		lng: centralLongitute * 180 / Math.PI
	}
} 
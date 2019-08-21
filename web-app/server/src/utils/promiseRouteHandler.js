
/**
 * A very simple wrapper that allows us to use async handlers in routes
 * Note that the handler is still responsible for returning results to the client.
 * This helper only handles errors gracefully
 * @param {*} action 
 */
module.exports = (action) => (req, res, next) => {
	const result = action(req, res, next)
	if (result.then) {
		result.catch(err => {
			next(err)
		})
	}
}
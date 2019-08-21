const devConfig = require("./dev.config")
const tokens = require("./prod.tokens")
// This uses all settings from the dev config and only modifies a few of them
const path = require("path")

module.exports = {
	...devConfig,
	auth: {
		...devConfig.auth,
		...tokens,
		redirectUrl: "https://tsd-app-prod.azurewebsites.net/signin-oidc",
	},
	server: {
		...devConfig.server,
		staticRoot: path.resolve(__dirname, "../client"),
		developerSSL: false
	}
}
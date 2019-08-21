const { MemoryStore } = require("express-session")
const { setupAuthFlowStrategy } = require("@veracity/node-auth/helpers")

module.exports = (app, config) => {
	const settings = {
		appOrRouter: app,
		loginPath: "/login",
		strategySettings: {
			clientId: config.clientID,
			clientSecret: config.clientSecret,
			replyUrl: "https://localhost:3000/signin-oidc",
		},
		sessionSettings: {
			secret: "66530082-b48b-41f1-abf5-0987eb156652",
			store: new MemoryStore()
		},
	}
	setupAuthFlowStrategy(settings)
}
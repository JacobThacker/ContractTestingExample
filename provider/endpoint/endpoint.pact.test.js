const { Verifier } = require('@pact-foundation/pact');
const controller = require('./endpoint.controller');
const endpoint = require('./endpoint');

// Setup provider server to verify
const app = require('express')();
const authMiddleware = require('../middleware/auth.middleware');
app.use(authMiddleware);
app.use(require('./endpoint.routes'));
const server = app.listen("8080");

describe("Pact Verification", () => {
    it("validates the expectations of EndpointService", () => {
        const opts = {
            logLevel: "INFO",
            providerBaseUrl: "http://localhost:8080",
            provider: "EndpointService",
            providerVersion: "1.0.0",
            pactBrokerUrl: process.env.PACT_BROKER_URL || "http://localhost:8000",
            pactBrokerUsername: process.env.PACT_BROKER_USERNAME || "user_name",
            pactBrokerPassword: process.env.PACT_BROKER_PASSWORD || "password",
            stateHandlers: {
                "endpoint exist": () => {
                    controller.repository.endpoint = new Map([
                        ["1234", new Endpoint("1234", "example")]
                    ]);
                },
            },
            requestFilter: (req, res, next) => {
                if (!req.headers["authorization"]) {
                    next();
                    return;
                }
                req.headers["authorization"] = `Bearer ${new Date().toISOString()}`;
                next();
            },
        };

        if (process.env.CI || process.env.PACT_PUBLISH_RESULTS) {
            Object.assign(opts, {
                publishVerificationResult: true,
            });
        }

        return new Verifier(opts).verifyProvider().then(output => {
            console.log(output);
        }).finally(() => {
            server.close();
        });
    })
});
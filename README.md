# Contract Testing Example

## Pact test example
I have created a basic api test using pact-docs.

Local Run: 

To get the consumer tests to run, from project root run `npm run test:pact --prefix consumer`, we can then see the
pact doc generated in the ./consumer/pacts dir and the output in the 
terminal should show `Test Suites: 1 passed, 1 total`.
We can then take the generated pact test and make a copy in the provider dir `./provider/pacts`, this will allow us to test the provider against the contract provided by the consumer test.

Using a Broker:

I have also implemented a broker service, to show how pact could be used in a tru ci/cd enviroment, to spin up the broker, run`docker-compose up`from the root dir (assuming you have docker installed), this will spin up the service on `http://localhost:8000/`, we could configure this to be hosted to where-ever we please, preferably in the cloud would be best.

to run tests using the broker we need to do the following:
1. start the broker service `docker-compose up`
2. publish our pacts to the broker `CI=true npm run test:pact --prefix consumer`
3. then verify our tests against the pacts now living in the broker `PACT_PUBLISH_RESULTS=true npm run test:pact --prefix consumer` to test the consumer or `PACT_PUBLISH_RESULTS=true npm run test:pact --prefix consumer` to test the provider
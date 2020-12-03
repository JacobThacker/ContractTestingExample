import path from "path";
import {Pact} from "@pact-foundation/pact";
import {API} from "./api";
import {eachLike, like} from "@pact-foundation/pact/dsl/matchers";

const provider = new Pact({
    consumer: 'FrontendWebsite',
    provider: 'EndpointService',
    log: path.resolve(process.cwd(), 'logs', 'pact.log'),
    logLevel: "warn",
    dir: path.resolve(process.cwd(), 'pacts'),
    spec: 2
});

describe("API Pact test", () => {


    beforeAll(() => provider.setup());
    afterEach(() => provider.verify());
    afterAll(() => provider.finalize());

    describe("testing pact example", () => {
        test("can call endpoint", async () => {

            // set up Pact interactions
            await provider.addInteraction({
                state: 'endpoint exist',
                uponReceiving: 'api request',
                withRequest: {
                    method: 'GET',
                    path: '/path',
                    headers: {
                        "Authorization": like("Bearer 2019-01-14T11:34:18.045Z")
                    }
                },
                willRespondWith: {
                    status: 200,
                    headers: {
                        'Content-Type': 'application/json; charset=utf-8'
                    },
                    body: eachLike({
                        id: "1234",
                        name: "example"
                    }),
                },
            });

            const api = new API(provider.mockService.baseUrl);

            // make request to Pact mock server
            const endpoint = await api.getResponse();

            expect(endpoint).toStrictEqual([
                {"id": "1234", "name": "example"}
            ]);
        });
    });
});
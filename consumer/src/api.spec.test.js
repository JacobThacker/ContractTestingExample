import API from "./api";
import nock from "nock";

describe("API", () => {

    test("getResponse", async () => {
        const apispec = [
            {
                "id": "1234",
                "name": "example"
            }
        ];
        nock(API.url)
            .get('/path')
            .reply(200,
                endpoint,
                {'Access-Control-Allow-Origin': '*'});
        const respEndpoint = await API.getResponse();
        expect(respEndpoint).toEqual(apispec);
    });
});

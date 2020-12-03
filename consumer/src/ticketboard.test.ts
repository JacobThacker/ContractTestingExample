import { getAssetIdFromService, CREATE_ORGANISATION } from './ticketBoardService';
import { setupApi } from './setup';

jest.mock('./setup.ts', () => {
    const mApolloClient = { query: jest.fn() };
    return { setupApi: jest.fn(() => mApolloClient) };
});

describe('Create Organisation', () => {
    it('should return a company', async () => {
        const client = setupApi();
        const mGraphQLResponse = { data: {}, loading: false, errors: [] };
        client.query.mockResolvedValueOnce(mGraphQLResponse);
        const { data, loading, errors } = await getAssetIdFromService('example','Pacific/Auckland');
        expect(client.query).toBeCalledWith({ 
            query: CREATE_ORGANISATION,
            status: 200,
            body:{
                "data": {
                    "createOrganisation": {
                        "id": "32e857fd-346c-46c9-bd63-b9ff71c9d110",
                        "name": "example",
                        "createdAt": "2020-09-14T11:09:47.299270Z",
                        "updatedAt": "2020-09-14T11:09:47.299275Z",
                        "boards": []
                    }
                },
                "extensions": null,
                "dataPresent": true
            },
        });
        expect(data).toEqual({});
        expect(loading).toBeFalsy();
        expect(errors).toEqual([]);
    });
});
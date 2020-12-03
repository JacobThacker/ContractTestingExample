import { setupApi } from './setup';
import { gql } from 'apollo-server';

const client = setupApi();

export const CREATE_ORGANISATION = gql`
              mutation createOrganisation($name: String!, $timezone: Timezone!) {
                createOrganisation(name: $name, timezone: $timezone) {
                    id
                    name
    
                    createdAt
                    updatedAt
    
                    boards {
                        name
                    }
                }
            }
`;

export const getAssetIdFromService = async (name: string,timezone:string) => {
    return await client.query({
        query: CREATE_ORGANISATION,
        status: 200,
        body: 
    {
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
};

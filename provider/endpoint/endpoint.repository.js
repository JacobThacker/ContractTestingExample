const Endpoint = require('./endpoint');

class EndpointRepository {

    constructor() {
        this.endpoint = new Map([
            ["1234", new Endpoint("1234", "example")],
        ]);
    }

    async fetchAll() {
        return [...this.endpoint.values()]
    }
}

module.exports = EndpointRepository;

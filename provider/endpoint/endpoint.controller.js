const EndpointRepository = require("./endpoint.repository");

const repository = new EndpointRepository();

exports.getAll = async (req, res) => {
    res.send(await repository.fetchAll())
};

exports.repository = repository;
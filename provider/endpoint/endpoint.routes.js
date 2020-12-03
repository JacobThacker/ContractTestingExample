const router = require('express').Router();
const controller = require('./endpoint.controller');

router.get("/path", controller.getAll);

module.exports = router;
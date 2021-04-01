const express = require('express');

// using the express router for the routes
const router = express.Router();

const usersApi = require('../../../controllers/api/v1/users_api');

router.post('/create-session', usersApi.createSession);

module.exports = router;
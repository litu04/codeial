const express = require('express');

// using the express router for the routes
const router = express.Router();
 const postsApi = require('../../../controllers/api/v1/post_api');

 router.get('/',postsApi.index);

 module.exports = router;
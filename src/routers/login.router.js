const router = require('express').Router();
const userController = require('../contorllers/user.controller');

router.post('/', userController.login);
module.exports = router;

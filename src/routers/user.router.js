const router = require('express').Router();
const userController = require('../contorllers/user.controller');
const loginAccess = require('../middlewares/reqValidations');

router.post('/', userController.createUser);
router.get('/', loginAccess.auth, userController.getAll);
router.get('/:id', loginAccess.auth, userController.getUserById);
router.delete('/me', loginAccess.auth, userController.deleteById);
module.exports = router;

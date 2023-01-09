const router = require('express').Router();
const categoryController = require('../contorllers/category.controller');
const loginAccess = require('../middlewares/reqValidations');

router.post('/', loginAccess.auth, categoryController.createCategory);
router.get('/', loginAccess.auth, categoryController.getAll);
module.exports = router;

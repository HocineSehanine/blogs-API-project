const router = require('express').Router();
const postController = require('../contorllers/post.constroller');
const loginAccess = require('../middlewares/reqValidations');
const postValidation = require('../middlewares/postValidation');

router.get('/', loginAccess.auth, postController.getAll);
router.get('/search', loginAccess.auth, postController.searchByTerm);
router.post('/', loginAccess.auth, postValidation.validPost, postController.newPost);
router.get('/:id', loginAccess.auth, postController.getById);
router.put('/:id', loginAccess.auth, postValidation.validUpdate, postController.updateById);
router.delete('/:id', loginAccess.auth, postController.deletePostById);

module.exports = router;

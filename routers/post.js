const express = require('express');
const rescue = require('express-rescue');
const authMiddleware = require('../middlewares/authMiddleware');
const postController = require('../controllers/postController');
const {
  titleAndContentValidation,
  categoryIdValidation,
  categoriesValidation,
  userValidation,
  postExistValidation,
} = require('../middlewares/postValidation');

const router = express.Router();

router.get('/post/search', authMiddleware, postController.getByQuery);
router.get('/post', authMiddleware, rescue(postController.getAll));
router.get('/post/:id', authMiddleware, rescue(postController.getById));

router.post('/post',
  authMiddleware,
  titleAndContentValidation,
  categoryIdValidation,
  rescue(postController.create));

router.put('/post/:id',
  authMiddleware,
  titleAndContentValidation,
  categoriesValidation,
  userValidation,
  rescue(postController.update));

router.delete('/post/:id',
  authMiddleware,
  postExistValidation,
  userValidation,
  rescue(postController.deleteById));

module.exports = router;
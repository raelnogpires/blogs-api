const express = require('express');
const rescue = require('express-rescue');
const authMiddleware = require('../middlewares/authMiddleware');
const postController = require('../controllers/postController');
const {
  titleAndContentValidation,
  categoryIdValidation,
  categoriesValidation,
  userValidation,
} = require('../middlewares/postValidation');

const router = express.Router();

router.get('/post', authMiddleware, rescue(postController.getAll));
router.get('/post/:id', authMiddleware, rescue(postController.getById));
router.put('/post/:id',
  authMiddleware,
  titleAndContentValidation,
  categoriesValidation,
  userValidation,
  rescue(postController.update));

router.post('/post',
  authMiddleware,
  titleAndContentValidation,
  categoryIdValidation,
  rescue(postController.create));

module.exports = router;
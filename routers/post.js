const express = require('express');
const rescue = require('express-rescue');
const authMiddleware = require('../middlewares/authMiddleware');
const postController = require('../controllers/postController');
const {
  titleAndContentValidation,
  categoryIdValidation,
} = require('../middlewares/postValidation');

const router = express.Router();

router.get('/post', authMiddleware, rescue(postController.getAll));
router.get('/post/:id', authMiddleware, rescue(postController.getById));
router.post('/post',
  authMiddleware,
  titleAndContentValidation,
  categoryIdValidation,
  rescue(postController.create));

module.exports = router;
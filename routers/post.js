const express = require('express');
const rescue = require('express-rescue');
const authMiddleware = require('../middlewares/authMiddleware');
const postController = require('../controllers/postController');
const {
  titleAndContentValidation,
  categoryIdValidation,
} = require('../middlewares/postValidation');

const router = express.Router();

router.post('/post',
  authMiddleware,
  titleAndContentValidation,
  categoryIdValidation,
  rescue(postController.create));

module.exports = router;
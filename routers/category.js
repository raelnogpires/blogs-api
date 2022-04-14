const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const categoryController = require('../controllers/categoryController');

const router = express.Router();

router.post('/categories', authMiddleware, categoryController.create);

module.exports = router;
const express = require('express');
const rescue = require('express-rescue');
const authMiddleware = require('../middlewares/authMiddleware');
const categoryController = require('../controllers/categoryController');

const router = express.Router();

router.post('/categories', authMiddleware, rescue(categoryController.create));
router.get('/categories', authMiddleware, rescue(categoryController.getAll));

module.exports = router;
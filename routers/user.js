const express = require('express');
const rescue = require('express-rescue');
const userController = require('../controllers/userController');
const registerValidation = require('../middlewares/registerValidation');
const loginValidation = require('../middlewares/loginValidation');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/user', registerValidation, rescue(userController.register));
router.post('/login', loginValidation, rescue(userController.login));

module.exports = router;
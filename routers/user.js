const { Router } = require('express');
const rescue = require('express-rescue');

const userController = require('../controllers/userController');

const registerValidation = require('../middlewares/registerValidation');
const loginValidation = require('../middlewares/loginValidation');
const authMiddleware = require('../middlewares/authMiddleware');

const router = Router();

router
  .post('/user', registerValidation, rescue(userController.register))
  .post('/login', loginValidation, rescue(userController.login))
  .get('/user', authMiddleware, rescue(userController.getAll))
  .get('/user/:id', authMiddleware, rescue(userController.getById))
  .delete('/user/me', authMiddleware, rescue(userController.deleteMe));

module.exports = router;

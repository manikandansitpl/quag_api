const express = require('express');
const { signUp, login, getUser } = require('../controllers/AuthController');
const Authentication = require('../middlewares/AuthMiddleWare');
const router = express.Router();

router.route('/signup').post(signUp)
router.route('/signin').post(login)
router.route('/getUser/:currentUserId').get(Authentication,getUser)

module.exports = router;
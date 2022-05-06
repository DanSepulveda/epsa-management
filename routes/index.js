const express = require('express')
const validateUser = require('../config/validateUser')
const userControllers = require('../controllers/userControllers')

const router = express.Router()

// USER CONTROLLERS
router.route('/signup')
    .post(userControllers.createUser)

router.route('/login')
    .post(userControllers.login)
    .get(validateUser, userControllers.verifyToken)

module.exports = router
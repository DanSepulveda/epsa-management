const express = require('express')
const userControllers = require('../controllers/userControllers')

const router = express.Router()

router.route('/sign')
    .post(userControllers.createUser)
    .get(userControllers.login)




module.exports = router
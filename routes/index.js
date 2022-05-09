const express = require('express')
const validateUser = require('../config/validateUser')
const userControllers = require('../controllers/userControllers')
const activitiesControllers = require('../controllers/activitiesControllers')

const router = express.Router()

// USER CONTROLLERS
router.route('/signup')
    .post(userControllers.createUser)

router.route('/login')
    .post(userControllers.login)
    .get(validateUser, userControllers.verifyToken)

// ACTIVITIES
router.route('/activities')
    .post(validateUser, activitiesControllers.createActivity)
    .get(validateUser, activitiesControllers.getActivities)

router.route('/activity/:id')
    .put(validateUser, activitiesControllers.editActivity)
    .delete(validateUser, activitiesControllers.deleteActivity)

module.exports = router
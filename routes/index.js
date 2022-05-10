const express = require('express')
const validateUser = require('../config/validateUser')
const userControllers = require('../controllers/userControllers')
const activitiesControllers = require('../controllers/activitiesControllers')
const recordsControllers = require('../controllers/recordsControllers')

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

// RECORDS
router.route('/records')
    .post(validateUser, recordsControllers.createRecord)
    .get(validateUser, recordsControllers.getRecords)

router.route('/record/:id')
    .put(validateUser, recordsControllers.editRecord)
    .delete(validateUser, recordsControllers.deleteRecord)

module.exports = router
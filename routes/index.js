const express = require('express')
const validateUser = require('../config/validateUser')
const userControllers = require('../controllers/userControllers')
const activitiesControllers = require('../controllers/activitiesControllers')
const recordsControllers = require('../controllers/recordsControllers')
const reportsControllers = require('../controllers/reportsControllers')

const router = express.Router()

// USER CONTROLLERS
router.route('/signup')
    .get(validateUser, userControllers.createUser)

router.route('/login')
    .get(validateUser, userControllers.login)

// ACTIVITIES
router.route('/activities')
    .post(validateUser, activitiesControllers.createActivity)
    .get(validateUser, activitiesControllers.getActivities)

router.route('/activity/:id')
    .put(validateUser, activitiesControllers.editActivity)
    .delete(validateUser, activitiesControllers.deleteActivity)

// RECORDS
router.route('/records')
    .post(recordsControllers.createRecord)
    .get(recordsControllers.getRecords)

router.route('/record/:id')
    .put(recordsControllers.editRecord)
    .delete(recordsControllers.deleteRecord)

// REPORTS

router.route('/monthly-report')
    .post(reportsControllers.monthlyReport)

module.exports = router
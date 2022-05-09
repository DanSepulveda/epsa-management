const Activity = require('../models/Activity')

const activitiesControllers = {
    createActivity: async (req, res) => {
        try {
            if (!req.currentUser) throw new Error('Access denied')
            const user_id = req.currentUser._id
            const { name, template } = req.body
            const newActivity = new Activity({
                name,
                template,
                user_id
            })
            await newActivity.save()
            res.status(200).json({ success: true, response: newActivity })
        } catch (error) {
            res.json({ success: false, response: error.message })
        }
    },
    getActivities: async (req, res) => {
        try {
            if (!req.currentUser) throw new Error('Access denied')
            const activities = await Activity.find({ user_id: req.currentUser._id })
            res.status(200).json({ success: true, response: activities })
        } catch (error) {
            res.json({ success: false, response: error.message })
        }
    },
    editActivity: async (req, res) => {
        try {
            if (!req.currentUser) throw new Error('Access denied')
            const edited = await Activity.findOneAndUpdate(
                { _id: req.params.id, user_id: req.currentUser._id },
                { ...req.body },
                { new: true }
            )
            if (!edited) throw new Error('Access denied')
            res.status(200).json({ success: true, response: edited })
        } catch (error) {
            res.json({ success: false, response: error.message })
        }
    },
    deleteActivity: async (req, res) => {
        try {
            if (!req.currentUser) throw new Error('Access denied')
            const removed = await Activity.findOneAndDelete(
                { _id: req.params.id, user_id: req.currentUser._id }
            )
            if (!removed) throw new Error('Access denied')
            res.status(200).json({ success: true, response: null })
        } catch (error) {
            res.json({ success: false, response: req.params.id })
        }
    }
}

module.exports = activitiesControllers
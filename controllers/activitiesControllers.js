const Activity = require('../models/Activity')

const activitiesControllers = {
    createActivity: async (req, res) => {
        const user_id = req.currentUser._id
        try {
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
            const activities = await Activity.find({ user_id: req.currentUser._id })
            res.status(200).json({ success: true, response: activities })
        } catch (error) {
            res.json({ success: false, response: error.message })
        }
    },
    editActivity: async (req, res) => {
        try {
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
            const removed = await Activity.findOneAndDelete(
                { _id: req.params.id, user_id: req.currentUser._id }
            )
            if (!removed) throw new Error('Access denied')
            res.status(200).json({ success: true, response: null })
        } catch (error) {
            res.json({ success: false, response: error.message })
        }
    }
}

module.exports = activitiesControllers
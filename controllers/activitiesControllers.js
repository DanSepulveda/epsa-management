const Activity = require('../models/Activity')

const activitiesControllers = {
    createActivity: async (req, res) => {
        const user_id = req.id
        try {
            if (!user_id) throw new Error('Access denied')
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
        const uid = req.uid
        const id = req.id
        try {
            if (!uid) throw new Error('Access denied')
            const activities = await Activity.find({ user_id: id })
            res.status(200).json({ success: true, response: activities })
        } catch (error) {
            res.json({ success: false, response: error.message })
        }
    },
    editActivity: async (req, res) => {
        const user_id = req.id
        try {
            if (!user_id) throw new Error('Access denied')
            const edited = await Activity.findOneAndUpdate(
                { _id: req.params.id, user_id },
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
        const user_id = req.id
        try {
            if (!user_id) throw new Error('Access denied')
            const removed = await Activity.findOneAndDelete(
                { _id: req.params.id, user_id }
            )
            if (!removed) throw new Error('Access denied')
            res.status(200).json({ success: true, response: req.params.id })
        } catch (error) {
            res.json({ success: false, response: null })
        }
    }
}

module.exports = activitiesControllers
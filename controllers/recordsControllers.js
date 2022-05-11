const Record = require('../models/Record')

const recordsControllers = {
    createRecord: async (req, res) => {
        try {
            if (!req.currentUser) throw new Error('Access denied')
            const user_id = req.currentUser._id
            const { date, activity, description } = req.body
            const newRecord = new Record({
                date,
                activity,
                description,
                user_id
            })
            await newRecord.save()
            res.status(200).json({ success: true, response: newRecord })
        } catch (error) {
            res.json({ success: false, response: error.message })
        }
    },
    getRecords: async (req, res) => {
        try {
            if (!req.currentUser) throw new Error('Access denied')
            const records = await Record.find({ user_id: req.currentUser._id }).sort({ date: -1 })
            res.status(200).json({ success: true, response: records })
        } catch (error) {
            res.json({ success: false, response: error.message })
        }
    },
    editRecord: async (req, res) => {
        try {
            if (!req.currentUser) throw new Error('Access denied')
            const edited = await Record.findOneAndUpdate(
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
    deleteRecord: async (req, res) => {
        try {
            if (!req.currentUser) throw new Error('Access denied')
            const removed = await Record.findOneAndDelete(
                { _id: req.params.id, user_id: req.currentUser._id }
            )
            if (!removed) throw new Error('Access denied')
            res.status(200).json({ success: true, response: req.params.id })
        } catch (error) {
            res.json({ success: false, response: error.message })
        }
    }
}

module.exports = recordsControllers
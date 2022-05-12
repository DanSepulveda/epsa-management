const User = require('../models/User')

const userControllers = {
    createUser: async (req, res) => {
        try {
            const { email, uid } = req
            if (!uid) throw new Error('Access denied')
            const newUser = new User({ email, uid })
            await newUser.save()
            return res.status(200).json({ success: true, response: newUser })
        } catch (error) {
            return res.json({ success: false, response: error.message })
        }
    },
    login: async (req, res) => {
        try {
            if (!req.uid) throw new Error('Access denied')
            const mongo_user = await User.findOne({ uid: req.uid })
            return res.status(200).json({ success: true, response: mongo_user })
        } catch (error) {
            return res.json({ success: false, response: error.message })
        }
    }
}

module.exports = userControllers
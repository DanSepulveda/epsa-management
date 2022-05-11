const User = require('../models/User')

const userControllers = {
    createUser: async (req, res) => {
        const { email, uid } = req.body
        try {
            const newUser = new User({ email, uid })
            await newUser.save()
            return res.status(200).json({ success: true, response: { email, uid, _id: newUser._id } })
        } catch (error) {
            return res.json({ success: false, response: error.message })
        }
    },
    login: async (req, res) => {
        const { uid } = req.body
        try {
            const mongo_user = await User.findOne({ uid })
            return res.status(200).json({ success: true, response: mongo_user })
        } catch (error) {
            return res.json({ success: false, response: error.message })
        }
    }
}

module.exports = userControllers
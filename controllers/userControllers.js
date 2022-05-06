const { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } = require('firebase/auth')
const app = require('../config/firebase')
const User = require('../models/User')

const auth = getAuth(app);

const userControllers = {
    createUser: async (req, res) => {
        const { email, password } = req.body
        try {
            const fb_user = await createUserWithEmailAndPassword(auth, email, password)
            const newUser = new User({ email, uid: fb_user.user.uid })
            await newUser.save()
            return res.status(200).json({ success: true, response: { email, _id: newUser._id }, message: null })
        } catch (error) {
            return res.json({ success: false, response: null, message: error })
        }
    },
    login: async (req, res) => {
        const { email, password } = req.body
        try {
            const fb_user = await signInWithEmailAndPassword(auth, email, password)
            const uid = fb_user.user.uid
            const mongo_user = await User.findOne({ uid })
            return res.status(200).json({ success: true, response: { email, _id: mongo_user._id }, message: null })
        } catch (error) {
            return res.json({ success: false, response: null, message: error })
        }
    },
    verifyToken: async (req, res) => {
        if (req.currentUser) {
            const { email, _id } = req.currentUser
            // const { uid, reloadUserInfo } = user
            return res.status(200).json({ success: true, response: { email, _id }, message: null })
        } else {
            return res.json({ success: false, response: null, message: 'error' })
        }
    }
}

module.exports = userControllers
const app = require('./firebase')
const { getAuth } = require('firebase/auth')
const User = require('../models/User')

const auth = getAuth(app)

module.exports = validateUser = async (req, res, next) => {
    const fb_user = auth.currentUser
    if (fb_user) {
        const mongo_user = await User.findOne({ uid: fb_user.uid })
        req['currentUser'] = { email: mongo_user.email, _id: mongo_user._id }
    } else {
        req['currentUser'] = null
    }
    next()
}

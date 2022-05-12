const admin = require('./firebase')

module.exports = validateUser = async (req, res, next) => {
    try {
        if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
            req.authToken = req.headers.authorization.split(' ')[1];
        } else {
            req.authToken = null;
        }

        const { authToken } = req
        const response = await admin.auth().verifyIdToken(authToken)
        req.uid = response.uid
        req.email = response.email
        next()
    } catch (error) {
        res.json({ success: false, response: 'Access denied' })
    }
}
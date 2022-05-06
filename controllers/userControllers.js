const { getAuth, createUserWithEmailAndPassword, signInWithCustomToken, } = require('firebase/auth')
const app = require('../config/firebase')
const User = require('../models/User')

const auth = getAuth(app);

const userControllers = {
    createUser: async (req, res) => {
        const { email, password } = req.body
        try {
            const fb_user = await createUserWithEmailAndPassword(auth, email, password)
            // const newUser = new User({ email, password })
            // await newUser.save()
            res.status(200).json({ success: true, response: fb_user })
        } catch (error) {
            res.json({ success: false, response: error })
        }

        //     .then((userCredential) => {
        //     // Signed in
        //     const user = userCredential.user;
        //     // ...
        // })
        // .catch((error) => {
        //     const errorCode = error.code;
        //     const errorMessage = error.message;
        //     // ..
        // });
    },
    login: async (req, res) => {
        const lala = auth.currentUser
        console.log(lala)
        // try {

        //     const token = req.headers.authorization
        //     console.log(token)
        //     const response = await signInWithCustomToken(auth, token)
        // } catch (e) {
        //     res.json({ success: false, response: e })

        // }
    }
}

module.exports = userControllers
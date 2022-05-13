const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    fullname: { type: String },
    username: { type: String },
    position: { type: String },
    signature: { type: String },
    email: { type: String, required: true },
    uid: { type: String, required: true }
})

const User = mongoose.model('user', userSchema)

module.exports = User
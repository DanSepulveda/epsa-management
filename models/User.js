const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    firsNname: { type: String },
    lastName: { type: String },
    email: { type: String, required: true },
    uid: { type: String, required: true }
})

const User = mongoose.model('user', userSchema)

module.exports = User
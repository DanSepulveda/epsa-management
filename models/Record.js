const mongoose = require('mongoose')

const recordSchema = new mongoose.Schema({
    date: { type: Date, required: true },
    activity: { type: String, required: true },
    description: { type: String, required: true },
    user_id: { type: mongoose.Types.ObjectId, ref: 'user', required: true }
})

const Record = mongoose.model('record', recordSchema)

module.exports = Record
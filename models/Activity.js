const mongoose = require('mongoose')

const activitySchema = new mongoose.Schema({
    name: { type: String, required: true },
    template: { type: String, required: true },
    user_id: { type: mongoose.Types.ObjectId, ref: 'user', required: true }
})

const Activity = mongoose.model('activity', activitySchema)

module.exports = Activity
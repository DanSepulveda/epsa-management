const mongoose = require('mongoose')

const themeSchema = new mongoose.Schema({
    buttons: {
        delete: String,
        edit: String
    },
    common: {
        transition: String
    }
})

const Theme = mongoose.model('theme', themeSchema)

module.exports = Theme
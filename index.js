// const functions = require("firebase-functions");
const express = require('express')
const cors = require('cors')
require('dotenv').config()
require('./config/database')
require('./config/firebase')
// require("./config/passport")
const router = require('./routes/index')

const app = express()

app.use(cors())
app.use(express.json())
app.use('/api', router)
app.listen(4000, () => console.log('Server running on port 4000'))

// exports.app = functions.https.onRequest(app)
// var { initializeApp } = require('firebase-admin/app')
const admin = require('firebase-admin')
var serviceAccount = require("../panel-epsa-firebase-adminsdk-xb4bk-73e14de9e4.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
})




// const app = initializeApp({
//     apiKey: "AIzaSyD-5WSAX5KYhJCKEwMhV7sgN32MUAEcJcA",
//     authDomain: "panel-epsa.firebaseapp.com",
//     projectId: "panel-epsa",
//     storageBucket: "panel-epsa.appspot.com",
//     messagingSenderId: "641907791894",
//     appId: "1:641907791894:web:4d7eec4263f4f563c6bd37"
// });

// const firebaseConfig = {
//     apiKey: process.env.FB_APIKEY,
//     authDomain: process.env.FB_AUTH_DOMAIN,
//     projectId: process.env.FB_PROJECT_ID,
//     storageBucket: process.env.FB_STORAGE_BUCKET,
//     messagingSenderId: process.env.FB_MESSAGING_SENDER_ID,
//     appId: process.env.FB_APP_ID
// };

// const app = initializeApp(firebaseConfig)

module.exports = admin
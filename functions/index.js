const functions = require('firebase-functions');
const firebase = require('firebase');
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

var config = {
    apiKey: "AIzaSyB4WsRTYAg27pPz_Hdf-pLcaZPR-IxlHB0",
    authDomain: "educhange-nwhacks.firebaseapp.com",
    databaseURL: "https://educhange-nwhacks.firebaseio.com",
    projectId: "educhange-nwhacks",
    storageBucket: "educhange-nwhacks.appspot.com",
    messagingSenderId: "654557831315"
};

firebase.initializeApp(config);

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
   res.sendFile(__dirname + '/mainview.html');
});

exports.app = functions.https.onRequest(app);
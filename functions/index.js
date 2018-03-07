const functions = require('firebase-functions');
const firebase = require('firebase');
const express = require('express');
const bodyParser = require('body-parser');
const engines = require('consolidate');
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
app.engine('hbs', engines.handlebars);
app.set('views', './views');
app.set('view engine', 'hbs');

app.get('/', (req, res) => {
   res.render('index');
});

app.get('/signup', (req, res) => {
    res.render('signup');
})

exports.app = functions.https.onRequest(app);

const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
const bodyParser = require('body-parser');
const engines = require('consolidate');
const morgan = require('morgan');
var template = require('./template');

var headerContents = template.headerContents;
var loginForm = template.loginForm;
var logoutForm = template.logoutForm;

admin.initializeApp({
    credential: admin.credential.cert('./educhange-428416896088.json'),
    databaseURL: 'https://educhange-nwhacks.firebaseio.com'
});

var sessionRef= admin.database().ref("/sessions");
const app = express();
const PORT = 5000;

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));

app.engine('hbs', engines.handlebars);
app.set('views', './views');
app.set('view engine', 'hbs');

var userCheck = (req, res, next) => {
    admin.auth().verifyIdToken(req.body.user_token).then(
        function(decodedToken) {
            next();
        }).catch(function(error) {
        console.log(error);
    });
}

app.get('/', (req, res, next) => {
    res.render('index', {"headerContents": headerContents, "loginForm": loginForm, "logoutForm" : logoutForm});
});

app.get('/dashboard', (req, res, next) => {
    res.render('dashboard');
});

app.get('/session', (req, res, next) => { 
    res.render('session', {"headerContents": headerContents, "logoutForm" : logoutForm});
});

app.get('/session/:sessionId', (req, res, next) => {
    let sessionId = req.params.sessionId;
    admin.database().ref('/sessions/' + sessionId).once('value').then(function(snap) {
        var snapshot = snap.val();
        console.log(snapshot.session_name);
        res.render('session_id', {"session_name" : snapshot.session_name, "host" : snapshot.user_email, "logoutForm": logoutForm, "headerContents": headerContents})
    }).catch(function(error) {
        console.log(error);
    });
});

app.post('/session-form', userCheck, (req, res, next) => {
    var obj = {
        session_name: req.body.session_name,
        user_email: req.body.user_email
    }
    sessionRef.push(obj);
    res.redirect('/session');
});

app.get('/session-form', (req, res, next) => {
    res.render('session_form', {"headerContents": headerContents, "logoutForm": logoutForm});
});

app.get('/signup', (req, res, next) => {
    res.render('signup', {"headerContents": headerContents, "loginForm": loginForm});
})

exports.app = functions.https.onRequest(app);

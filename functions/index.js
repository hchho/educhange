const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
const bodyParser = require('body-parser');
const engines = require('consolidate');
const morgan = require('morgan');

var serviceAccount = require('../educhange-428416896088.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://educhange-nwhacks.firebaseio.com'
});

var sessionRef= admin.database().ref("/sessions");
const app = express();
const PORT = 5000;

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));


if (app.get('env') === 'production') {
    app.set('trust proxy', 1) // trust first proxy
    sess.cookie.secure = true // serve secure cookies
}

var sessionObjs;

app.engine('hbs', engines.handlebars);
app.set('views', './views');
app.set('view engine', 'hbs');

app.get('/', (req, res, next) => {
    res.render('index');
});

app.get('/dashboard', (req, res, next) => {
    //    var currUser = firebase.auth().currentUser;
    //    res.render('dashboard', {"email" : currUser.email, "uid" : currUser.uid});
    //    res.send('success!');
    res.render('dashboard');
});

app.get('/session', (req, res, next) => { 
        sessionRef.orderByChild('uid').equalTo(currUser.uid).limitToLast(3).on('value', function(snap) {
            sessionObjs = snap.val();
        });
    res.render('session', {"sessions": sessionObjs});
});

app.post('/session-form', (req, res, next) => {
    var obj = {
        session_name: req.body.session_name,
        uid: req.body.user_token
    }
    console.log(obj);
    sessionRef.push(obj);
    res.redirect('/session');
});

app.get('/session-form', (req, res, next) => {
    res.render('session_form');
});

exports.app = functions.https.onRequest(app);

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
    res.render('index');
});

app.get('/dashboard', (req, res, next) => {
    //    var currUser = firebase.auth().currentUser;
    //    res.render('dashboard', {"email" : currUser.email, "uid" : currUser.uid});
    //    res.send('success!');
    res.render('dashboard');
});

app.post('/session', userCheck, (req, res, next) => {
   let userToken = req.body.user_token; 
    
    sessionRef.orderByChild('uid').equalTo(userToken).limitToLast(2).on('value', function(snap) {
        console.log(snap.val());
            res.render('session', {"sessions": snap.val()});
        });
})

app.get('/session', (req, res, next) => { 
    res.render('session');
});

app.post('/session-form', userCheck, (req, res, next) => {
    var obj = {
        session_name: req.body.session_name,
        uid: req.body.user_token
    }
    sessionRef.push(obj);
    res.redirect('/session');
});

app.get('/session-form', (req, res, next) => {
    res.render('session_form');
});

exports.app = functions.https.onRequest(app);

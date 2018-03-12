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

const app = express();
const PORT = 5000;

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));


if (app.get('env') === 'production') {
    app.set('trust proxy', 1) // trust first proxy
    sess.cookie.secure = true // serve secure cookies
}

var sessionObjs;

var sessionChecker = (req, res, next) => {
    
}

app.engine('hbs', engines.handlebars);
app.set('views', './views');
app.set('view engine', 'hbs');

app.post('/', sessionChecker, (req, res, next) => {
    next();
});

app.get('/', sessionChecker, (req, res, next) => {
    //    var currUser = admin.auth().currentUser;
    //    res.render('index', {"email" : currUser.email});
    res.render('index');
});



app.get('/signup', (req, res, next) => {
    res.render('signup');
});

app.post('/signup', (req, res, next) => {

});

app.get('/login', (req, res, next) => {
    res.render('login'); 
});

app.post('/login', (req, res, next) => {
    admin.auth().verifyIdToken(req.body.token)
        .then(function(decodedToken) {
        var uid = decodedToken.uid;
        console.log(uid);
        res.status(200).send(uid);
    }).catch(function(error) {
        res.redirect('/login');
    });
});

app.get('/dashboard', (req, res, next) => {
    //    var currUser = firebase.auth().currentUser;
    //    res.render('dashboard', {"email" : currUser.email, "uid" : currUser.uid});
    //    res.send('success!');
    res.render('dashboard');
});

app.get('/session', (req, res, next) => { 
    //    sessionRef.orderByChild('owner').equalTo(currUser.uid).limitToLast(3).on('value', function(snap) {
    //        sessionObjs = snap.val();
    //    });
    res.render('session', {"sessions": sessionObjs});
});

app.post('/session', (req, res, next) => {
    var obj = {
        session_name: req.body.session_name,
        //        owner: currUser.uid
    }
    //    sessionRef.push(obj);
    res.redirect('/session');
});

exports.app = functions.https.onRequest(app);

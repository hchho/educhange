const functions = require('firebase-functions');
const firebase = require('firebase');
const admin = require('firebase-admin');
const express = require('express');
const bodyParser = require('body-parser');
const engines = require('consolidate');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');

var serviceAccount = require('../educhange-428416896088.json');

var config = {
    apiKey: "AIzaSyB4WsRTYAg27pPz_Hdf-pLcaZPR-IxlHB0",
    authDomain: "educhange-nwhacks.firebaseapp.com",
    databaseURL: "https://educhange-nwhacks.firebaseio.com",
    projectId: "educhange-nwhacks",
    storageBucket: "educhange-nwhacks.appspot.com",
    messagingSenderId: "654557831315"
};

firebase.initializeApp(config);

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://educhange-nwhacks.firebaseio.com'
});

const database = firebase.database();
const app = express();
const PORT = 5000;
var sessionRef = database.ref('sessions');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

var sess = {
    key: 'user_sid',
    secret: "damn-secretive",
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false,
        expires: 600000
    }
}

if (app.get('env') === 'production') {
    app.set('trust proxy', 1) // trust first proxy
    sess.cookie.secure = true // serve secure cookies
}

var sessionObjs;

var sessionChecker = (req, res, next) => {
    if(firebase.auth().currentUser) {
        firebase.auth().currentUser.getIdToken(true)
            .then(function(idToken) {
            next();
        }).catch(function(err) {
            console.log(err);
        });
    } else {
        res.redirect('/login');
    }
}

app.use(session(sess));

app.engine('hbs', engines.handlebars);
app.set('views', './views');
app.set('view engine', 'hbs');

app.get('/', sessionChecker, (req, res, next) => {
    var currUser = firebase.auth().currentUser;
    res.render('index', {"email" : currUser.email});
});

app.get('/signup', (req, res, next) => {
    res.render('signup');
});

app.post('/signup', (req, res, next) => {
    firebase.auth().createUserWithEmailAndPassword(req.body.email, req.body.password).then((user) => {
        user.sendEmailVerification().then(function() {
            console.log('Email sent');
        }, function(error) {
            console.log('Email not sent');
        });
        res.redirect('/dashboard');
    })
        .catch((err) => {
        res.send(err);
    });
});

app.get('/login', (req, res, next) => {
    res.render('login'); 
});

app.post('/login', (req, res, next) => {
    firebase.auth().signInWithEmailAndPassword(req.body.email, req.body.password).then((user) => {
        res.redirect('/dashboard');
    })
        .catch((err) => {
        res.send(err);
    });

});

app.get('/dashboard', sessionChecker, (req, res, next) => {
    var currUser = firebase.auth().currentUser;
    res.render('dashboard', {"email" : currUser.email, "uid" : currUser.uid});
});

app.get('/session', sessionChecker, (req, res, next) => { 
    sessionRef.orderByChild('owner').equalTo(currUser.uid).limitToLast(3).on('value', function(snap) {
        sessionObjs = snap.val();
    });
    res.render('session', {"sessions": sessionObjs});
});

app.post('/session', sessionChecker, (req, res, next) => {

    var obj = {
        session_name: req.body.session_name,
        owner: currUser.uid
    }
    sessionRef.push(obj);
    res.redirect('/session');
});

exports.app = functions.https.onRequest(app);

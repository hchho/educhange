const functions = require('firebase-functions');
const firebase = require('firebase');
const express = require('express');
const bodyParser = require('body-parser');
const engines = require('consolidate');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');

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
app.use(cookieParser());

var sess = {
    secret: "damn-secretive",
    resave: false,
    saveUninitialized: true,
    cookie: {secure: false}
}


if (app.get('env') === 'production') {
    app.set('trust proxy', 1) // trust first proxy
    sess.cookie.secure = true // serve secure cookies
}

var currUser;

var sessionChecker = (req, res, next) => {
    if(!currUser) {
        res.redirect('/login');
    } else {
        next();
    }
}

var setUser = (user) => {
    currUser = user;
}

app.use(session(sess));

app.engine('hbs', engines.handlebars);
app.set('views', './views');
app.set('view engine', 'hbs');

app.get('/', sessionChecker, (req, res, next) => {
    res.render('index', {"email" : currUser.email});
});

app.get('/signup', (req, res, next) => {
    res.render('signup');
});

app.post('/signup', (req, res, next) => {
    firebase.auth().createUserWithEmailAndPassword(req.body.email, req.body.password).then((user) => {
        setUser(user);
        currUser.sendEmailVerification().then(function() {
            console.log('Email sent');
        }, function(error) {
            console.log('Email not sent');
        });
        res.redirect('/');
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
        setUser(user);
        res.redirect('/dashboard');
    })
        .catch((err) => {
        res.send(err);
    });
});

app.get('/dashboard', sessionChecker, (req, res, next) => {
    res.render('dashboard', {"email" : currUser.email, "uid" : currUser.uid});
});

exports.app = functions.https.onRequest(app);

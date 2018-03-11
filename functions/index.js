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

//const database = firebase.database();
const app = express();
const PORT = 5000;
//var sessionRef = database.ref('sessions');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));


if (app.get('env') === 'production') {
    app.set('trust proxy', 1) // trust first proxy
    sess.cookie.secure = true // serve secure cookies
}

var sessionObjs;

//var sessionChecker = (req, res, next) => {
//    if(firebase.auth().currentUser) {
//        firebase.auth().currentUser.getIdToken(true)
//            .then(function(idToken) {
//            next();
//        }).catch(function(err) {
//            console.log(err);
//        });
//    } else {
//        res.redirect('/login');
//    }
//}

//app.use(session(sess));

app.engine('hbs', engines.handlebars);
app.set('views', './views');
app.set('view engine', 'hbs');

app.get('/', (req, res, next) => {
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
    

});

app.get('/dashboard', (req, res, next) => {
//    var currUser = firebase.auth().currentUser;
//    res.render('dashboard', {"email" : currUser.email, "uid" : currUser.uid});
    res.send('success!');
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

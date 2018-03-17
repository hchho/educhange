const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
const bodyParser = require('body-parser');
const engines = require('consolidate');
const morgan = require('morgan');

admin.initializeApp({
    credential: admin.credential.cert('./educhange-428416896088.json'),
    databaseURL: 'https://educhange-nwhacks.firebaseio.com'
});

var sessionRef= admin.database().ref("/sessions");
const app = express();
const PORT = 5000;

var headerContents = 
    '<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">' + 
    '<meta name="viewport" content="width=device-width, initial-scale=1.0">' + 
    '<script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>' + '<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>' + '<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>' + 
    '<script src="https://www.gstatic.com/firebasejs/4.11.0/firebase.js"></script>'

var logoutForm = '<div id="logout-form">' + 
    '<button class="btn-primary" id="logout" type="submit" >Logout</button>' + 
    '<a href="/session-form">Create session</a>' + 
    '<a href="/session">Manage sessions</a>' + 
    '</div>'

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
    res.render('index', {"headerContents": headerContents, "logoutForm" : logoutForm});
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

exports.app = functions.https.onRequest(app);

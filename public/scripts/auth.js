var config = {
    apiKey: "AIzaSyB4WsRTYAg27pPz_Hdf-pLcaZPR-IxlHB0",
    authDomain: "educhange-nwhacks.firebaseapp.com",
    databaseURL: "https://educhange-nwhacks.firebaseio.com",
    projectId: "educhange-nwhacks",
    storageBucket: "educhange-nwhacks.appspot.com",
    messagingSenderId: "654557831315"
};

firebase.initializeApp(config);

function App() {
    var xhr = new XMLHttpRequest();
    var loginButton = document.getElementById('login');
    var emailInput = document.getElementById('email');
    var passwordInput = document.getElementById('password');
    loginButton.addEventListener('click', this.signIn.bind(this));

    this.initFirebase();
    console.log('App is starting');
}

App.prototype.initFirebase = function() {
    firebase.auth().onAuthStateChanged(this.onAuthStateChanged.bind(this));
}

App.prototype.onAuthStateChanged = function (user) {
        console.log('Getting user status');
        if (user){
            console.log(user);
        } else {
            console.log('no user');
        }
}

//    firebase.auth().createUserWithEmailAndPassword(req.body.email, req.body.password).then((user) => {
//        user.sendEmailVerification().then(function() {
//            console.log('Email sent');
//        }, function(error) {
//            console.log('Email not sent');
//        });
//        res.redirect('/dashboard');
//    })
//        .catch((err) => {
//        res.send(err);
//    });

App.prototype.signIn = function() {
    emailInput = document.getElementById('email');
    passwordInput = document.getElementById('password');
    firebase.auth().signInWithEmailAndPassword(emailInput.value, passwordInput.value).then(function(user) {
//        console.log(user);
    }).catch(function(error) {
        console.log(error);
    });
};

window.onload = function() {
    window.app = new App();
}
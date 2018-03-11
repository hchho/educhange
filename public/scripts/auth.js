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
    var email = document.getElementById('email');
    var password = document.getElementById('password');
    loginButton.addEventListener('click', this.signIn.bind(this));
    
    this.initFirebase();
}

App.prototype.initFirebase = function() {
    firebase.auth().onAuthStateChanged(this.onAuthStateChanged.bind(this));
}

App.prototype.onAuthStateChanged = function () {
    firebase.auth().onAuthStateChanged(function(user){
        if (!user){
            window.location.replace("/dashboard");
        } else {
            console.log('asdf');
            window.location.replace('/dashboard');
        }});
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
    firebase.auth().signInWithEmailAndPassword(this.email.value(), this.password.value());
    console.log("asdf");
};

window.onload = function() {
    window.app = new App();
}
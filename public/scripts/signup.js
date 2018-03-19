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
    this.loginForm = document.getElementById('login-form');
    this.loginButton = document.getElementById('login');
    this.signUpButton = document.getElementById('signup');

    this.signUpButton.addEventListener('click', this.signUp.bind(this));
    this.loginButton.addEventListener('click', this.signIn.bind(this));

    this.initFirebase();
}

App.prototype.initFirebase = function() {
    firebase.auth().onAuthStateChanged(this.onAuthStateChanged.bind(this));
}

App.prototype.signUp = function() {
    let emailInput = document.getElementById('signup-email');
    let passwordInput = document.getElementById('signup-password');
    console.log(emailInput.value);
    firebase.auth().createUserWithEmailAndPassword(emailInput.value, passwordInput.value).catch(function(error) {
        alert(error.message);
    });
}

App.prototype.signIn = function() {
    emailInput = document.getElementById('email');
    passwordInput = document.getElementById('password');
    firebase.auth().signInWithEmailAndPassword(emailInput.value, passwordInput.value).then(function(user) {
        alert("Welcome, " + user.email);
    }).catch(function(error) {
        console.log(error);
    });
};

App.prototype.onAuthStateChanged = function (user) {
    if (user){
        alert("Sign up successful.");
        location.replace('/dashboard');
    } else {
    }
}

window.onload = function() {
    window.app = new App();
}
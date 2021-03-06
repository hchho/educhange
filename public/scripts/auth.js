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
    this.logoutForm = document.getElementById('logout-form');
    this.loginButton = document.getElementById('login');
    this.logoutButton = document.getElementById('logout');
    this.signUp = document.getElementById('sign-up');
    this.emailInput = document.getElementById('email');
    this.passwordInput = document.getElementById('password');

    this.loginButton.addEventListener('click', this.signIn.bind(this));
    this.logoutButton.addEventListener('click', this.signOut.bind(this));

    this.initFirebase();
}

App.prototype.initFirebase = function() {
    firebase.auth().onAuthStateChanged(this.onAuthStateChanged.bind(this));
}

App.prototype.onAuthStateChanged = function (user) {
    if (user){
        this.loginForm.setAttribute('hidden', 'true');
        this.logoutForm.removeAttribute('hidden');
    } else {
        this.loginForm.removeAttribute('hidden');
        this.logoutForm.setAttribute('hidden', 'true');
        console.log('no user');
    }
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

App.prototype.signOut = function() {
    firebase.auth().signOut().then(function() {
        alert("Signed out");
    }).catch(function(error) {
        console.log(error);
    });
};

window.onload = function() {
    window.app = new App();
}
var config = {
    apiKey: "AIzaSyB4WsRTYAg27pPz_Hdf-pLcaZPR-IxlHB0",
    authDomain: "educhange-nwhacks.firebaseapp.com",
    databaseURL: "https://educhange-nwhacks.firebaseio.com",
    projectId: "educhange-nwhacks",
    storageBucket: "educhange-nwhacks.appspot.com",
    messagingSenderId: "654557831315"
};

firebase.initializeApp(config);

var xhttp = new XMLHttpRequest();

function App() {
    var loginButton = document.getElementById('login');
    var emailInput = document.getElementById('email');
    var passwordInput = document.getElementById('password');
    loginButton.addEventListener('click', this.signIn.bind(this));

    this.initFirebase();
}

App.prototype.initFirebase = function() {
    firebase.auth().onAuthStateChanged(this.onAuthStateChanged.bind(this));
}

xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        location.replace('/dashboard');
    }
};

App.prototype.onAuthStateChanged = function (user) {
    console.log('Getting user status');
    if (user){
        firebase.auth().currentUser.getIdToken(/* forceRefresh */ true).then(function(idToken) {
            xhttp.open("POST", "/login", true);
            xhttp.setRequestHeader("Content-type", "application/json");
            xhttp.send(JSON.stringify({token: idToken}));
        }).catch(function(error) {
            console.log(error);
        });
    } else {
        console.log('no user');
    }
}

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
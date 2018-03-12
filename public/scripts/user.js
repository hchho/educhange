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
    this.initFirebase();
}

App.prototype.initFirebase = function() {
   if(firebase.auth().currentUser) {
       console.log('There is a user');
   }  else {
       console.log('There is no user');
   }
    firebase.auth().onAuthStateChanged(this.onAuthStateChanged.bind(this));
}

//xhttp.onreadystatechange = function() {
//    if (this.readyState == 4 && this.status == 200) {
//        location.replace('/dashboard');
//    }
//};

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

window.onload = function() {
    window.app = new App();
}
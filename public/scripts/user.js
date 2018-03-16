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
    firebase.auth().onAuthStateChanged(this.onAuthStateChanged.bind(this));
}

App.prototype.onAuthStateChanged = function (user) {
    if (user){
        
    } else {
        location.replace('/');
    }
}

window.onload = function() {
    window.app = new App();
}
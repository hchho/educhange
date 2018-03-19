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
    this.initFirebase();
}

App.prototype.initFirebase = function() {
    this.logoutForm = document.getElementById('logout-form');
    this.logoutButton = document.getElementById('logout');
    this.recoverPass = document.getElementById('recover-password');
    this.updateButton = document.getElementById('update');
    
    this.logoutButton.addEventListener('click', this.signOut.bind(this)); 
    
    this.recoverPass.addEventListener("click", this.recoverPassword.bind(this));
    
    this.updateButton.addEventListener('click', this.updateUser.bind(this));
     firebase.auth().onAuthStateChanged(this.onAuthStateChanged.bind(this));
}

App.prototype.signOut = function() {
    firebase.auth().signOut().then(function() {
        alert("Signed out");
    }).catch(function(error) {
        console.log(error);
    });
};

App.prototype.onAuthStateChanged = function (user) {
    if (user){
        this.displayUser(user.displayName, user.email);
    } else {
        location.replace('/');
    }
}

App.prototype.displayUser = function(displayName, email) {
    var div = document.getElementById('user-details');
    if(!displayName) displayName = '';
    div.querySelector('#displayName').placeholder = displayName;
    div.querySelector('#userEmail').placeholder = email;
};

App.prototype.recoverPassword = function() {
    let userEmail = firebase.auth().currentUser.email;
    firebase.auth().sendPasswordResetEmail(userEmail).then(function() {
        alert('Password reset email sent');
    });
}

App.prototype.updateUser = function() {
    let newDisplayName = document.getElementById('displayName').value;
    let newUserEmail = document.getElementById('userEmail').value;
    if (!newUserEmail) {
        newUserEmail = firebase.auth().currentUser.email;
    }
    if (!newDisplayName) {
        newDisplayName = firebase.auth().currentUser.displayName;
    }        
    let user = firebase.auth().currentUser;
    user.updateEmail(newUserEmail).then(function() {
        alert('User email updated');
    }).catch(function(error) {
        alert(error.Message);
    });
    user.updateProfile({
        displayName: newDisplayName
    }).then(function() {
        alert('User display name updated');
    }).catch(function(error) {
        alert(error.Message);
    });
}

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
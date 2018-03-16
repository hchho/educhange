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
                this.logoutButton = document.getElementById('logout');
                this.logoutButton.addEventListener('click', this.signOut.bind(this));
                this.initFirebase();
            }

            App.prototype.initFirebase = function() {
                firebase.auth().onAuthStateChanged(this.onAuthStateChanged.bind(this));
            }

            App.prototype.onAuthStateChanged = function (user) {
                console.log('Getting user status');
                if (user){
                    document.getElementById('session-form').user_email.value = user.email;
                    user.getIdToken().then(function(idToken) {
                        document.getElementById('session-form').user_token.value = idToken;
                    });
                } else {
                    location.replace('/');
                }
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
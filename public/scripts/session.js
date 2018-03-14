var config = {
                apiKey: "AIzaSyB4WsRTYAg27pPz_Hdf-pLcaZPR-IxlHB0",
                authDomain: "educhange-nwhacks.firebaseapp.com",
                databaseURL: "https://educhange-nwhacks.firebaseio.com",
                projectId: "educhange-nwhacks",
                storageBucket: "educhange-nwhacks.appspot.com",
                messagingSenderId: "654557831315"
            };

            firebase.initializeApp(config);

            var sessionObjs;

            function App() {
                this.logoutButton = document.getElementById('logout');
                this.logoutButton.addEventListener('click', this.signOut.bind(this));
                this.initFirebase();
            }

            App.prototype.initFirebase = function() {
                this.auth = firebase.auth();
                this.auth.onAuthStateChanged(this.onAuthStateChanged.bind(this));
            }

            App.prototype.onAuthStateChanged = function (user) {
                if (user){
                    var sessionRef= firebase.database().ref("/sessions");
                    sessionRef.orderByChild('user_email').equalTo(user.email).limitToLast(2).on('value', function(snap) {
                        generateSessions(snap.val());
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

            var generateSessions = function(objects) {
                var text = "<ol>"
                for (var key in objects) {
                    if (objects.hasOwnProperty(key)) {
                        text += "<li>" + objects[key]['session_name'] + "</li>";
                    }
                }
                text += "</ol>";
                document.getElementById('session_objs').innerHTML = text;
            }

            window.onload = function() {
                window.app = new App();
            }
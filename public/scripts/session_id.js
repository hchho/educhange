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
                //Logout form
                this.logoutButton = document.getElementById('logout');
                this.logoutButton.addEventListener('click', this.signOut.bind(this));

                //Question form elements
                this.questionInput = document.getElementById('question');
                this.submitButton = document.getElementById('question_submit');

                this.questionForm = document.getElementById('question-form');
                this.questionForm.addEventListener('submit', this.saveQuestion.bind(this));

                // Toggle for the button.
                var buttonTogglingHandler = this.toggleButton.bind(this);
                this.questionInput.addEventListener('keyup', buttonTogglingHandler);
                this.questionInput.addEventListener('change', buttonTogglingHandler);

                //Question eleemnts
                this.fname = document.getElementById('fname');
                this.lname = document.getElementById('lname');
                this.questionList = document.getElementById('questions');
                var url = window.location.pathname;
                this.sessionId = url.split("/").slice(-1)[0];
                
                this.initFirebase();
            }

            App.prototype.initFirebase = function() {
                this.auth = firebase.auth();
                this.database = firebase.database();
                this.auth.onAuthStateChanged(this.onAuthStateChanged.bind(this));
            }

            // Template for messages.
            App.MESSAGE_TEMPLATE =
                '<div class="question-container">' +
                '<div class="question"></div>' +
                '<span class="fname"></span>' +
                '<span class="lname"></span>' +
                '</div>';
            App.prototype.onAuthStateChanged = function (user) {
                if (user){
                    this.loadQuestions();
                } else {
                    location.replace('/');
                }
            }

            // Loads chat messages history and listens for upcoming ones.
            App.prototype.loadQuestions = function() {
                // Reference to the /messages/ database path.
                this.sessionRef = this.database.ref('sessions/' + this.sessionId);
                this.questionsRef = this.sessionRef.child('questions');
                // Make sure we remove all previous listeners.
                this.questionsRef.off();

                // Loads the last 12 messages and listen for new ones.
                var setQuestion = function(data) {
                    var val = data.val();
                    this.displayQuestion(data.key, val.fname, val.lname, val.text);
                }.bind(this);
                this.questionsRef.limitToLast(12).on('child_added', setQuestion);
                this.questionsRef.limitToLast(12).on('child_changed', setQuestion);
            };

            App.prototype.signOut = function() {
                this.auth().signOut().then(function() {
                    alert("Signed out");
                }).catch(function(error) {
                    console.log(error);
                });
            };

            // Enables or disables the submit button depending on the values of the input
            // fields.
            App.prototype.toggleButton = function() {
                if (this.questionInput.value) {
                    this.submitButton.removeAttribute('disabled');
                } else {
                    this.submitButton.setAttribute('disabled', 'true');
                }
            };

            // Saves a new message on the Firebase DB.
            App.prototype.saveQuestion = function(e) {
                e.preventDefault();
                // Check that the user entered a message and is signed in.
                if (this.questionInput.value && this.auth.currentUser && this.fname.value && this.lname.value) {
                    var currentUser = this.auth.currentUser;
                    // Add a new message entry to the Firebase Database.
                    this.questionsRef.push({
                        fname: this.fname.value,
                        lname: this.lname.value,
                        text: this.questionInput.value,
                    }).then(function() {
                        // Clear message text field and SEND button state.
                        App.resetMaterialTextfield(this.questionInput);
                        this.toggleButton();
                    }.bind(this)).catch(function(error) {
                        console.error('Error writing new message to Firebase Database', error);
                    });
                }
            };

            // Displays a Message in the UI.
            App.prototype.displayQuestion = function(key, fname, lname, text) {
                var div = document.getElementById(key);
                // If an element for that message does not exists yet we create it.
                if (!div) {
                    var container = document.createElement('div');
                    container.innerHTML = App.MESSAGE_TEMPLATE;
                    div = container.firstChild;
                    div.setAttribute('id', key);
                    this.questionList.appendChild(div);
                }
                div.querySelector('.fname').textContent = fname;
                div.querySelector('.lname').textContent = lname;
                var questionElement = div.querySelector('.question');
                if (text) { // If the message is text.
                    questionElement.textContent = text;
                    // Replace all line breaks by <br>.
                    questionElement.innerHTML = questionElement.innerHTML.replace(/\n/g, '<br>');
                } 
                // Show the card fading-in and scroll to view the new message.
                setTimeout(function() {div.classList.add('visible')}, 1);
                this.questionList.scrollTop = this.questionList.scrollHeight;
                this.questionInput.focus();
            };

            //Resets question input value to blank
            App.resetMaterialTextfield = function(element) {
                element.value = '';
//                element.parentNode.MaterialTextfield.boundUpdateClassesHandler();
            };

            window.onload = function() {
                window.app = new App();
            }
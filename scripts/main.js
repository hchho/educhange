/**
 * Copyright 2015 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';
// Initializes EduChange.
function EduChange() {
  this.checkSetup();
  // this.signupButton = document.getElementById('sign-up');
  this.signinButton = document.getElementById('sign-in');
  // this.signupButton.addEventListener('click', this.signUp.bind(this));
  this.sessionButton = document.getElementById('create-session');

  this.sessionButton.addEventListener('click', this.createSession.bind(this));
  this.signinButton.addEventListener('click', this.signIn.bind(this));
  this.initFirebase();
};

EduChange.prototype.initFirebase = function() {
  // TODO(DEVELOPER): Initialize Firebase.
  this.auth = firebase.auth();
  this.database = firebase.database();
  this.storage = firebase.storage();

  // this.auth.onAuthStateChanged(this.onAuthStateChanged.bind(this));  
};

EduChange.prototype.signIn = function() {
  // TODO(DEVELOPER): Sign in Firebase with credential from the Google user.
  var provider = new firebase.auth.GoogleAuthProvider();
  this.auth.signInWithPopup(provider);
};

// Signs-out of Friendly Chat.
EduChange.prototype.signOut = function() {
  // TODO(DEVELOPER): Sign out of Firebase.
  this.auth.signOut();
};

EduChange.prototype.createSession = function() {
  // var userName = document.getElementById('signup-info');
  // var type = document.getElementById('user-type')
  var currentUser = this.auth.currentUser;
  var usersRef = firebase.database().ref().child('sessions');
  
  usersRef.push({
    // newUser.push({
    teacher_id: currentUser.displayName,
    date: new Date()
  });
};

// EduChange.prototype.signUp = function() {
  
//   var userName = document.getElementById('signup-info');
//   var type = document.getElementById('user-type')
//   var usersRef = firebase.database().ref().child('user');
//   usersRef.push({
//     // newUser.push({
//     type: type.value,
//     username: userName.value
//   });
//   // console.log(userName.value);
// };


// EduChange.prototype.signIn = function() {
  
//   var userName = document.getElementById('login-info');
//   var usersRef = firebase.database().ref().child('user');
//   // usersRef.orderByChild('username').equalTo(userName.value).on("value", function(snapshot) {
//   //   // console.log(snapshot.val());
//   //   snapshot.forEach(function(data) {
//   //     // if(data.key) {
//   //       // this.currentUser.apply(data.key);
//   //       if(data) {
//   //       console.log(data.key);
//   //       currentUser = data.key;
//   //       console.log(currentUser);
//   //       }
//   //       else { console.log("user doesn't exist");}

//   //   });
//   this.currentUser = usersRef.orderByChild('username').equalTo(userName.value).on('value', function(snapshot) {
//     snapshot.forEach(function(data){
//       console.log(data.key);
//     })
//   });
//   };

// Checks that the Firebase SDK has been correctly setup and configured.
EduChange.prototype.checkSetup = function() {
  if (!window.firebase || !(firebase.app instanceof Function) || !firebase.app().options) {
    window.alert('You have not configured and imported the Firebase SDK. ' +
        'Make sure you go through the codelab setup instructions and make ' +
        'sure you are running the codelab using `firebase serve`');
  }
};

window.onload = function() {
  window.EduChange = new EduChange();
};

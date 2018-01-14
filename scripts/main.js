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

  this.dataForm = document.getElementById('data-form')
  
  
  // this.dataInput = document.getElementById('data');
  // Shortcuts to DOM Elements.
  
  this.dataForm.addEventListener('refresh', this.loadData.bind(this));
  this.loadButton = document.getElementById('load');
  this.refreshButton = document.getElementById('refresh');
  // Toggle for the button.
  var buttonTogglingHandler = this.toggleButton.bind(this);
  
  this.loadButton.addEventListener('click', this.loadData.bind(this));
  this.refreshButton.addEventListener('click', this.displayData.bind(this));
  // this.dataInput.addEventListener('keyup', buttonTogglingHandler);
  // this.dataInput.addEventListener('change', buttonTogglingHandler);

  this.initFirebase();
}

// Sets up shortcuts to Firebase features and initiate firebase auth.
EduChange.prototype.initFirebase = function() {
  // TODO(DEVELOPER): Initialize Firebase.
  this.auth = firebase.auth();
  this.database = firebase.database();
  this.storage = firebase.storage();

  this.auth.onAuthStateChanged(this.onAuthStateChanged.bind(this));  
};

// Loads chat messages history and listens for upcoming ones.
EduChange.prototype.loadData = function() {

  // TODO(DEVELOPER): Load and listens for new messages.
  // Reference to the /messages/ database path.
  this.usersRef = this.database.ref('user');
  // Make sure we remove all previous listeners.
  this.usersRef.off();

  // Loads the last 12 messages and listen for new ones.
  var setData = function(data) {
    var val = data.val();
    this.displayData(data.key, val.username, val.type);
  }.bind(this);
  this.usersRef.limitToLast(12).on('child_added', setData);
  this.usersRef.limitToLast(12).on('child_changed', setData);
  document.write("Loaded data");
};


// Resets the given MaterialTextField.
EduChange.resetMaterialTextfield = function(element) {
  element.value = '';
  element.parentNode.MaterialTextfield.boundUpdateClassesHandler();
};

// Template for messages.
EduChange.MESSAGE_TEMPLATE =
    '<div class="info-container">' +
      '<div class="user-id"></div>' +
      '<div class="username"></div>' +
      '<div class="type"></div>' + 
    '</div>';

// Displays a Message in the UI.
EduChange.prototype.displayData = function(key, username, type) {
  var div = document.getElementById(key);
  // If an element for that message does not exists yet we create it.
  if (!div) {
    var container = document.createElement('div');
    container.innerHTML = EduChange.MESSAGE_TEMPLATE;
    div = container.firstChild;
    div.setAttribute('user-id', key);
    this.messageList.appendChild(div);
  }

  div.querySelector('.username').textContent = username;
  var type = div.querySelector('.type');
  if (type) { // If the message is text.
    messageElement.textContent = type;
  } 
  // Show the card fading-in.
  setTimeout(function() {div.classList.add('visible')}, 1);
  this.messageList.scrollTop = this.messageList.scrollHeight;
  // this.dataInput.focus();
};

// Enables or disables the submit button depending on the values of the input
// fields.
EduChange.prototype.toggleButton = function() {

};

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

var database = firebase.database().ref().child('questions');

database.on("child_added", function(data, prevChildKey) {
   var question = data.val();
   document.getElementById("questionText").innerHTML = question.question_text;
});

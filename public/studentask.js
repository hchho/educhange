var database = firebase.database().ref().child('questions');

  function submitQuestion(){
    var question = $("#question").val();
    database.push({
      chosen:false,
      question_text:question,
      session_id:'0',
      student_id:'0',
      votes: '0'
    });
}

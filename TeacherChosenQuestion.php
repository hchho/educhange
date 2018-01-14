<!DOCTYPE html>
<html lang="en">
    <head>

        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>

        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"
              integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">

        <link href="style/global.css" rel="stylesheet">
        <title>Question</title>
        
        <script type="text/javascript">
        function award(){
            alert("Awarded");
        }
        </script>


    </head>

    <body>
        <h1>Question</h1>
        <div>
        <?php
            
            $StudentName = $_GET['StudentName'];
            $QuestionText = $_GET['QuestionText'];
            
            echo "Student: " . $StudentName;
            echo "</br>";
            echo "Question: " . $QuestionText;
            ?>
        </div>
        <button onclick="award()">Award</button>
        <br>
        
        <button onClick="window.location.href='TeachersChoiceOfQuestions.html'">Back</button>

       
       
        
        
    </body>
</html>

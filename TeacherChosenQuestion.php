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
        <div class="container">
        <center>
        <h1>Question</h1>
        
        <?php
            
            $StudentName = $_GET['StudentName'];
            $QuestionText = $_GET['QuestionText'];
            
            echo "<h3>Student: </h3></span>";
            echo "<h2 style='Background-color:white'>".$StudentName."<h2>";
            echo "<h3>Question:<h3>";
            echo "<h2 style='Background-color:white'>".$QuestionText."<h2>";
            ?>
        
        <button class="btn-success" onclick="award()">Award</button>
        <br>
        
        <button class="btn-danger" onClick="window.location.href='TeachersChoiceOfQuestions.html'">Back</button>

        </center>
        </div>

    </body>
</html>

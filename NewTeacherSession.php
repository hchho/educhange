<!DOCTYPE html>
<html lang="en">

<head>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
    <link href="style/global.css" rel="stylesheet">
</head>

<body>
    <div class="container">
        <!-- Create a Session ID -->
        <!-- Save the Session ID and Date Created to the Teacher's Database -->
        <center>
            <?php 


                echo "<h1>Session ID: " . mt_rand()."</h1>";
                ?>
            <br>


            <button class="btn-primary" onClick="window.location.href='loadingScreen.php'">Continue</button>
            <br>
            <button class="btn-danger" onclick="window.location.href='MainTeacherPage.html'">Back</button>
        </center>
    </div>
</body>

</html>
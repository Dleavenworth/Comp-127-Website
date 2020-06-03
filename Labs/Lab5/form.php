<!DOCTYPE html>
<html lang="en" dir="ltr">
    <head>
        <meta charset="utf-8">
        <title>Form history</title>
    </head>
    <body>
        <h1>Your response:</h1>
        Name: <?php echo $_POST["name"]; ?><br>
        Email: <?php echo $_POST["email"];?><br>
        How you are feeling: <?php echo $_POST["feeling"];?><br>

        <h1>Previous responses:<h1>
        <ul>
            <?= file_get_contents('record.txt');?>
        </ul>
    </body>
</html>


<?php
    $name = "Name: " . $_POST["name"]. ", ";
    $email = "Email: " . $_POST["email"] . ", ";
    $feeling = "How they are feeling: " . $_POST["feeling"] . " ";
    $info = "<li>";
    $info .= $name .= $email .= $feeling .= "</li>";
    $myfile = file_put_contents('record.txt', $info, FILE_APPEND | LOCK_EX);
?>

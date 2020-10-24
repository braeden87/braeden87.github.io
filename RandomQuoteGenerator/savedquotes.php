<?php
//////////////////////////////////////////////////////
//                 Variables
//////////////////////////////////////////////////////
$servername = "localhost";
$username = "root";
$passsword = null;
$database = "RandomQuoteGenerator";
$con;
$user;
$result;

//////////////////////////////////////////////////////
//                 Functions
//////////////////////////////////////////////////////
//Function to Connect to the Database
function connectToDatabase(){
    global $servername;
    global $username;
    global $passsword;
    global $database;

    //Create Connecton
    $con = mysqli_connect($servername, $username, $passsword, $database);
    //Check Connection
    if(!$con){
    echo "Connection failed: ";
    }
    return $con;
}
//Function to retrieve all stored quotes for a specific user 
function getStoredQuotes(){
    global $con;
    global $user;
    global $result;
    //Get Form Values
    $userID_fk = $_POST["userID2"];
    $sql_select = "SELECT * FROM storedQuotes WHERE userID_fk = '$userID_fk'";
    $result = mysqli_query($con, $sql_select);
}

//On Page Load
$con = connectToDatabase();
if(isset($_POST["viewQuotes"])){
    getStoredQuotes();
}
mysqli_close($con);
?>

<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Random Quote Generator: Saved Quotes</title>
        <link rel="stylesheet" href="style1.css">
        <link rel="icon" type="image.png" href="BH Favicon.png">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.9.0/css/all.min.css" integrity="sha512-q3eWabyZPc1XTCmF+8/LuE1ozpg5xxn7iO89yfSOd5/oKvyqLngoNGsx8jq92Y8eXJ/IRxQbEC+FGSYxtk2oiw==" crossorigin="anonymous" />
    </head>
    <body>
        <!-- User Area -->
        <div class="user-area">
            <button class="main-button">
                <a href="index.php">Home</a>
            </button>
        </div>
        <!-- Quote List Area -->
        <form method="POST">
            <div class="quote-container">
                <?php 
                    if(isset($_POST["viewQuotes"])){
                        echo "<table>
                        <tr>
                        <th>Quote</th>
                        <th>Author</th>
                        </tr>";

                        while($row = mysqli_fetch_array($result))
                        {
                            echo "<tr>";
                            echo "<td>" . $row["quote"] . "</td>";
                            echo "<td>" . $row["author"] . "</td>";
                            echo "</tr>";
                        }
                        echo "</table>";
                    }
                ?>
                <!-- Input fields to hold the API data to pass to PHP -->
                <input type="text" name="userID2" id="userID2" value="" hidden>
                <button class="main-button" name="viewQuotes" type="submit">View Stored Quotes</button>
            </div>
        </form>
        
        <!-- Script -->
        <script src="savedQuote1.js"></script>
    </body>
</html>
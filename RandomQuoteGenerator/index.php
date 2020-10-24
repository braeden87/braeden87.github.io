<?php
//////////////////////////////////////////////////////
//                 Variables
//////////////////////////////////////////////////////
$servername = "localhost";
$username = "root";
$passsword = null;
$database = "RandomQuoteGenerator";
$user;
$userID;

//////////////////////////////////////////////////////
//                 Functions
//////////////////////////////////////////////////////
//Function to connect to database
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
//Function to pass information from signup form to database
function signupFormSubmit(){
    global $con;
    //Insert User into Table
    $sql_insert = "INSERT INTO userInfo (firstName, lastName, email, userPassword) VALUES (?, ?, ?, ?)";
    $stmt = mysqli_prepare($con, $sql_insert);
    //Bind Variables to prepared statement as parameters
    mysqli_stmt_bind_param($stmt, "ssss", $firstname, $lastname, $email, $password1);

    //Set Parameters and Execute From the Registration Form Values
    $firstname = ucfirst(strtolower(str_replace(" ", "", strip_tags($_POST["firstName"])))); //Removes any html tags ,deletes any spaces, Only first letter is upper case
    $lastname = ucfirst(strtolower(str_replace(" ", "", strip_tags($_POST["lastName"])))); //Removes any html tags ,deletes any spaces, Only first letter is upper case
    $email = ucfirst(strtolower(str_replace(" ", "", strip_tags($_POST["email"])))); //Removes any html tags ,deletes any spaces, Only first letter is upper case
    $password1 = strip_tags($_POST["password"]); //Removes any html tags
    $password2 = strip_tags($_POST["password2"]); //Removes any html tags


    //Check to See if Email is already in Use
    //Check if email is in valid format
    if(filter_var($email, FILTER_VALIDATE_EMAIL)){
        $email = filter_var($email, FILTER_VALIDATE_EMAIL);
        //Check if Email already exists
        $email_check = mysqli_query($con, "SELECT email FROM userInfo WHERE email = '$email'");
        //Count the number of rows returned
        $num_rows = mysqli_num_rows($email_check);
        //checks to see if email has been used and if passwords match
        if($num_rows == 0 && $password1 == $password2){
            mysqli_stmt_execute($stmt);
        }
    }
}
//Function to validate information from login form, and then
//fetch user information that has been logged in
function loginFormSubmit(){
    global $con;
    global $user;
    global $userID;
    //Get Form Values
    $useremail = ucfirst(strtolower(str_replace(" ", "", strip_tags($_POST["email"])))); //Removes any html tags ,deletes any spaces, Only first letter is upper case
    $userpassword = strip_tags($_POST["password"]); //Removes any html tags
    $sql_select = "SELECT * FROM userInfo WHERE email = '$useremail' AND userPassword = '$userpassword'";
    $result = mysqli_query($con, $sql_select);
    if(mysqli_num_rows($result) > 0){
        //output data of each row
        $row = mysqli_fetch_assoc($result);
        $user = $row["lastName"] . ", " . $row["firstName"];
        $userID = $row["userID"];
    }
}
//Function that sends the quote and author as well as user ID 
//of whoever is logged in to the database
function saveQuoteSubmit(){
    global $con;
    //Insert User into Table
    $sql_insert = "INSERT INTO storedQuotes (quote, author, userID_fk) VALUES (?, ?, ?)";
    $stmt = mysqli_prepare($con, $sql_insert);
    //Bind Variables to prepared statement as parameters
    mysqli_stmt_bind_param($stmt, "ssi", $quote, $author, $user_ID);

    //Set Parameters and Execute From the Registration Form Values
    $quote = $_POST["quote"];
    $author = $_POST["author"];
    $user_ID = (int)$_POST["userID"];
    mysqli_stmt_execute($stmt);
}

// On Page Load
$con = connectToDatabase();
//This is what runs when the submit button is pushed on the bottom of the Sign Up Form
if(isset($_POST["signup_submit"])){
    signupFormSubmit();
}
//This is what runs when the submit button is pushed on the bottom of the login Form
if(isset($_POST["login_submit"])){
    loginFormSubmit();
}
//This is what happens when the Saved Quote button is pushed
if(isset($_POST["saveQuoteButton"])){
    saveQuoteSubmit();
}
mysqli_close($con);
?>

<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Random Quote Generator</title>
        <link rel="stylesheet" href="style1.css">
        <link rel="icon" type="image.png" href="BH Favicon.png">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.9.0/css/all.min.css" integrity="sha512-q3eWabyZPc1XTCmF+8/LuE1ozpg5xxn7iO89yfSOd5/oKvyqLngoNGsx8jq92Y8eXJ/IRxQbEC+FGSYxtk2oiw==" crossorigin="anonymous" />
    </head>
    <body>
        <!-- User Area -->
        <div class="user-area">
            <Button id="loginButton" class="main-button">Log In</Button>
            <button id="signupButton" class="main-button">Sign Up</button>
            <h1 class="user" hidden>
            <?php 
                echo $user?>
            </h1>
            <h1 class="user"></h1>
            <button class="main-button navigation">
                <a href="savedquotes.php">Saved Quote List</a>
            </button>
            <button class="main-button navigation">Log Out</button>
        </div>
        <!-- Sign Up Form -->
        <div class="signup-page">
            <h1>Sign Up</h1>
            <!-- Form -->
            <form id="signup-form" method="POST">
                <!-- First Name -->
                <div class="form-group">
                    <label for="name">First Name</label>
                    <input type="text" id="firstName" placeholder="First Name" name="firstName"
                           required minlength="3" maxlength="100">
                </div>
                 <!-- Last Name -->
                 <div class="form-group">
                    <label for="name">Last Name</label>
                    <input type="text" id="lastName" placeholder="Last Name" name="lastName"
                           required minlength="3" maxlength="100">
                </div>
                 <!-- Email Address -->
                 <div class="form-group">
                    <label for="email">Email Address</label>
                    <input type="email" id="email" placeholder="email@address.com" name="email"
                           required>
                </div>
                 <!-- Password -->
                 <div class="form-group">
                    <label for="password1">Password</label>
                    <input type="password" id="password1" placeholder="Create Password (Min. 8 Characters)" name="password"
                           required pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$"
                           title="Please include at least 1 uppercase, 1 lowercase, and 1 number!">
                </div>
                <!-- Confirm Password -->
                <div class="form-group">
                    <label for="password2">Confirm Password</label>
                    <input type="password" id="password2" name="password2" placeholder="Confirm Password"
                           required patter="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$">
                </div>
                <button type="submit" name="signup_submit" class="signup-button" id="signupButton">Register</button>
            </form>
        </div>
        <!-- Log In Form  -->
        <div class="login-page">
            <h1>Login</h1>
            <!-- Form -->
            <form id="login-form" method="POST">
                 <!-- Email Address -->
                 <div class="form-group">
                    <label for="email">Email Address</label>
                    <input type="email" id="login-email" placeholder="email@address.com" name="email"
                           required>
                </div>
                 <!-- Password -->
                 <div class="form-group">
                    <label for="password1">Password</label>
                    <input type="password" id="login-password" placeholder="Create Password (Min. 8 Characters)" name="password"
                           required pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$"
                           title="Please include at least 1 uppercase, 1 lowercase, and 1 number!">
                </div>
                <button class="signup-button" type="submit" name="login_submit">Log In</button>
            </form>
        </div>
        <!-- Quote Area -->
        <div class ="quote-container" id="quote-container">
            <form method="POST">
                <!-- Input fields to hold the API data to pass to PHP -->
                <input type="text" name="userID" id="userID" value="<?php echo $userID; ?>" hidden>
                <input type="text" id="authorInput" name="author" value="" hidden>
                <input type="text" id="quoteInput" name="quote" value="" hidden>
                <!-- Quote Element -->
                <div class="quote-text">
                    <i class="fas fa-quote-left"></i>
                    <span id="quote"></span>
                </div>
                <!-- Author -->
                <div class="quote-author">
                    <span id="author"></span>
                </div>
                <!-- Buttons -->
                <div class="button-container">
                    <button class="twitter-button main-button" id="twitter" title="Tweet This!">
                        <i class="fab fa-twitter"></i>
                    </button>
                    <button class="main-button navigation" name="saveQuoteButton">Save Quote</button>
                    <button id="new-quote" class="main-button">New Quote</button>
                </div>
            </form>
        </div>
        <!-- Loader -->
        <div class="loader" id="loader"></div>
        <!-- Script -->
        <Script src="script.js"></Script>
        <script src="form.js"></script>
    </body>
</html>
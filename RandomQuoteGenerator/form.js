//////////////////////////////////////////////////////
//                 Variables
//////////////////////////////////////////////////////
const loginForm = document.getElementById('login-form');
const signupForm = document.getElementById('signup-form');
const submitButton = document.getElementsByClassName("signup-button");
const password1Element = document.getElementById("password1");
const password2Element = document.getElementById("password2");
const loginButton = document.getElementById("loginButton");
const signupButton = document.getElementById("signupButton");
const userNameDisplay = document.getElementsByClassName("user");
const savedQuotesButton = document.getElementsByClassName("navigation");

let isSignupValid = false;
let isLoginValid = false;
let passwordsMatch = false;

//////////////////////////////////////////////////////
//                 Functions
//////////////////////////////////////////////////////
//Sign Up Form Validation Functions
function validateSignupForm(){
    //Check to see if passwords match
    if(password1Element.value === password2Element.value){
        passwordsMatch = true;
    }else{
        passwordsMatch = false;
        return;
    }
    //If Form is not valid and passwords match
    if(passwordsMatch && signupForm.checkValidity()){
        isSignupValid = true;
    }
}
//Log In Form Validation Function
function validateLoginForm(){
    isLoginValid = loginForm.checkValidity();
}
//This function is called on Signup Form Submit
function processSignup(e){
    //Validate Form
    validateSignupForm();
    if(!isSignupValid)
    {
        //Prevents from wiping data and sending it somewhere
        e.preventDefault();
    }else{
        document.getElementsByClassName("signup-page")[0].style.display = "none";
    }
}
//This function is called on Login Form Submit
function processLogin(e){
    validateLoginForm();
    if(isLoginValid){
        document.getElementsByClassName("login-page")[0].style.display = "none";
        localStorage.setItem("loggedIn", true);
    }else{
        //Prevents Wiping Data and Sending
        e.preventDefault();
    }
}
//Function that is called when a user is logged in
function loggedIn(){
    if(localStorage.getItem("loggedIn")){
        loginButton.style.display = "none";
        signupButton.style.display = "none";
        console.log(document.getElementById("userID").value);
        if(localStorage.getItem("userID") == "null"){
            localStorage.setItem("userID", document.getElementById("userID").value);
        }
        userNameDisplay[1].style.display = "inline";
        savedQuotesButton[0].style.display = "inline";
        savedQuotesButton[1].style.display = "inline";
        savedQuotesButton[2].style.display = "block";
        userNameDisplay[1].textContent = localStorage.getItem("userName");
        document.getElementById("userID").value = localStorage.getItem("userID");
    }
}
//Function that is called when a user is logged out
function logOut(){
    localStorage.setItem("loggedIn", false);
    localStorage.setItem("userName", "");
    localStorage.setItem("userID", null);
    loginButton.style.display = "inline";
    signupButton.style.display = "inline";
    userNameDisplay[0].style.display = "none";
    userNameDisplay[1].style.display = "none";
    savedQuotesButton[0].style.display = "none";
    savedQuotesButton[1].style.display = "none";
    savedQuotesButton[2].style.display = "none";
}

//////////////////////////////////////////////////////
//                 Event Listeners
//////////////////////////////////////////////////////
// Event Listener for submit button (loginForm)
submitButton[1].addEventListener("click", processLogin);
// Event Listener for submit button (signupForm)
submitButton[0].addEventListener("click", processSignup);
//Event Listener for Login button
loginButton.addEventListener("click", () => {
    document.getElementsByClassName("login-page")[0].style.display = "block";
});
//Event Listener for Signup button
signupButton.addEventListener("click", () => {
    document.getElementsByClassName("signup-page")[0].style.display = "block";
});
//Event Listener for Log Out button
savedQuotesButton[1].addEventListener("click", logOut);

//On Page Open
if(localStorage.getItem("loggedIn") == "false"){
    logOut();
}else{
    if(localStorage.getItem("userName") == "" && userNameDisplay[0].textContent.length < 50){
        localStorage.setItem("userName", userNameDisplay[0].textContent);
    }
    loggedIn();
}


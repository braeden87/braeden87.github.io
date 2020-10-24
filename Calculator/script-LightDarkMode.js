//////////////////////////////////////////
//              Variables
//////////////////////////////////////////
const toggleSwitch = document.querySelector("input[type='checkbox']");
const toggleIcon = document.getElementById("toggle-icon");
const DARK_THEME = "dark";
const LIGHT_THEME = "light";

//////////////////////////////////////////
//              Functions
//////////////////////////////////////////
//Toggles between dark and light mode
function toggleDarkLightMode(color){
    let isDark = false;
    if(color === "dark"){
        isDark = true;
    }
    toggleIcon.children[0].textContent = isDark ? "Dark Mode" : "Light Mode";
    isDark ? toggleIcon.children[1].classList.replace("fa-sun", "fa-moon") : toggleIcon.children[1].classList.replace("fa-moon", "fa-sun");
}
//Switch Theme Dynamically
function switchTheme(event){
    if(event.target.checked){
        //change to dark mode
        document.documentElement.setAttribute("data-theme", DARK_THEME);
        localStorage.setItem("theme", DARK_THEME);
        toggleDarkLightMode(DARK_THEME);
    }else{
        //change to light mode
        document.documentElement.setAttribute("data-theme", LIGHT_THEME);
        localStorage.setItem("theme", LIGHT_THEME);
        toggleDarkLightMode(LIGHT_THEME);
    }
}

//////////////////////////////////////////
//              Event Listeners
//////////////////////////////////////////
//Event Listener
toggleSwitch.addEventListener("change", switchTheme);

//////////////////////////////////////////
//              On Page Start
//////////////////////////////////////////
//Check Local Storage For Theme
const currentTheme = localStorage.getItem("theme");
if(currentTheme){
    document.documentElement.setAttribute("data-theme", currentTheme);

    if(currentTheme === "dark"){
        toggleSwitch.checked = true;
        toggleDarkLightMode(DARK_THEME);
    }
}


<template>
    <div id="all">
        <header class="header">
            <img id="logo" alt = "Margin Fuel Logo" src="Logo/download.png">
        </header>
        <div id = "menu" v-on:click = "menuButton()"><img src="Logo/marginCircle.png" style="width: 30px; position: absolute; left: 2px;">Menu</div>
        <div id="column">
          <ul id="nav">
                <li id="colors"><router-link to="" style = "border-left: 0px solid transparent;"><i id = "square" class="fas fa-square"></i></router-link></li>
                <li id="HOME" class = "home" v-on:click = "focus('home'); forceRerender();" v-on:mouseenter = "homeShow()" v-on:mouseleave = "homeShow1()"><router-link to="/" class = "active" id="home1" style= " border-left: 3px solid transparent;"><i id="home-icon" class="fas fa-tachometer-alt nav-image" style= "padding-right: 16px;"></i>Home</router-link></li>
                <li id="about" v-on:mouseenter = "aboutShow()" v-on:mouseleave = "aboutShow1()"  v-on:click = "focus('about'); forceRerender();"><router-link to="/About" id="about1"><i id = "about-icon" class="fas fa-binoculars nav-image"></i>About</router-link></li>
                <li id="settings" v-on:mouseenter = "settingsShow()" v-on:mouseleave = "settingsShow1()" v-on:click = "focus('settings'); showItems(); forceRerender();"><router-link to = "" id ="settings1"><i id = "settings-icon" class="fas fa-cogs nav-image"></i>Settings<i class="fas fa-angle-down nav-arrow"></i></router-link></li>
            </ul>
          <ul id="dropdown">
            <li class="dropdown-item" v-on:click = "forceRerender(); focus('addUser');"><router-link class = "item-before" to="/Add&nbspUser">Add User</router-link></li>
            </ul>
          <div id = "sidebar-collapse">
            <div id="line"></div>
              <button class = "circle-icon" v-on:click = "columnCollapse(); navCollapse();"><i class="fas fa-angle-double-left" id="collapse"></i></button>
            </div>
        </div>
            <ul  id = "home2" v-if= "homeButton"  v-on:mouseover = "homeTrue()" v-on:mouseleave = "homeShow()">
              <li id = "home2-top" v-on:click = "focus('home'); forceRerender()"><router-link to="/">Home</router-link></li>
              </ul>
            <ul  id = "about2" v-if= "aboutButton" v-on:mouseover = "aboutTrue()" v-on:mouseleave = "aboutShow()">
              <li id = "about2-top" v-on:click = "focus('about'); forceRerender();"><router-link to="/About">About</router-link></li>
              </ul>
            <ul id = "settings2" v-if= "settingsDropdown" v-on:mouseover = "settingsTrue()" v-on:mouseleave = "settingsShow()">
              <li id = "settings2-top"><router-link to="">Settings</router-link></li>
              <li class = "settings2-dropdown" v-on:click = "focus('addUser'); forceRerender();"><router-link to="/Add&nbspUser">Add User</router-link></li>
              </ul>
        <breadCrumb :key= "componentKey"/>
    </div>
</template>

<script>
import breadCrumb from "./breadCrumb.vue";

export default {
    name: "Header",
    components:{
        breadCrumb
    },
    data(){
        return{
            componentKey: 0,
            homeButton: false,
            aboutButton: false,
            settingsDropdown: false,
            homeT : "", 
            aboutT: "", 
            settingsT: ""
        }
    },
    methods:{
//////////////////////////////////////////////////////////////////////////////
//This method is called every time a dropdown menu is clicked, it sets the 
//display from none to block for the items that are usually hidden inside of 
//the dropdown
//////////////////////////////////////////////////////////////////////////////
        showItems(){
            if(document.getElementById("column").style.width == "42px")
            {
              document.getElementById("dropdown").style.display = "none";
            }
            else{
              if(document.getElementById("dropdown").style.display !== "block"){
                document.getElementById("dropdown").style.display = "block";
              }else{
                document.getElementById("dropdown").style.display = "none";
              } 
            }
          },
        
//////////////////////////////////////////////////////////////////////////////
//this method is used to make the page update every time a button is clicked
//it does this by changing the calue of a piece of data every time anything is
//clicked, this way every time something is clicked the whole page updates
//////////////////////////////////////////////////////////////////////////////
        forceRerender(){
          this.componentKey += 1;
          this.navCollapse();
          },
//////////////////////////////////////////////////////////////////////////////
//this methid is used to show what page is currently being showed. It changes 
//the color of whatever nav element is being showed. 
//////////////////////////////////////////////////////////////////////////////
        focus(id){
          var num;
          if(id == "home"){
            num = 1;
          }else if(id == "about"){
            num = 2;
          }else if(id == "settings"){
            num = 3;
          }else if(id == "addUser"){
            num = 4;
          }

          document.getElementsByTagName("a")[num].style.color="rgb(220, 43, 87)";

          if(num == 1){
            document.getElementsByTagName("a")[1].style.color="rgb(88, 88, 88)";
            document.getElementsByTagName("a")[2].style.color="rgb(88, 88, 88)";
            document.getElementsByTagName("a")[3].style.color="rgb(88, 88, 88)";
            document.getElementsByTagName("a")[4].style.color="rgb(88, 88, 88)";
          }else if(num == 2){
            document.getElementsByTagName("a")[4].style.color="rgb(88, 88, 88)";           
            document.getElementsByTagName("a")[3].style.color="rgb(88, 88, 88)";
            document.getElementsByTagName("a")[1].style.color="rgb(88, 88, 88)";
          }else if(num == 3){
            document.getElementsByTagName("a")[1].style.color="rgb(88, 88, 88)";
            document.getElementsByTagName("a")[2].style.color="rgb(88, 88, 88)";
          }else if(num == 4){
            document.getElementsByTagName("a")[1].style.color="rgb(88, 88, 88)";
            document.getElementsByTagName("a")[2].style.color="rgb(88, 88, 88)";
            document.getElementsByTagName("a")[3].style.color="rgb(220, 43, 87)";
          }
          },
//////////////////////////////////////////////////////////////////////////////
//this method checks if the navigation sidebar has been "collapsed" or made 
//smaller. If it has then it makes all elements match the style
//////////////////////////////////////////////////////////////////////////////
        navCollapse(){
          //Variables
          var column = document.getElementById("column");
          var breadCrumb = document.getElementById("breadC");
          var home = document.getElementById("home1");
          var colors = document.getElementById("colors");
          var homeAfter = document.getElementById("HOME");
          var userList = document.getElementById("UserList");
          var addUser = document.getElementById("addUser");
          var h1 = document.getElementsByTagName("h1")[0];
          var collapse = document.getElementById("sidebar-collapse");
          var collapseButton = document.getElementById("collapse");
          var line = document.getElementById("line");
          var circle = document.getElementsByClassName("circle-icon")[0];

          if(column.style.width == "42px")
          {
          //When Collapsed
            collapse.style.width = "42px";
            breadCrumb.style.marginLeft = "42px";
            userList.style.left = "60px";
            addUser.style.left = "78px";
            h1.style.left = "78px";
            document.getElementById("dropdown").style.display = "none";
            collapseButton.className = "fas fa-angle-double-right";
            line.style.width = "30px";
            line.style.left = "5px";
            circle.style.left = "10px";
          //On Hover When Collapsed
            colors.style.display = "block";
            homeAfter.className = "home-after";
            home.className = "active-after";
          }else{
          //Back to Full
            userList.style.left = "210px";
            collapse.style.width = "190px";
            addUser.style.left = "225px";
            h1.style.left = "225px";
            breadCrumb.style.marginLeft = "189px";
            home.className = "active";
            homeAfter.className = "home";
            colors.style.display = "none";
            collapseButton.className = "fas fa-angle-double-left";
            line.style.width = "167px";
            line.style.left = "10px";
            circle.style.left = "80px";
          }
          }, 
//////////////////////////////////////////////////////////////////////////////
//This method activates upon a button being pushed and it makes the size of 
//the navigation bar much smaller
//////////////////////////////////////////////////////////////////////////////
        columnCollapse(){
            var column = document.getElementById("column");
            if(column.style.width == "190px")
            {
              column.style.width = "42px";
            }else{
              column.style.width = "190px";
            } 
          },
        
        
//////////////////////////////////////////////////////////////////////////////
//this method controls whether or not the navigation elements are displayed, 
//if the button is pushed then the elements are either displayed or hidden 
//depending on what they were already doing
//////////////////////////////////////////////////////////////////////////////
        menuButton(){
            if(document.getElementById("nav").style.display !== "block"){
                document.getElementById("nav").style.display = "block";
                document.getElementById("sidebar-collapse").style.display = "block";
            }else{
                document.getElementById("nav").style.display = "none";
                document.getElementById("dropdown").style.display = "none";
                document.getElementById("sidebar-collapse").style.display = "none";
            }
          }, 
//////////////////////////////////////////////////////////////////////////////
//These methods change the value of whether or not these elements are displayed
//every time each one os hovered over. 
//////////////////////////////////////////////////////////////////////////////
        homeShow(){
          if(document.getElementById("column").style.width == "42px")
          {
            this.homeButton = !this.homeButton;
          }else{
            this.homeButton = false;
          }
          },


        aboutShow(){
          if(document.getElementById("column").style.width == "42px")
          {
            this.aboutButton = !this.aboutButton;
          }
          else{
            this.aboutButton = false;
          }
          },

        settingsShow(){
          if(document.getElementById("column").style.width == "42px")
          {
            this.settingsDropdown = !this.settingsDropdown;
          }else{
            this.settingsDropdown = false;
          }
          },
//////////////////////////////////////////////////////////////////////////////
//These methods change the value of whether or not the elemts are displplayed
//every time they are hovered over, but it adds a timer before this action is 
//executed
//////////////////////////////////////////////////////////////////////////////
        homeShow1(){
          if(document.getElementById("column").style.width == "42px")
          {
            this.homeT = setTimeout(()=> this.homeButton = !this.homeButton, 50);
          }else{
            this.homeButton = false;
          }
          },
        

        aboutShow1(){
          if(document.getElementById("column").style.width == "42px")
          {
            this.aboutT = setTimeout(()=> this.aboutButton = !this.aboutButton, 50);
          }else{
            this.aboutButton = false;
          }
          },

        settingsShow1(){
          if(document.getElementById("column").style.width == "42px")
          {
            this.settingsT = setTimeout(()=> this.settingsDropdown = !this.settingsDropdown, 50);
          }else{
            this.settingsDropdown = false;
          }
          },
//////////////////////////////////////////////////////////////////////////////
//These methods make the elements that are being displayed stay displayed until 
//the user decides to hover off of them
//////////////////////////////////////////////////////////////////////////////
        homeTrue(){
          if(document.getElementById("column").style.width == "42px")
          {
            this.homeButton = true;
            clearTimeout(this.homeT);
          }
          },

        aboutTrue(){
          if(document.getElementById("column").style.width == "42px")
          {
            this.aboutButton = true;
            clearTimeout(this.aboutT);
          }
          },

        settingsTrue(){
          if(document.getElementById("column").style.width == "42px")
          {
            this.settingsDropdown = true;
            clearTimeout(this.settingsT);
          }
          }
    },
//////////////////////////////////////////////////////////////////////////////
//Everything inside of the updated section is executed everytime data or the 
//page updates
//////////////////////////////////////////////////////////////////////////////
    updated(){
      this.navCollapse();
      }
}
</script>

<style scoped>
/*-----------------------------------------------------------------
Header File
-----------------------------------------------------------------*/
#logo{
    height: 40px;
    background-color: rgb(255, 255, 255);
    position: absolute;
    top: 10px;
    left: 15px;
  }
#all{
  overflow-y: hidden!important;
  }

.header{
    line-height: 28px;
    background-color: rgb(255, 255, 255);
    text-align: center;
    padding: 20px;
    height: 56px;
    color: rgb(34, 44, 50);
    overflow-y: hidden!important;
  }
#column{
    float: left;
    height: 100%;
    width: 190px;
    position: fixed;
    border-right: 1px solid rgb(193, 193, 193);
    background-color: rgb(239, 239, 239);
    border-collapse: collapse;
    overflow-y: hidden!important;
  }
#nav {
    list-style: none;
    z-index: 2;
  }
  
#nav a {
    color: #585858;
    text-decoration: none;
    height: 38px;
    display: block;
    text-align: left;
    background-color: transparent;
    font-size: 13px;
    line-height: 36px;
    float: left;
    width: 100%;
    font-weight: 400;
    border: 1px solid rgb(213, 213, 213);
    border-top: none;
    border-right: none;
    background-color: rgb(247, 247, 247);
    padding-left: 4px;
    border-left: 3px solid transparent;
  }
.active{
    background-color: white!important; 
    height: 39px!important;
    z-index: 2;
    border-top: 1px solid rgb(213, 213, 213)!important;
    color: #585858!important;
  }

.home::after{
    display: block;
    content: "";
    position: absolute;
    right: 0;
    top: 4px;
    border: 8px solid transparent;
    border-right-color: #e54469;
    border-width: 14px 10px;
    z-index: 5;
  }


.active::after{
    border: 2px solid rgb(229, 68, 105); 
    display: inline-block;
    content: "";
    position: fixed;
    height: 37px;
    margin-left: 112px;
    margin-top: -1px;
    z-index: 3;
  }

#nav a:hover{
    background-color: rgb(255, 255, 255);
    position: relative;
    border-left: 3px solid rgb(220, 43, 87);
  }
.active:hover{
    color: #585858!important;;
  }
.nav-image{
    height: auto;
    background-color:  transparent;
    z-index: 2;
    font-size: small;
    padding-right: 5px;
    margin-top: 10px;
  }
.nav-arrow{
    height: auto;
    background-color: transparent;
    color: #585858;
    padding-left: 95px;
    font-size: medium;
  }

/*These will be used to change color on hover, while not adding this affect to the Home element*/
#about a:hover{
    color: rgb(220, 43, 87)!important;
  }
#settings a:hover{
    color: rgb(220, 43, 87)!important;
  }
/*------------------------------------------------------------------
From Dropdown
------------------------------------------------------------------*/
#dropdown{
  background-color: rgb(255, 255, 255);
  width: 100%;
  top: 100%;
  height: auto;
  display: none;
  float: left;
  font-size: 0.7rem;
  text-align: left;
  list-style: none;
  border: none;
  text-decoration: none;
  }

.dropdown-item{
  line-height: 32px;
  height: 32px;
  align-items: left;
  font: 10.5px "Open Sans";
  width: 100%;
  clear: both;
  text-align: left;
  border: none;
  border-bottom: 1px dotted rgb(221, 221, 221);
  padding: 7px 0px 9px 37px;
  background-color:rgb(255, 255, 255)!important;
  position: relative;
  }
.dropdown-item::before{
    color: rgb(140, 175, 205);
    content: "....";
    font-size: 7px;
    position: absolute;
    left: 19px;
    top: 10px;
  }
.dropdown-item:hover::before{
  content: "»";
  color:#e54469;
  font-size: 15px;
  top: 7px;
  left: 16px;
  background-color: white;
  z-index: 5;
  line-height: 15px;
  }
.dropdown-item a::before{
    border-left: 1px dotted rgb(140, 175, 205)!important;
    content: "";
    position: absolute;
    top: 0px;
    bottom: 0px;
    left: 18px;
  }
.dropdown-item a{
  text-decoration: none;
  color: #616161;
  }

.dropdown-item a:hover{
  color: rgb(220, 43, 87);
  }

.line{
  width: 189px;
  border-bottom: 1px solid black;
  content: "";
  }
/*------------------------------------------------------------------
For Closing / Minimizing of the Header 
------------------------------------------------------------------*/
#sidebar-collapse{
  border: 1px solid rgb(217, 217, 217);
  color: rgb(217, 217, 217);
  padding: 3px 0px;
  height: 27px;
  position: relative;
  text-align: center;
  line-height: 1.5;
  border-collapse: collapse;
  width: 190px;
  }
#collapse{
  color: rgb(173, 173, 173);
  z-index: 3!important;
  }
.circle-icon {
    background: white;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    text-align: center;
    line-height: 17px;
    vertical-align: top;
    border: 1px solid rgb(173, 173, 173);
    z-index: 10!important;
    position: absolute;
    left: 80px;
  }
#line{
    border-bottom: 1px solid rgb(173, 173, 173);
    width: 167px;
    position: absolute;
    top: 12px;
    left: 10px;
    z-index: 1!important;
  }
#home2{
  position: absolute;
  left: 42px;
  top: 94px;
  z-index: 5;
  }

#home2-top a{
  color: rgb(23, 77, 154);
  text-decoration: none;
  height: 39px;
  padding: 0px 16px 0px 7px;
  text-align: left;
  background-color: transparent;
  font-size: 13px;
  line-height: 36px;
  float: left;
  width: 100px;
  font-weight: 400;
  border: 1px solid rgb(213, 213, 213);
  border-top: none;
  border-right: none;
  background-color: rgb(247, 247, 247);
  padding-left: 24px;
  }

#about2{
  position: absolute;
  left: 42px;
  top: 132px;
  z-index: 5;
  }
#about2-top a{
  color: rgb(23, 77, 154);
  text-decoration: none;
  height: 38px;
  padding: 0px 16px 0px 7px;
  text-align: left;
  background-color: transparent;
  font-size: 13px;
  line-height: 36px;
  float: left;
  width: 100px;
  font-weight: 400;
  border: 1px solid rgb(213, 213, 213);
  border-top: none;
  border-right: none;
  background-color: rgb(247, 247, 247);
  padding-left: 24px;
  }
#settings2{
  position: absolute;
  left: 42px;
  top: 170px;
  z-index: 5;
  }
#settings2-top a{
  color: rgb(23, 77, 154);
  text-decoration: none;
  height: 38px;
  padding: 0px 16px 0px 7px;
  text-align: left;
  background-color: transparent;
  font-size: 13px;
  line-height: 36px;
  float: left;
  width: 100px;
  font-weight: 400;
  border: 1px solid rgb(213, 213, 213);
  border-top: none;
  border-right: none;
  background-color: rgb(247, 247, 247);
  padding-left: 24px;
  } 
.settings2-dropdown{
  line-height: 32px;
  height: 32px;
  align-items: left;
  font: 10.5px "Open Sans";
  width: 100%;
  clear: both;
  text-align: left;
  border: none;
  border-bottom: 1px dotted rgb(221, 221, 221);
  padding: 7px 0px 9px 37px;
  background-color:rgb(255, 255, 255)!important;
  position: relative;
  }
.settings2-dropdown a{
  text-decoration: none;
  color: #616161;
  }
#colors{
  display: none;
  }
#square{
  color: #e54469;
  margin: 0 auto;
  font-size: 30px;
  position: absolute;
  left: 7px;
  top: 3px;
  }

.home-after::after{
    display: block;
    content: "";
    position: absolute!important;
    right: 0;
    top: 46px;
    border: 8px solid transparent;
    border-right-color: #e54469;
    border-width: 10px 6px;
  }
.active-after::after{
    border: 2px solid rgb(229, 68, 105)!important; 
    display: inline-block;
    content: "";
    position: fixed;
    height: 34px;
    margin-left: 31px;
    margin-top: -72px;
    z-index: 3;
    color: #585858!important;
  }
#menu{
  display: none;
  }
</style>
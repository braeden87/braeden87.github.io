//////////////////////////////////////////
//              Variables
//////////////////////////////////////////
const codeButton = document.getElementsByClassName("codeButton");

var slideIndex = 1;

//////////////////////////////////////////
//              Functions
//////////////////////////////////////////
// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}
// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}
function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
}

//////////////////////////////////////////
//              Event Listeners
//////////////////////////////////////////
//Event Listener for when  See Code button is pushed (1st project)
codeButton[0].addEventListener("click", () =>{
    slideIndex = 1;
    showSlides(slideIndex);
    if(document.getElementsByClassName("slideshow-container")[0].style.display == "block"){
        document.getElementsByClassName("slideshow-container")[0].style.display = "none";
        document.getElementsByClassName("dotList")[0].style.display = "none";

    }else{
        document.getElementsByClassName("slideshow-container")[0].style.display = "block";
        document.getElementsByClassName("dotList")[0].style.display = "inline-block";
    }
});
//Event Listener for when  See Code button is pushed (2nd project)
codeButton[1].addEventListener("click", () =>{
    slideIndex = 7;
    showSlides(slideIndex);
    if(document.getElementsByClassName("slideshow-container")[1].style.display == "block"){
        document.getElementsByClassName("slideshow-container")[1].style.display = "none";
        document.getElementsByClassName("dotList")[1].style.display = "none";

    }else{
        document.getElementsByClassName("slideshow-container")[1].style.display = "block";
        document.getElementsByClassName("dotList")[1].style.display = "inline-block";
    }
});
//Event Listener for when  See Code button is pushed (3rd project)
codeButton[2].addEventListener("click", () =>{
    slideIndex = 11;
    showSlides(slideIndex);
    if(document.getElementsByClassName("slideshow-container")[2].style.display == "block"){
        document.getElementsByClassName("slideshow-container")[2].style.display = "none";
        document.getElementsByClassName("dotList")[2].style.display = "none";

    }else{
        document.getElementsByClassName("slideshow-container")[2].style.display = "block";
        document.getElementsByClassName("dotList")[2].style.display = "inline-block";
    }
});


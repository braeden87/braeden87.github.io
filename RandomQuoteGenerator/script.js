//////////////////////////////////////////////////////
//                 Variables
//////////////////////////////////////////////////////
const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");
let count = 0;

//////////////////////////////////////////////////////
//                 Functions
//////////////////////////////////////////////////////
//Show Loading Spinner
function showLoadingSpinner(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}
//Hide Loading Spinner
function hideLoadingSinner(){
    if(!loader.hidden){
        quoteContainer.hidden = false;
        loader.hidden = true;
    }
}
//Get Quote From API
async function getQuote(){
    showLoadingSpinner();
    //created my own proxy server (proxyUrl)
    const proxyUrl = "https://afternoon-anchorage-87737.herokuapp.com/";
    const apiUrl = "http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json";
    try{
        const response = await fetch(proxyUrl + apiUrl);
        const data = await response.json();
        //if author field is blank, add "Unknown"
        if(data.quoteAuthor === ""){
            authorText.innerText = "Unknown";
        }else{
            authorText.innerText = data.quoteAuthor;
            document.getElementById("authorInput").value = data.quoteAuthor;
        }
        //Reduce font size for long quotes
        if(data.quoteText.length > 120){
            quoteText.classList.add("long-quote");
        }else{
            quoteText.classList.remove("long-quote");
        }
        quoteText.innerText = data.quoteText;
        document.getElementById("quoteInput").value = data.quoteText;
        //Stop Loader and Show Quote
        hideLoadingSinner();
        count = 0;
    }catch(error){
        console.log("Whoops, no quote", error);
        count++;
        if(count < 10){getQuote();}
    }
}
//Tweet Quote
function tweetQuote(){
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterUrl, "_blank");
}

//////////////////////////////////////////////////////
//                 Event Listeners
//////////////////////////////////////////////////////
//Event Listener for when the New Quote Button is pushed
newQuoteBtn.addEventListener("click", getQuote);
//Event Listener for when the Twitter Button is pushed
twitterBtn.addEventListener("click", tweetQuote);

//onLoad
getQuote();

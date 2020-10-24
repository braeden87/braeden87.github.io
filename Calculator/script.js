//////////////////////////////////////////
//              Variables
//////////////////////////////////////////
const calculatorDisplay = document.querySelector("h1");
const inputButtons = document.querySelectorAll("button");
const clearButton = document.getElementById("clear-button");
const ul = document.querySelector("ul");
//Calculate first and second values depending on operator
const calculate = {
    "/": (firstNumber, secondNumber) => firstNumber / secondNumber,
    "*": (firstNumber, secondNumber) => firstNumber * secondNumber,
    "+": (firstNumber, secondNumber) => firstNumber + secondNumber,
    "-": (firstNumber, secondNumber) => firstNumber - secondNumber,
    "=": (firstNumber, secondNumber) => secondNumber,
};
//Changeable Variables
let firstValue = 0;
let operatorValue = "";
let awaitingNextValue = false;
let calculation = 0;
let toFile = "";
let count = 0;

//////////////////////////////////////////
//              Functions
//////////////////////////////////////////
//Send number value every button push to display
function sendNumberValue(number){
    //Replace current display value if first value is entered
    if(awaitingNextValue){
        calculatorDisplay.textContent = number;
        awaitingNextValue = false;
    }else{
    //If current display value is 0, replace it, if not add number
    const displayValue = calculatorDisplay.textContent;
    calculatorDisplay.textContent = displayValue === "0" ? number :
    displayValue + number;
    }
}
//Checks to see if a decimal is needed after the 
//decimal button has been pushed
function addDecimal(){
    //If operator pressed, don't add decimal
    if(awaitingNextValue) return;
    //If no decimal, add one
    if(!calculatorDisplay.textContent.includes(".")){
        calculatorDisplay.textContent = `${calculatorDisplay.textContent}.`;
    }
}
//Operator
function useOperator(operator){
    const currentValue = Number(calculatorDisplay.textContent);

    //Prevent multile operators
    if(operatorValue && awaitingNextValue){
        operatorValue = operator;
        return;
    }

    //Assign First Value if no Value
    if(!firstValue) {
        firstValue = currentValue;
    }else{
        calculation = calculate[operatorValue](firstValue, currentValue);
        if(operatorValue.toString() != "="){
            toFile = firstValue.toString() + " " + operatorValue.toString() + " " + currentValue.toString() + " = " + calculation.toString();
            saveData(toFile);
            readData();
        }
        calculatorDisplay.textContent = calculation;
        firstValue = calculation;
    }

    //Ready for next value, store operator
    awaitingNextValue = true;
    operatorValue = operator;
}
//Reset all values / Display (Clear Button)
function resetAll() {
    firstValue = 0;
    operatorValue = "";
    awaitingNextValue = false;  
    calculatorDisplay.textContent = "0";
}
//Save Information to local storage
function saveData(data){
    localStorage.setItem("Calculations List", data);
    count++;
}
//Reading Information from local storage
function readData(){
        let listItem = document.createElement("li");
       listItem.textContent = localStorage.getItem("Calculations List");
       console.log("listItem", listItem.textContent);
       console.log(count);
       ul.prepend(listItem);
}

//////////////////////////////////////////
//              Event Listeners
//////////////////////////////////////////
//Add Event Listeners for Numbers, Operators, Decimals
inputButtons.forEach((inputButton) =>{
    if(inputButton.classList.length === 0){
        inputButton.addEventListener("click", () => sendNumberValue(inputButton.value));
    }else if(inputButton.classList.contains("operator")){
        inputButton.addEventListener("click", () => useOperator(inputButton.value));
    }else if(inputButton.classList.contains("decimal")){
        inputButton.addEventListener("click", () => addDecimal());
    }
});
//Event Listener (Clear Button)
clearButton.addEventListener("click", resetAll);


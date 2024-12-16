/* This script is designed to emulate the functionality and operations of a basic calculator, similar to one you can find on your phone. Functionality consists of the following: 1) Core operations such as +, -, /, * 2) Additions such as Clear, Backspace and percentages, 3) a hyphen to value swap */
/* Core steps consist of the following
1. Display Management - updating the calculator to show the numbers on the screen once selected
2. Number Handling - Appending the numbers when selected
3. Operation Handling - the ability to use operator functions to change and adjust the different types of calcualtions that are possible
4. Calculate the result of all operations
5. Clear Screen - reset all once AC is selected
6. Ability to utilize special functions such as % or +/-
*/

//Name base variables
let currentNumber = ""
let previousNumber = ""
let operator = null; 

//Set up the display with MOD
const display = document.getElementById("Screen")

//Function to update the display
function updateDisplay (value){
    display.textContent = value || "0"
    //This indicates that the display will either show our new global change variable called value or it will be a standard 0 if there is none/cleared
}
// Function to append numbers
function appendNumbers (number) {
    if(number === "." && currentNumber.includes(".")) return; // if . already exists then return nothing
    currentNumber+=number
    updateDisplay(currentNumber);
}

//Function to set operator buttons in place for calculation
function setOperator (op)
    if(currentNumber === "") return;
    if(previousNumber !== "") calculateNumbers;
    operator = op
    previousNumber = currentNumber;
    currentNumber = ""

//Function to calculate
function calculateNumbers() {
    const prevValue  = parseFloat(previousNumber) // need to parse these into floats, since the . above is technically coming from stirng values
    const currentValue = parseFloat(currentNumber)
    let result; // this leaves it null in preparation for the case caluse to determine the operator and calculation used

    switch(operator) {
        case "+":
            result = prevValue + currentValue;
            break;

        case "-":
            result = prevValue - currentValue
            break;

        case "*":
            result = prevValue * currentValue
            break;

        case "/":
            result = prevValue / currentValue
            break;
    }

    currentNumber = result.toString()
    operator = null;
    previousNumber = ""
    updateDisplay(currentNumber)


}

//Function to Clear Calculator
function clearCalculator (func) {

}

//Function for a percentage button
function ToggleSign (func) {


}

//Function for a value change button
function  ChangePercent (func) {


}
//Event Listeners for HTML buttons 
document.querySelectorAll("button").forEach((button)=> { //Loop in all of the button types in HTMK
    button.addEventListener("click", () => {
        const number = button.dataset.number;
        const op = button.dataset.operator;
        const func = button.dataset.function;

        // Next add in case notation so that each button knows the corresponding variables
        if(number !== undefined) appendNumbers(number); // if there is a number selected, use append function to add it to the number for calculation
        if(op !== undefined) setOperator(op) // if there is an operator selected, function to set operator for calculation
        //if clauses specifically for the different function types
        if(func === "Clear") clearCalculator;
        if(func === "ToggleSign") ToggleSign;
        if(func === "Percent") ChangePercent;
    });
});
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

    //will show the current number and operator until the next number is selected
    if(operator) {
        updateDisplay(`${previousNumber} ${operator} ${currentNumber}`)
    }
    updateDisplay(currentNumber);
}

//Function to set operator buttons in place for calculation
function setOperator (op) {
    if(currentNumber === "") return;
    if(previousNumber !== "") {
        calculateNumbers();
    }
    operator = op
    previousNumber = currentNumber;
    currentNumber = ""
    updateDisplay(`${previousNumber} ${operator}`)
}

updateDisplay("0") // have the display set up at 0
updateDisplay(`${previousNumber} ${operator}`)

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
        // add a defaullt case that sets to current number if for some reason it does not work
        default:
            result = currentValue
    }

    //Round the numbers
    result = parseFloat(result.toFixed(3))
    currentNumber = result.toString()
    operator = null;
    previousNumber = ""
    updateDisplay(currentNumber)

}

//Function to Clear Calculator
function clearCalculator () {
    previousNumber = ""
    currentNumber = ""
    operator = null
    updateDisplay("0");

}

//Function for a percentage button
function ToggleSign () {
    currentNumber = (parseFloat(currentNumber)*-1).toString()
    updateDisplay(currentNumber);

}

//Function for a value change button
function  ChangePercent () {
    currentNumber = (parseFloat(currentNumber)/100).toString()
    updateDisplay(currentNumber);

}
//Event Listeners for HTML buttons 
document.querySelectorAll("button").forEach((button)=> { //Loop in all of the button types in HTMK
    button.addEventListener("click", () => {
        const number = button.dataset.number;
        const op = button.dataset.operator;
        const func = button.dataset.function;

        // Next add in case notation so that each button knows the corresponding variables
        if(number !== undefined) appendNumbers(number); // if there is a number selected, use append function to add it to the number for calculation
        if (op !== undefined) {// if there is an operator selected, function to set operator for calculation
            if (op === "Calculate") {
                calculateNumbers();
            } else {
                setOperator(op);// ensures that if an operator is selected, and if its calculate it supersedes all other operators and calculates
            }
        }
        //if clauses specifically for the different function types
        if(func === "Clear") clearCalculator();
        if(func === "ToggleSign") ToggleSign();
        if(func === "Percent") ChangePercent();

        console.log()
    });
});

//Need to add keyboard functionalit too
document.addEventListener("keydown", (e) => {
    const key = e.key;

    if(!isNaN(key) || key === ".") {
        appendNumbers(key) // if the key pressed is not NA or a ., have it go through like the screen buttons
    } else if (key === "+" || key === "-" || key === "*" || key === "/" ) {
        setOperator(key)
    } else if (key === "Enter" || key === "=") {
        calculateNumbers();
    } else if (key === "c" || key === "Escape") {
        clearCalculator();
    }

});

//set display as 0
updateDisplay("0") // have the display set up at 0


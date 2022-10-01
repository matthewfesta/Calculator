// Define variables and constants

let runningTotal = 0;
let displayNum = '0';
let previousOperator = null;
const screen = document.querySelector('.result-output');


const click = (button) => {
    // Check if the button is a number:
    if (isNaN(parseInt(button))) {
        handleOperator(button) 
    }
    else {
        handleNumber(button) 
    }
    // Call the function to update the display:
    updateDisplay();
}

const handleNumber = (button) => {
    if (displayNum === '0') {
        // If the display number is 0, replace it with the button number
        displayNum = button;
    } else {
        // Otherwise, append the button number to the display number string
        displayNum += button;
    }
}

const handleOperator = (button) => {
    switch(button) {
        case 'C':
            displayNum = '0';
            runningTotal = 0;
            break;
        case '=':
            if (previousOperator === null) {
                return; // At lease two nums are necessary for an equation
            }
            // Pass the display num as an integer and flush the operation
            const intDisplay = parseInt(displayNum);
            flushOperation(intDisplay); 
            // Reset the operator
            previousOperator = null;
            // Set the running total to the display number
            displayNum = +runningTotal; // convert to number 
            // Reset the running total
            runningTotal = 0;
            break;
        case '←':
            if (displayNum.length === 1) {
                // If the display number is only one digit, reset it. 
                displayNum = '0';
            }
            else {
                // Otherwise, remove the last digit
                displayNum = displayNum.substring(0, displayNum.length - 1);
            }
            break;
        // Do arithmetic operations for the other operators
        case '+':
        case '-':
        case 'x':
        case '÷':
            handleCalc(button);
            break;
    }
}


const handleCalc = (button) => {
    if (displayNum === '0') {
        // Do nothing if the display number is 0
        return;
    }

    const intDisplay = parseInt(displayNum);
    if (runningTotal === 0) {
        // If the running total is 0, set it to the display number
        runningTotal = intDisplay;
    } else {
        // Otherwise, flush the operation
        flushOperation(intDisplay)
    }

    // Set the previous operator to the button
    previousOperator = button;
    // Reset the display number
    displayNum = '0';
}

const flushOperation = (intDisplay) => {
    // Perform the calculation depending on the previously imputed operator
        switch (previousOperator) {
            case '+':
                runningTotal += intDisplay;
                break;
            case '-':
                runningTotal -= intDisplay;
                break;
            case 'x':
                runningTotal *= intDisplay;
                break;
            case '÷':
                runningTotal /= intDisplay;
                break;
        }

}

const updateDisplay = () => {
    // Update the screen with the display number
    screen.innerText = displayNum;
}


// Define the initialization function
const init = () => {
    // Get the tags from the document and add the event listener to the buttons
    document
        .querySelector('.calculator-buttons')
        .addEventListener('click', function(event) {
            // Pass the event target button to the button click function
            click(event.target.innerText);
        });
}   

init();

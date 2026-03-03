let number1 = null;
let number2 = null;
let operator = null;
let error = false;

function add(num1, num2) {
    return num1 + num2;
}

function subtract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2) {
    return num1 / num2;
}

function operate(num1, num2, operator) {
    switch(operator) {
        case "+":
            return add(num1, num2);
        case "-":
            return subtract(num1, num2);
        case "*":
            return multiply(num1, num2);
        case "/":
            if (num2 === 0) {
                return null;
            }
            return divide(num1, num2);
        default:
            return null;
    }
}

function clearDisplay() {
    let calcDisplay = document.querySelector(".calc-display");
    calcDisplay.textContent = "";
}

function updateDisplay(value) {
    let calcDisplay = document.querySelector(".calc-display");
    calcDisplay.textContent = calcDisplay.textContent + value;
}

function pressDigit(event) {
    if (error) {
        return;
    }
    let value = event.target.textContent;
    let calcDisplay = document.querySelector(".calc-display");
    if (value === "." && calcDisplay.textContent.includes(".")) {
        return;
    }
    if (operator === null && number2 === null) { // state 1 updating number1
        updateDisplay(value);
        if (calcDisplay.textContent.length > 15) {
            number1 = parseFloat(parseFloat(calcDisplay.textContent).toFixed(14));
            clearDisplay();
            updateDisplay(number1);
        } else {
            number1 = parseFloat(calcDisplay.textContent);
        }

    } else if (number1 !== null && operator !== null && number2 === null) { // enter state 3 clear screen and update number2
        clearDisplay();
        updateDisplay(value);
        if (calcDisplay.textContent.length > 15) {
            number2 = parseFloat(parseFloat(calcDisplay.textContent).toFixed(14));
            clearDisplay();
            updateDisplay(number2);
        } else {
            number2 = parseFloat(calcDisplay.textContent);
        }
    } else if (number1 !== null && operator !== null && number2 !== null) { // staying in state 3 update number2
        updateDisplay(value);
        if (calcDisplay.textContent.length > 15) {
            number2 = parseFloat(parseFloat(calcDisplay.textContent).toFixed(14));
            clearDisplay();
            updateDisplay(number2);
        } else {
            number2 = parseFloat(calcDisplay.textContent);
        }
    }
}

function pressOperator(event) {
    if (error) {
        return;
    }
    let op = event.target.textContent;
    // in state 2 only update the operator
    if (number2 === null && op !== "=") {
        operator = op;
    }
    // in state 3 can operate on numbers using operator
    if (number1 !== null && number2 !== null) {
        number1 = operate(number1, number2, operator);
        if (number1 === null) {
            error = true;
            clearDisplay();
            updateDisplay("ERROR: Cannot divide by 0! Press AC");
            return;
        }
        number2 = null; // set the state back to 2
        if (op !== "=") {
            operator = op;
        }

        
        if (String(number1).length > 15) {
            number1 = parseFloat(number1.toFixed(14));
        } else {
            number1 = parseFloat(number1.toFixed(14));
        }
        clearDisplay();
        updateDisplay(number1);
    }
}

function AC(event) {
    number1 = null;
    number2 = null;
    operator = null;
    clearDisplay();
    error = false;
}

function pressDel(event) {
    let calcDisplay = document.querySelector(".calc-display");
    if (calcDisplay.textContent.length > 0) {
        calcDisplay.textContent = calcDisplay.textContent.slice(0, calcDisplay.textContent.length - 1);
        if (number2 === null) {
            number1 = parseFloat(calcDisplay.textContent);
        } else if (number2 !== null) {
            number2 = parseFloat(calcDisplay.textContent);
        }
    }
}

let digitButtons = document.querySelectorAll(".digit");
digitButtons.forEach(button => button.addEventListener("click", pressDigit));

let ACButton = document.querySelector(".AC");
ACButton.addEventListener("click", AC);

let opButtons = document.querySelectorAll(".op");
opButtons.forEach(button => button.addEventListener("click", pressOperator));

let delButton = document.querySelector(".back-space");
delButton.addEventListener("click", pressDel);
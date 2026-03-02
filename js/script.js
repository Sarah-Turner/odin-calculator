let number1 = null;
let number2 = null;
let operator = null;

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
    let value = event.target.textContent;
    let calcDisplay = document.querySelector(".calc-display");
    updateDisplay(value);
    number1 = parseInt(calcDisplay.textContent);
    console.log(number1);
}

function AC(event) {
    number1 = null;
    number2 = null;
    operator = null;
    clearDisplay();
}

let digitButtons = document.querySelectorAll(".digit");
digitButtons.forEach(button => button.addEventListener("click", pressDigit));

let ACButton = document.querySelector(".AC");
ACButton.addEventListener("click", AC);
const screen = document.getElementById('field');
screen.textContent = 0;
const numpad = document.querySelectorAll('.white');
const fieldScreen = document.getElementById('field-sign');
const controls = document.querySelectorAll('.orange');
let screenValue = '';
let sign = '';
let startOver = false;


// Calling a function to fill the screen when numbers are being pressed.
for (let i = 0; i < numpad.length; i++) {
    numpad[i].addEventListener('click', () => {
        populate(numpad[i]);
    });
}

// Keyboard support
document.addEventListener('keydown', function(event) {
    for (let i = 0; i < numpad.length; i++) {
        if (numpad[i].textContent == event.key) {
            populate(numpad[i]);
        } else if (event.key == 'Backspace') {
            screen.textContent = 0;
        } else if (event.key == 'Enter') {
            fieldScreen.textContent = '='
            operate(sign, screenValue, screen.textContent);
            screenValue = screen.textContent;
            sign = '';
        }
    }
})

// Calling a function to perform calculations when controls keys are being pressed.
for (let i = 0; i < controls.length; i++) {
    controls[i].addEventListener('click', () => {
        if (controls[i].textContent == 'AC') {
            clearScreen();
        } else if (controls[i].textContent == '+/-') {
            changeSign();
        } else if (controls[i].textContent == '%') {
            percent();
        } else if (controls[i].textContent == '+') {
            evaluate('+');
        } else if (controls[i].textContent == '×') {
            evaluate('×');
        } else if (controls[i].textContent == '÷') {
            evaluate('÷');
        } else if (controls[i].textContent == '-') {
            evaluate('-');
        } else if (controls[i].textContent == '=') {
            fieldScreen.textContent = '='
            operate(sign, screenValue, screen.textContent);
            screenValue = screen.textContent;
            sign = '';
        }
    })
}

function add(a, b) {
    a = +(a)
    b = +(b)
    let result = (a + b).toString()
    screen.textContent = convert(result);
}

function subtract(a, b) {
    let result = (a - b).toString()
    screen.textContent = convert(result);
}

function multiply(a, b) {
    let result = (a * b).toString();
    screen.textContent = convert(result);
}

function divide(a, b) {
    if (b == 0) {
        clearScreen();
        fieldScreen.textContent = 'Can\'t divide by zero';
    } else {
        let result = (a / b).toString()
        screen.textContent =  convert(result);
    }
    
}

function percent() {
    screen.textContent = screen.textContent / 100;
    screenValue = screen.textContent;
}

function changeSign() {
    screen.textContent *= -1;
    screenValue *= -1;
}

// Clears all existing data.
function clearScreen() {
    sign = '';
    screenValue = 0;
    fieldScreen.textContent = '';
    screen.textContent = 0;
    startOver = false;
}

// Main function to perform calculations.
function operate(operator, a, b) {
    if (operator == '+') {
        add(a, b);
    } else if (operator == '-') {
        subtract(a, b);
    } else if (operator == '×') {
        multiply(a, b);
    } else if (operator == '÷') {
        divide(a, b);
    } else if (operator == '%') {
        percent(a);
    }
    startOver = true;
}

// Function to fill up the screen.
function populate(btn) {
    // If true clears the screen and allows a new value to be entered.
    if (startOver) {
        screen.textContent = 0;
        startOver = false;
    }
    
    // Handles the first input when the initial value is zero.
    if (screen.textContent == 0) {
        if (btn.textContent == '.') {
            checkForCompliance(btn);
        } else if (screen.textContent.length > 1) {
            screen.textContent += btn.textContent;
        } else {
            screen.textContent = btn.textContent;
        }
    } else {
        checkForCompliance(btn);    
    }
}

function checkForCompliance(btn) {
    // Limit the amount of characters allowed for displaying.
    if (screen.textContent.length >= 11) {
        return;
    }
    // Check if there is already a period in the displayed value.
    if (screen.textContent.includes('.') && btn.textContent == '.') {
        return;
    } else {
        screen.textContent += btn.textContent;
    }
}

// Secondary function to help with sign management .
function evaluate(operator) {
    fieldScreen.textContent = operator;
    if (sign == operator) {
        operate(sign, screenValue, screen.textContent);
        screenValue = screen.textContent;
    } else if (!sign) {
        sign = operator;
        screenValue = screen.textContent;
        startOver = true;
    } else {
        operate(sign, screenValue, screen.textContent)
        sign = operator;
        screenValue = screen.textContent;
    }
}

// Prevents big numbers from overflowing the screen.
function convert(result) {
    if (result.length > 9) {
        result = parseFloat(result);
        return result.toExponential(1);
    } else {
        return result;
    }
}


const screen = document.getElementById('field');
screen.textContent = 0;
const numpad = document.querySelectorAll('.white');
const fieldScreen = document.getElementById('field-sign');
const controls = document.querySelectorAll('.yellow');
let screenValue = '';
let sign = '';
let startOver = false;



for (let i = 0; i < numpad.length; i++) {
    numpad[i].addEventListener('click', () => {
        populate(numpad[i]);
    });
}

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

function clearScreen() {
    sign = '';
    screenValue = 0;
    fieldScreen.textContent = '';
    screen.textContent = 0;
    startOver = false;
}

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

function populate(btn) {
    // If true clears the screen and allows a new value to be entered.
    if (startOver) {
        screen.textContent = 0;
        startOver = false;
    }
  
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
    if (screen.textContent.length >= 13) {
        return;
    }
    // Check if there is already a period in the displayed value.
    if (screen.textContent.includes('.') && btn.textContent == '.') {
        return;
    } else {
        screen.textContent += btn.textContent;
    }
}

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

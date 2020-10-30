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
    screen.textContent = a + b;
}

function subtract(a, b) {
    screen.textContent = a - b;
}

function multiply(a, b) {
    screen.textContent = a * b;
}

function divide(a, b) {
    screen.textContent =  a / b;
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
    if (startOver) {
        screen.textContent = 0;
        startOver = false;
    }
  
    if (screen.textContent == 0) {
        if (btn.textContent == '.') {
            if (screen.textContent.includes('.')) {
                screen.textContent = screen.textContent;
            } else {
                screen.textContent += btn.textContent;
            }
        } else if (screen.textContent.length > 1) {
            screen.textContent += btn.textContent;
        } else {
            screen.textContent = btn.textContent;
        }
    } else if (screen.textContent.length >= 13) {
        screen.textContent = screen.textContent;
    } else {
        if (btn.textContent == '.' && screen.textContent.includes('.')) {
            screen.textContent = screen.textContent;
        } else {
            screen.textContent += btn.textContent;
        }      
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


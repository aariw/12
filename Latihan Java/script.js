const calculator = {
    displayValue: '0',
    first0perand: null,
    waitingForSecond0perand: false,
    operator: null,
};
function inputDigit(digit) {
    const { displayValue, waitingForSecond0perand } = calculator;
    if (waitingForSecond0perand === true) {
        calculator.displayValue = digit;
        calculator.waitingForSecond0perand = false;
    } else {
        calculator.displayValue=displayValue === '0' ? digit : displayValue + digit;
    }
}
function inputDecimal(dot) {
    if (calculator.waitingForSecond0perand === true) {
      calculator.displayValue = "0."
      calculator.waitingForSecond0perand = false;
      return  
    }
if (!calculator.displayValue.includes(dot)) {
    calculator.displayValue += dot;
}   
}
function handle0perator (next0perator) {
    const { first0perand, displayValue, operator} = calculator
    const inputValue = parseFloat(displayValue);
    if (operator && calculator.waitingForSecond0perand) {
        calculator.operator = next0perator;
        return;
    }
    if (first0perand == null && !isNaN(inputValue)) {
        calculator.first0perand = inputValue;
    } else if (operator) {
        const result = calculate(first0perand, inputValue, operator);
        calculator.displayValue = '${parseFloat(result.toFixed(7))}';
        calculator.first0perand = result;
    }
    calculator.waitingForSecond0perand = true;
    calculator.operator = next0perator;
}
function calculate(first0perand, second0perand, operator){
    if (operator === '+') {
        return first0perand + second0perand;
    } else if (operator === '-') {
        return first0perand - second0perand;
    } else if (operator === '*') {
        return first0perand * second0perand;
    } else if (operator === '/') {
        return first0perand / second0perand;
    }
    return second0perand
}
function resetCalculator() {
    calculator.displayValue = '0';
    calculator.first0perand = null;
    calculator.waitingForSecond0perand = false;
    calculator.operator = null;
}
function updateDisplay() {
    const display = document.querySelector('.calculator-keys');
    keys.addEventListener('click', event => {
        const { target } = event;
        const { value } = target;
        if (!target.matches('button')) {
            return;
        }
        switch(value) {
            case '+':
            case '-':
            case '*':
            case '/':
            case '=':
            handle0perator(value);
            break;
            case '.':
            inputDecimal(value);
            break;
            case 'all-clear':
            resetCalculator();
            break;
            default:
            if (Number.isInteger(parseFloat(value))) {
                inputDigit(value);
            }

        }
        updateDisplay();
    });
}
const display = document.querySelector('.display');
const displayPara = document.createElement('p');
let displayValue = '0';
displayPara.textContent = displayValue;
function updateDisplay(char){ // from buttons
    if(typeof char === 'string'){
        if(char !== '=') displayValue += char;
        else{

        }
    }
    else if(typeof char == 'number'){
        if(displayValue !== '0') displayValue += char;
        else displayValue = char;
    }
    displayPara.textContent = displayValue;
}
display.appendChild(displayPara);

function add(a, b) {
    return a + b;   
}
function subtract(a, b){
    return a - b;
}
function multiply(a, b){
    return a * b;
}
function divide(a, b){
    return a / b;    
}

function operate(a, b, operation){
    let answer;
    switch (operation) {
        case '+':
            answer = add(a,b);
            break;
        case '-':
            answer = subtract(a,b);
            break;
        case '*':
            answer = multiply(a,b);
            break;
        case '/':
            answer = divide(a,b);
            break;
    }
    return answer;
}


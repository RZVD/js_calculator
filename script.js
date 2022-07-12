const display = document.querySelector('.display');
const displayPara = document.createElement('p');
let displayValue = '0';
displayPara.textContent = displayValue;

let nums = [];

let order = [];

let previousOperation = false;
let isFloatingPoint = false;
function isOperator(char) {
    return ['+','-','*','÷'].some( op => char === op);
}

function process(char){
    let newStr = '';
    let i;
    if(char[0] === '-' || char[0] === '+') {
        i = 1;
        newStr += char[0];
    }
    else i = 0;  
    for (i ; i < char.length; i++) {
        const element = char[i];
        if(isOperator(element)){
            order.push(element);
            newStr += ' ';
        }
        else newStr += element;
    }
    return newStr;
}

function reduce(){
    let n = order.length;
    for(let i = 0; i < n; i++){
        let step = operate(nums[0], nums[1], order[0])
        nums.shift();
        nums.shift();
        nums.unshift(step);
        order.shift();
        
    }
    return nums[0];
}

function evaluate(char){
    isFloatingPoint = false;
    nums = process(char).split(' ').map(x => parseFloat(x));
    let ans = Math.floor(reduce() * 100) / 100;
    displayValue = ans;
}

function updateDisplay(char){ // from buttons
    let maybeNumber = parseFloat(char);
    if(!isNaN(maybeNumber)){
        if(displayValue === '0') displayValue = char;
        else displayValue += char;
    }
    else{
        if(isOperator(char)){
            if(isOperator(displayValue[displayValue.length - 1])) {
                displayValue = displayValue.slice(0, -1) + char;
            }
            else if(!previousOperation){
                displayValue += char;
                previousOperation = true;
            }
            else{
                evaluate(displayValue);
                displayValue += char;
            }
        }
        else{
            if(char === 'Clear') {
                displayValue = '0';
                nums = [];
                order = [];
                previousOperation = false;
            }
            else if(char === 'Delete'){ 
                if(displayValue.length >= 2) {
                    displayValue = displayValue.slice(0, -1);
                }
                else displayValue = '0';
            }
            else if(char === '.' && !isFloatingPoint){
                displayValue += char;
                isFloatingPoint = true;
            }
            else{
                evaluate(displayValue);
                nums = [];
                order = [];
                previousOperation = false;
            }
        }
    }
    displayPara.textContent = displayValue;
}
display.appendChild(displayPara);


function divByZero(){
    alert("can't divide by 0");
    updateDisplay('Clear');
}
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
    return b === 0 ? divByZero() : a / b;    
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
        case '÷':
            answer = divide(a,b);
            break;
    }
    return answer;
}

const buttons = document.querySelectorAll('button');
buttons.forEach(button => {
    button.addEventListener('click', () => {
        updateDisplay(button.textContent);
    });
});
window.addEventListener('keydown', ()=>{
    console.log(event.which);
    switch (event.which) {
        case 48:
            updateDisplay('0');
            break;
        case 49:
            updateDisplay('1');
            break;
        case 50:
            updateDisplay('2');
            break;
        case 51:
            updateDisplay('3');
            break;
        case 52:
            updateDisplay('4');
            break;
        case 53:
            updateDisplay('5');
            break;
        case 54: 
            updateDisplay('6');
            break;
        case 55:
            updateDisplay('7');
            break;
        case 56: 
            if(event.shiftKey) updateDisplay('*');
            else updateDisplay('8');   
            break;
        case 57:
            updateDisplay('9');
            break;                                 
        case 187:
            if(event.shiftKey) updateDisplay('+')
            else updateDisplay('=');
        break;
        case 189:
            updateDisplay('-');
        break;
        case 13:
            updateDisplay('=');
        break;
        case 191:
            updateDisplay('÷');
            break;
        case 8:
            updateDisplay('Delete');
            break;
        case 27:
            updateDisplay('Clear');
            break;
        default:
            break;
    }
});
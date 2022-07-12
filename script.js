const display = document.querySelector('.display');
const displayPara = document.createElement('p');
let displayValue = '0';
displayPara.textContent = displayValue;

let nums = [];

let order = [];


let previousOperation = false;


function isOperator(char) {
    return ['+','-','*','÷'].some( op => char === op);
}

function process(char){
    let newStr = '';
    for (const element of char) {
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
    nums = process(char).split(' ').map(x => parseInt(x));
    let ans = reduce();
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
            }
            else if(char === 'Delete'){ 
                if(displayValue.length >= 2) {
                    displayValue = displayValue.slice(0, -1);
                }
                else displayValue = '0';
            }
            else{
                evaluate(displayValue);
            }
        }
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
    return b === 0 ? null : a / b;    
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

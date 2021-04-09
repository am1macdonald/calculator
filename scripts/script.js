let numberArray = [];
let storageArray= [];
function workingNumber(){
    return parseFloat(numberArray.join(''));
};
let accumulator = 0;
let numberButtons = document.querySelectorAll(".number");
numberButtons.forEach(button => {
    button.addEventListener('click', (event) => {
        if (numberArray.length < 12) {
            if (button.name === '.') {
                if (numberArray.includes('.')){
                    return;
                } else if (numberArray.length === 0) {
                    numberArray.push('0', '.');
                } else {
                    numberArray.push('.');
                };
            } else if (button.name === '0' && numberArray.length === 0){
                return;
            } else if (typeof parseInt(button.name) === 'number') {
                numberArray.push(button.name);
            };
            updateDisplay();
        console.log(button.name, numberArray);
        } else return;
    });
});
let operationButtons = document.querySelectorAll(".function");

operationButtons.forEach(operation => {
    operation.addEventListener('click', (event) => {
        switch (operation.id) {
            case 'clear':
                clearArray();
                break;
            case 'clear-all':
                clearArray();
                accumulator = 0;
                break;
            case 'inverse':
                break;
            case 'square':
                break;
            case 'square-root':
                break;
            case 'multiply':
                console.log('multiply');
                if (workingNumber() > 0){
                    accumulator = workingNumber();
                    return accumulator;
                };
                break;
            case 'divide':
                break;
            case 'plus':
                accumulator = added(workingNumber());
                break;
            case 'minus':
                break;
            case 'equals':
                accumulator === 0 ? document.getElementById('display').innerText = numberArray.join('') : document.getElementById('display').innerText = accumulator;
        };
    });
});

function clearArray() {
   numberArray = [];
    document.getElementById('display').innerText = 0;
};
function updateDisplay() {
    document.getElementById('display').innerText = numberArray.join('');
};

function operate(num1, num2, func){

};
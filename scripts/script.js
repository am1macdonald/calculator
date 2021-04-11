let numberArray = [];
let storageArray= [];
let display = document.getElementById('display');
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
        
});
function appendToArray(sign) {
    if (true) {
        storageArray.push(workingNumber(), sign);
        clearArray();
    }
};
function clearArray() {
    numberArray = [];
    display.innerText = 0;
};
function updateDisplay() {
    display.innerText = numberArray.join('');
};


/*Switch candy for later...
switch (operation.id) {
    case 'clear':
        clearArray();
        break;
    case 'clear-all':
        clearArray();
        storageArray = [];
        accumulator = 0;
        break;
    case 'inverse':
        break;
    case 'square':
        break;
    case 'square-root':
        break;
    case 'multiply':
        appendToArray('*');
        break;
    case 'divide':
        appendToArray('/');
        break;
    case 'plus':
        appendToArray('+');
        break;
    case 'minus':
        appendToArray('-');
        break;
    case 'equals':
        break;
};
});*/
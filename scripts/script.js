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
        if (operation.name === '='){
            appendToArray();
            console.log(storageArray, '=');
        } else if (numberArray.length > 0) {
            appendToArray(operation.name);
            console.log(storageArray);
        };
    });
        
});
function appendToArray(sign) {
    storageArray.push(workingNumber());
    clearArray();
    if (!sign) {
        storageArray.push(sign);       
    };
    
    
};
function clearArray() {
    numberArray = [];
    display.innerText = 0;
};
function updateDisplay() {
    display.innerText = numberArray.join('');
};
function addEmUp(a, b) {
    return a + b;
};
function subtractEm(a, b) {
    return a - b;
};
function multiplyEm(a, b) {
    return a * b;
};
function divideAndConquer(a, b) {
    return a / b;
};
function operate(a ,b, operator) {
    switch (operator) {
        case 'multiply':
            multiplyEm(a, b);
        break;
    case 'divide':
            divideAndConquer(a, b);
        break;
    case 'plus':
        addEmUp(a, b);
        break;
    case 'minus':
        subtractEm(a, b);
        break;

    }
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
    
    case 'equals':
        break;
};
});*/
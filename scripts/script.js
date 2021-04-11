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
        if (storageArray.length === 3 || operation.name === '=') {
            let operateArr = storageArray.splice(0,2);
            console.log(operateArr);
            operate(operateArr[0], operateArr[2], operateArr[1]);
        }
        else if(numberArray.length > 0){
            switch (operation.id) {
                case 'clear':
                    clearArray();
                    break;
                case 'clear-all':
                    clearArray();
                    storageArray = [];
                    accumulator = 0;
                    break;
                case 'square':
                    console.log(workingNumber());
                    let squared = workingNumber() * workingNumber();
                    numberArray = squared.toString().split('');
                    display.innerText = squared.toString();
                    break;
                case 'square-root':
                    let rooted = Math.sqrt(workingNumber());
                        numberArray = rooted.toString().split('');
                        display.innerText = rooted.toString();
                    break;

            };
        };
        console.log('numberArray: ', numberArray, 'storageArray: ', storageArray);
    });
        
});
function appendToArray(sign) {
    numberArray.length > 0 ? storageArray.push(workingNumber()) : false;
    clearArray();
    sign ? storageArray.push(sign) : false;
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
    };
};


/*Switch candy for later...
switch (operation.id) {
    
};
});*/
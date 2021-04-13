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
            updateDisplay(workingNumber());
        console.log(button.name, numberArray);
        } else return;
    });
});
let operationButtons = document.querySelectorAll(".function");

operationButtons.forEach(operation => {
    operation.addEventListener('click', (event) => {
        if (numberArray.length > 0) {
            storageArray.push(workingNumber());
            clearArray();
        } else if (storageArray.length === 0) {
            storageArray.push(0);
        };
        if (storageArray.length === 1) {
            storageArray.push(operation.id);
        } else if (storageArray === 3) {
            operate(storageArray[0],storageArray[2],storageArray[1]);
        };



        console.log('numberArray: ', numberArray, 'storageArray: ', storageArray);
    });
});
function clearArray() {
    numberArray = [];
    display.innerText = 0;
};
function updateDisplay(num) {
    display.innerText = num;
};
function addEmUp(a, b) {
    storageArray = [a + b];
    updateDisplay(storageArray[0]);
};
function subtractEm(a, b) {
    storageArray = [a - b];
    updateDisplay(storageArray[0]);
};
function multiplyEm(a, b) {
    storageArray = [a * b];
    updateDisplay(storageArray[0]);
};
function divideAndConquer(a, b) {
    storageArray = [a / b];
    updateDisplay(storageArray[0]);
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

/*

    if (operation.id != 'equals' || !storageArray.length != 1) {
        appendToArray();
    };
    if (storageArray.length >= 3 && /[+\-/*=]/.test(operation.name)) {
            let operateArr = storageArray.splice(0,3);
            console.log("operateArr: ", operateArr);
            operate(operateArr[0], operateArr[2], operateArr[1]);
        }
        else if(numberArray.length > 0 || storageArray.length > 0){
            switch (operation.id) {
                case 'plus':
                    appendToArray(operation.id);
                    break;
                case 'minus':
                    appendToArray(operation.id);
                    break;
                case 'multiply':
                    appendToArray(operation.id);
                    break;
                case 'divide':
                    appendToArray(operation.id);
                    break;
                case 'square':
                    let squared = workingNumber() * workingNumber();
                    numberArray = squared.toString().split('');
                    display.innerText = squared.toString();
                    break;
                case 'square-root':
                    let rooted = Math.sqrt(workingNumber());
                        numberArray = rooted.toString().split('');
                        display.innerText = rooted.toString();
                    break;
                case 'clear':
                    clearArray();
                    break;
                case 'clear-all':
                    clearArray();
                    storageArray = [];
                    accumulator = 0;
            };
        };
        console.log('numberArray: ', numberArray, 'storageArray: ', storageArray);
    });

*/
let numberArray = []
let storageArray= []
let accumulator = 0

const workingNumber = () => {
    return parseFloat(numberArray.join(''));
}

const display = document.getElementById('display')
const numberButtons = document.querySelectorAll(".number")
const functionButtons = document.querySelectorAll(".function")
const modifyButtons = document.querySelectorAll('.modify')

numberButtons.forEach(button => {
    button.addEventListener('click', (event) => {
        if (numberArray.length < 10) {
            if (button.name === '.') {
                if (numberArray.includes('.')){
                    return
                } else if (numberArray.length === 0) {
                    numberArray.push('0', '.')
                } else {
                    numberArray.push('.');
                }
            } else if (button.name === '0' && numberArray.length === 0){
                return
            } else {
                numberArray.push(button.name)
            }
            updateDisplay(workingNumber())
        console.log(button.name, numberArray)
        } else return
    })
})

functionButtons.forEach(operation => {
    operation.addEventListener('click', (event) => {
        numberButtons.forEach(button => button.disabled = false)
        if (numberArray.length > 0) {
            storageArray.push(workingNumber())
            clearArray()
        } else if (storageArray.length === 0) {
            storageArray.push(0)
        }
        if (storageArray.length === 1) {
            storageArray.push(operation.id)
        } else if (storageArray.length === 3) {
            operate(storageArray[0],storageArray[2],storageArray[1])
            storageArray.push(operation.id)
        }
        console.log('numberArray: ', numberArray, 'storageArray: ', storageArray)
    })
})

modifyButtons.forEach(button => {
    button.addEventListener('click', event => {
        switch (button.id) {
            case 'clear':
                clearArray()
                break;
            case 'clear-all':
                clearArray()
                storageArray = []
                break
            case 'square':
                numberButtons.forEach(button => button.disabled = true)
                let squared = workingNumber() * workingNumber()
                numberArray = squared.toString().split('')
                updateDisplay(squared)
                break
            case 'square-root':
                numberButtons.forEach(button => button.disabled = true)
                let rooted = Math.sqrt(workingNumber())
                numberArray = rooted.toString().split('')
                updateDisplay(rooted)
                break
            case 'equals':
                equals()
                break
        }
    })
})

function equals(){
    if (storageArray.length === 0 & workingNumber() != 'undefined'){
        storageArray.push(workingNumber())
        numberButtons.forEach(button => button.disabled = true)
        clearArray()
        updateDisplay(storageArray[0])
    } else if (storageArray.length === 2){
        storageArray.push(workingNumber())
        clearArray()
        operate(storageArray[0], storageArray[2], storageArray[1])
    } else {
        display.innerText = 'ERROR'
        numberButtons.forEach(button => button.disabled = true)
    }
}

function clearArray() {
    numberButtons.forEach(button => button.disabled = false)
    numberArray.length === 0 ? storageArray = [] : false
    numberArray = []
    display.innerText = 0
}

function updateDisplay(num) {    
    if(num >= Math.pow(10, 99) || num <= Math.pow(10, -99)){
        display.innerText = "ERROR"
    }
    else if(num.toString().length >= 10) {
        display.innerText = num.toExponential(4)
    } 
    else {
        display.innerText = +num.toFixed(4)
    }
}

function addEmUp(a, b) {
    console.log("addemup: ", a + b)
    storageArray = [a + b]
    updateDisplay(storageArray[0])
}

function subtractEm(a, b) {
    storageArray = [a - b]
    updateDisplay(storageArray[0])
}

function multiplyEm(a, b) {
    storageArray = [a * b]
    updateDisplay(storageArray[0])
}

function divideAndConquer(a, b) {
    storageArray = [a / b]
    updateDisplay(storageArray[0])
}

function operate(a, b, operator) {
    console.log(storageArray)
    switch (operator) {
        case 'multiply':
            multiplyEm(a, b)
        break
    case 'divide':
            divideAndConquer(a, b)
        break
    case 'plus':
        addEmUp(a, b)
        break
    case 'minus':
        subtractEm(a, b)
        break
    }
}

const windowWidth = window.innerWidth
const mediaQuery = window.matchMedia("(max-width: 425px)")
const functionButtonDiv = document.getElementById('functions')
const buttons = document.getElementById('buttons')
const equalsButton = document.getElementById('equals');

function moveEquals() {
    if (mediaQuery.matches) {
        equalsButton.remove()
        buttons.append(equalsButton)
    } else {
        equalsButton.remove()
        functionButtonDiv.append(equalsButton)
    }
}

mediaQuery.addEventListener("change", () => {
    moveEquals()
})

moveEquals()
const display = document.getElementById('display')
const numberButtons = document.querySelectorAll(".number")
const clearButton = document.getElementById('clear')
const clearAllButton = document.getElementById('clear-all')
const squareButton = document.getElementById('square')
const rootButton = document.getElementById('square-root')


const inputsManager = (() => {

    let inputArr = [];
    let storageArr = [];

    const inputNumber = () => { 
        return parseFloat(inputArr.join(''))
    }

    const appendNumber = (str) => {
        if (inputArr.length < 10) {
            if (str === '.') {
                if (inputArr.includes('.')) {
                    return
                } else if (inputArr.length === 0) {
                    inputArr.push('0', '.')
                } else {
                    inputArr.push('.');
                }
            } else if (str === '0' && inputArr.length === 0) {
                return
            } else {
                inputArr.push(str)
            }
        } else return

        console.log('inputArr: ', inputArr)
    }

    const clearInput = () => {
        inputArr = []
        console.log('inputArr: ', inputArr)
    }

    const clearStorage = () => {
        storageArr = []
        console.log('storageArr: ', storageArr)
    }
    const storeNum = () => {
        if (inputNumber() === NaN) {
            return NaN
        } else if (storageArr.length === 0 || storageArr.length === 2) {
            storageArr.push(inputNumber());
            clearInput()
            console.log('storage array: ', storageArr)
        }
    }

    const getWorkingNumber = () => {
        if (inputArr.length > 0) {
            return inputNumber()
        } else if (storageArr.length === 1 || storageArr.length === 3) {
            return storageArr.pop()
        }
    }

    const setWorkingNumber = (num) => {
        inputArr = String(num).split('')
        console.log(inputArr)
    }

    const replaceStored = () => {

    }

    return {
        appendNumber,
        clearInput,
        clearStorage,
        storeNum,
        getWorkingNumber,
        setWorkingNumber,
        storageArr
    }

})()

const stateManager = (() => {

    const disableNumbers = (state) => {
        numberButtons.forEach(button => {
            if (state) {
                button.disabled = true
            } else if (!state) {
                button.disabled = false
            }
        })
    } 

    return {
        disableNumbers
    }

})()

const mathFunctions = (() => {

    const squareIt = (num) => {
        return num * num
    }

    const rootIt = (num) => {
        return Math.sqrt(num)
    }

    const addIt = (a, b) => {
        return a + b
    }

    const subtractIt = (a, b) => {
        return a - b
    }

    const multiplyIt = (a, b) => {
        return a * b
    }

    const divideIt = (a, b) => {
        return a / b
    }
    return {
        squareIt,
        rootIt,
        addIt,
        subtractIt,
        multiplyIt,
        divideIt
    }

})()

const listeners = (() => {

    numberButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            console.log(button.name)
            inputsManager.appendNumber(button.name)
        })
    })

    clearButton.addEventListener('click', () => {
        inputsManager.clearInput()
        stateManager.disableNumbers(false)
    })

    clearAllButton.addEventListener('click', () => {
        inputsManager.clearInput()
        inputsManager.clearStorage()
        stateManager.disableNumbers(false)
    })

    squareButton.addEventListener('click', () => {
        stateManager.disableNumbers(true)
        let num = mathFunctions.squareIt(inputsManager.getWorkingNumber())
        inputsManager.setWorkingNumber(num)
    })

    rootButton.addEventListener('click', () => {
        stateManager.disableNumbers(true)
        let num = mathFunctions.rootIt(inputsManager.getWorkingNumber())
        inputsManager.setWorkingNumber(num)
    })

})()









const windowWidth = window.innerWidth
const mediaQuery = window.matchMedia("(max-width: 440px)")
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
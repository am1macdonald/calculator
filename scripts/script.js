const display = document.getElementById('display')
const numberButtons = document.querySelectorAll(".number")
const clearButton = document.getElementById('clear')
const clearAllButton = document.getElementById('clear-all')
const squareButton = document.getElementById('square')
const rootButton = document.getElementById('square-root')
const multiplyButton = document.getElementById('multiply')
const divideButton = document.getElementById('divide')
const addButton = document.getElementById('add')
const subtractButton = document.getElementById('subtract')

const inputsManager = (() => {

    let inputArr = []
    let storageArr = []
    let temp = undefined

    // returns a number from the input array
    const numFromInput = () => { 
        if (inputArr.length > 0) {
            return parseFloat(inputArr.join(''))
        } else {
            return 0
        }
    }

    // controls how digits and characters are added to the input
    const appendToInputArr = (str) => {
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

    // clears the input array
    const clearInput = () => {
        inputArr = []
        console.log('inputArr: ', inputArr)
    }

    // clears the storage array
    const clearStorage = () => {
        storageArr = []
        console.log('storageArr: ', storageArr)
    }

    const clearFunction = () => {
        curriedFunc = undefined
        console.log('curriedFunc: ', curriedFunc)
    }

    // stores the number input
    const storeNum = () => {
        if (numFromInput() === NaN) {
            return NaN
        } else if (storageArr.length === 0 || storageArr.length === 2) {
            storageArr.push(numFromInput());
            clearInput()
            console.log('storageArr: ', storageArr)
        }
    }

    // gets the most recent number input
    const getWorkingNumber = () => {
        if (inputArr.length > 0) {
            return numFromInput()
        } else if (storageArr.length === 1 || storageArr.length === 3) {
            return storageArr.pop()
        }
    }

    // sets the given number up for editing in inputArr
    const setWorkingNumber = (num) => {
        inputArr = String(num).split('')
        console.log(inputArr)
    }

    const replaceStored = (num) => {
        storageArr[0] = num
    }


    // sets the operator and a var up for currying
    const curryFunc = (operation) => {
        return function (a) {
            return function (b) {
                return operation(a, b)
            }
        }
    }

    // make sure to store the number!!!
    const handleOperator = (operation) => {

        if (temp === undefined) {
            temp = curryFunc(operation)(storageArr[0])
            storageArr = []
        } else {
            storageArr = [temp(storageArr[0])]
            temp = undefined
        }
        console.log(temp, storageArr)
    }



    return {
        appendToInputArr,
        clearInput,
        clearStorage,
        clearFunction,
        storeNum,
        getWorkingNumber,
        setWorkingNumber,
        handleOperator
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
            inputsManager.appendToInputArr(button.name)
        })
    })

    clearButton.addEventListener('click', () => {
        inputsManager.clearInput()
        stateManager.disableNumbers(false)
    })

    clearAllButton.addEventListener('click', () => {
        inputsManager.clearInput()
        inputsManager.clearStorage()
        inputsManager.clearFunction()
        stateManager.disableNumbers(false)
    })

    squareButton.addEventListener('click', () => {
        stateManager.disableNumbers(true)
        inputsManager.handleOperator(mathFunctions.squareIt)
    })

    rootButton.addEventListener('click', () => {
        stateManager.disableNumbers(true)
        inputsManager.handleOperator(mathFunctions.rootIt)
    })

    multiplyButton.addEventListener('click', () => {
        stateManager.disableNumbers(false)
        inputsManager.handleOperator(mathFunctions.multiplyIt)
    })

    divideButton.addEventListener('click', () => {
        stateManager.disableNumbers(false)
        inputsManager.handleOperator(mathFunctions.divideIt)
    })

    addButton.addEventListener('click', () => {
        stateManager.disableNumbers(false)
        inputsManager.handleOperator(mathFunctions.addIt)
    })

    subtractButton.addEventListener('click', () => {
        stateManager.disableNumbers(false)
        inputsManager.handleOperator(mathFunctions.subtractIt)
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
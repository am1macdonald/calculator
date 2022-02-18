const display = document.getElementById('display')
const numberButtons = document.querySelectorAll(".number")
const clearButton = document.getElementById('clear')
const clearAllButton = document.getElementById('clear-all')
const squareButton = document.getElementById('square')
const rootButton = document.getElementById('square-root')
const multiplyButton = document.getElementById('multiply')
const divideButton = document.getElementById('divide')
const addButton = document.getElementById('plus')
const subtractButton = document.getElementById('minus')
const equalsButton = document.getElementById('equals')

const numberManager = (() => {

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

    // clears the partial function storage
    const clearTemp = () => {
        temp = undefined
        console.log('temp: ', temp)
    }

    // gets the most recent number input
    const getWorkingNumber = () => {
        if (inputArr.length > 0) {
            return numFromInput()
        } 
        else if (storageArr.length > 0) {
            return storageArr.pop()
        }
    }

    // sets the given number up for editing in inputArr
    const setWorkingNumber = (num) => {
        inputArr = String(num).split('')
        console.log('inputArr: ', inputArr)
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
    const handleOperation = (operation) => {
        let num = getWorkingNumber()
        if (typeof num === 'number') {
            if (temp == undefined) {
                temp = curryFunc(operation)(num)
                console.log(temp)
                clearInput()
            } else {
                setWorkingNumber(temp(num))
                clearTemp()
                console.log(temp)
                handleOperation(operation)
            }
        }
    }

    const handleSquares = (func) => {
        let num = getWorkingNumber()
        if (typeof num === 'number') {
            setWorkingNumber(func(num))
        }
        console.log(func)
    }

    const equals = () => {
        if (temp !== undefined) {
            setWorkingNumber(temp(getWorkingNumber()))
            clearTemp()
        }
        showArrays()
    }

    const showArrays = () => {
        console.log('storageArr: ', storageArr)
        console.log('inputArr: ', inputArr)
        console.log('temp: ', temp)
    }

    return {
        appendToInputArr,
        clearInput,
        clearStorage,
        clearTemp,
        getWorkingNumber,
        setWorkingNumber,
        handleOperation,
        handleSquares,
        equals,
        showArrays
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
            numberManager.appendToInputArr(button.name)
        })
    })

    clearButton.addEventListener('click', () => {
        numberManager.clearInput()
        stateManager.disableNumbers(false)
    })

    clearAllButton.addEventListener('click', () => {
        numberManager.clearInput()
        numberManager.clearStorage()
        numberManager.clearTemp()
        stateManager.disableNumbers(false)
    })

    squareButton.addEventListener('click', () => {
        stateManager.disableNumbers(true)
        numberManager.handleSquares(mathFunctions.squareIt)
    })

    rootButton.addEventListener('click', () => {
        stateManager.disableNumbers(true)
        numberManager.handleSquares(mathFunctions.rootIt)
    })

    multiplyButton.addEventListener('click', () => {
        stateManager.disableNumbers(false)
        numberManager.handleOperation(mathFunctions.multiplyIt)
    })

    divideButton.addEventListener('click', () => {
        stateManager.disableNumbers(false)
        numberManager.handleOperation(mathFunctions.divideIt)
    })

    addButton.addEventListener('click', () => {
        stateManager.disableNumbers(false)
        numberManager.handleOperation(mathFunctions.addIt)
    })

    subtractButton.addEventListener('click', () => {
        stateManager.disableNumbers(false)
        numberManager.handleOperation(mathFunctions.subtractIt)
    })

    equalsButton.addEventListener('click', () => {
        stateManager.disableNumbers(true)
        numberManager.equals()
    })
})()

const displayManager = () => {

}

const windowWidth = window.innerWidth
const mediaQuery = window.matchMedia("(max-width: 440px)")
const functionButtonDiv = document.getElementById('functions')
const buttons = document.getElementById('buttons')

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
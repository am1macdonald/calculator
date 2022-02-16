const display = document.getElementById('display')
const numberButtons = document.querySelectorAll(".number")
const clearButton = document.getElementById('clear')
const squareButton = document.getElementById('square')


const inputsManager = (() => {

    let inputArr = [];
    let storageArray = [];

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

    const storeNum = () => {
        if (inputNumber() === NaN) {
            return NaN
        } else if (storageArray.length === 0 || storageArray.length === 2) {
            storageArray.push(inputNumber());
            clearInput()
            console.log('storage array: ', storageArray)
        }
    }

    return {
        inputNumber,
        appendNumber,
        clearInput,
        storeNum
    }

})()

const stateManager = (() => {

    const disableNumbers = () => {
        numberButtons.forEach(button => {
            let state = button.disabled
            console.log(state)
            if (state) {
                button.disabled = false
            } else {
                button.disabled = true
            }
        })
    } 

    return {
        disableNumbers
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
    })



    squareButton.addEventListener('click', () => {

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
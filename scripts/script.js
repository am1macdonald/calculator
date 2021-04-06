function calculate() {
    let numArr = [];
    let numberButton = document.querySelectorAll(".number");
    numberButton.forEach(button => {
        button.addEventListener('click', event => {

            console.log(button.name, numArr);
        })    
    });
};

calculate();
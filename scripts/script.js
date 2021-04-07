function calculate() {
    let numArr = [];
    let numberButton = document.querySelectorAll(".number");
    numberButton.forEach(button => {
        button.addEventListener('click', event => {
            if (button.name === '.') {
                if (numArr.includes('.')){
                    return;
                } else if (numArr.length === 0) {
                    numArr.push('0', '.');
                } else {
                    numArr.push('.');
                };
            } else if(button.name === '0' && numArr.length === 0){
                return;
            } else if (typeof parseInt(button.name) === 'number') {
                console.log('if');
                numArr.push(button.name);
            };          

            console.log(button.name, numArr);
        });
    });
};

calculate();
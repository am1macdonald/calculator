let numArr = [];
let numberButton = document.querySelectorAll(".number");
numberButton.forEach(button => {
    button.addEventListener('click', (event) => {
        if (numArr.length < 12) {
            if (button.name === '.') {
                if (numArr.includes('.')){
                    return;
                } else if (numArr.length === 0) {
                    numArr.push('0', '.');
                } else {
                    numArr.push('.');
                };
            } else if (button.name === '0' && numArr.length === 0){
                return;
            } else if (typeof parseInt(button.name) === 'number') {
                numArr.push(button.name);
            };
        console.log(button.name, numArr);
        document.getElementById('display').innerText = numArr.join('');
        } else return;
    });
});


numInput();
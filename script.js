let nState = 1;
let firstNum = 0;
let secondNum = 0;
let secondNumReady = false;
let alreadyDot = false;
let nOperator = '';
let upDis = '';
let downDis = '';

let add = (a, b) => a + b;
let minus = (a, b) => a - b;
let multiply = (a, b) => a * b;
let divide = (a, b) => a / b;
let mod = (a, b) => a % b;


function operation(a, b, operator) {

    let d = 1e6;
    let result;

    switch (operator) {
        case '+': result = add(a, b); break;
        case '-': result = minus(a, b); break;
        case '*': result = multiply(a, b); break;
        case '/': result = divide(a, b); break;
        case '%': result = mod(a, b); break;
    }

    return Math.round(result * d) / d;
}

function updateState(e) {

    let mVal = e.target.getAttribute('val');
    // 0-9 : Number, 10 = dot, 11-15 : Operator + - * / %, 21 = Equal, 22 = Del, 23 = C

    if (mVal == 23) {   // 'C' Button pressed

        nState = 1;
        firstNum = 0;
        secondNum = 0;
        secondNumReady = false;
        alreadyDot = false;
        nOperator = '';
        upDis = '';
        downDis = '';

        const rDownDis = document.querySelector(".downDisplay");
        rDownDis.textContent = '0';

        const rUpDis = document.querySelector(".upDisplay");
        rUpDis.textContent = '';

    }

    if (mVal == 22) { // 'Del' Button pressed

        if (downDis) {

            if (downDis[downDis.length - 1] == '.') alreadyDot = false;

            downDis = downDis.slice(0, downDis.length - 1);
            const rDownDis = document.querySelector(".downDisplay");
            rDownDis.textContent = (downDis == '') ? '0' : downDis;
        }


        if (nState == 1) firstNum = Number(downDis);
        else {
            secondNum = Number(downDis);
            secondNumReady = true;
        }
    }

    if (mVal >= 0 && mVal <= 10 && downDis.length <= 14) { // Numpad Button pressed
        if (mVal != 10) {
            downDis += mVal;
        }
        else if (!alreadyDot) {
            downDis += '.';
            alreadyDot = true;
        }
        const rDownDis = document.querySelector(".downDisplay");
        rDownDis.textContent = downDis;

        if (nState == 1) firstNum = Number(downDis);
        else {
            secondNum = Number(downDis);
            secondNumReady = true;
        }
    }



    if ((mVal >= 11) && (mVal <= 15)) {   // Operator Button pressed

        // Update Down
        if (nState == 1) {              // There is now firstNum

            const rDownDis = document.querySelector(".downDisplay");
            rDownDis.textContent = '0';

            alreadyDot = false;
            downDis = '';
            nState = 2;
        }
        else if (secondNumReady) {      // There is now secondNum
            downDis = operation(firstNum, secondNum, nOperator); // result
            const rDownDis = document.querySelector(".downDisplay");
            rDownDis.textContent = downDis;


            //let str = downDis.toString();
            //if (str.length > 14) rDownDis.

            
            console.log(rDownDis);
            firstNum = downDis;
            secondNum = 0;
            secondNumReady = false;
            alreadyDot = false;
            downDis = '';
        }

        // Update Up
        if (mVal == 11) { upDis = `${firstNum} +`; nOperator = '+'; }
        if (mVal == 12) { upDis = `${firstNum} -`; nOperator = '-'; }
        if (mVal == 13) { upDis = `${firstNum} *`; nOperator = '*'; }
        if (mVal == 14) { upDis = `${firstNum} /`; nOperator = '/'; }
        if (mVal == 15) { upDis = `${firstNum} %`; nOperator = '%'; }

        const rUpDis = document.querySelector(".upDisplay");
        rUpDis.textContent = upDis;
    }


    if (mVal == 21) {               // '=' Button pressed

        if (nState == 2) {

            // Update Down
            downDis = operation(firstNum, secondNum, nOperator); // result
            const rDownDis = document.querySelector(".downDisplay");
            rDownDis.textContent = downDis;


            // Update Up
            upDis = `${firstNum} ${nOperator} ${secondNum} =`;
            const rUpDis = document.querySelector(".upDisplay");
            rUpDis.textContent = upDis;


            // Prepare for next
            firstNum = downDis;
            secondNum = 0;
            secondNumReady = false;
            alreadyDot = false;
            downDis = '';

            nState = 1;
        }
    }
}

const bCells = Array.from(document.querySelectorAll('.bCell'));
bCells.forEach(key => key.addEventListener('click', updateState));
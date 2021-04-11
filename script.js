

//CALCULATOR FUNCTIONS
function add(a,b){
    return a+b;
}
function subtract(a,b){
    return a-b;
}
function multiply(a,b){
    return a*b;
}
function divide(a,b){
    //NOTE: divide by zero is illigal
    return (a/b).toFixed(2);
}
function power(a,b){
    return a**b;
}
function modulo(a,b){
    return a%b;
}

//OPERATE FUNCTION

function operate(operation,a,b){
    const functionNames = {
        "add":add(a,b),
        "subtract":subtract(a,b),
        "multiply":multiply(a,b),
        "divide":divide(a,b),
        "power":power(a,b),
        "modulo":modulo(a,b)
    }
    return functionNames[operation].toString();  
}

console.log("Testing operate:", operate("add",3,5));



//DECLARE VARIABLES
const screenPrev= document.querySelector("#div-screen-previous");
const screenCurrent= document.querySelector("#div-screen-current");
const numbers = document.querySelectorAll('.btn-num');
const operators = document.querySelectorAll('.btn-op');
const btnDelete = document.querySelector("#delete");
const btnClear = document.querySelector("#ac");
const btnDot = document.querySelector("#dot");
const btnFlipSign = document.querySelector("#flipSign");
const btnEqual = document.querySelector("#equal");
//
let operator ="";
let sign="";
let answer="";
let a = "";
let b = "";
let aDone = false;
let bDone =true; //CHANGED
let showAnswer =false;

//ATTACH EVENTS
numbers.forEach((number) => {
    number.addEventListener('click',numberClicked);
});
operators.forEach((number) => {
    number.addEventListener('click',operatorClicked);
});
btnDelete.addEventListener('click',deleteClicked);
btnClear.addEventListener('click',clearClicked);
btnDot.addEventListener('click',dotClicked);
btnFlipSign.addEventListener('click',flipSignClicked);
btnEqual.addEventListener('click',equalClicked);


//EVENT FUNCTIONS
function numberClicked(event){
    showAnswer=false;
    let numClicked=event.target.getAttribute("data-num"); //string
    if (aDone==false){
        if (a==""){
            a=numClicked;
        }
        else if (a.includes(".") && ((a.indexOf(".")+3)==a.length)){
            console.log("limit of up to 2 decimal points")
        }
        else if (a.length<8){
            a=a+numClicked;
        }
    }
    else if (bDone==false){
        if (b===""){
            b=numClicked;
        }
        else if (b.includes(".") && ((b.indexOf(".")+3)==b.length)){
            console.log("limit of up to 2 decimal points")
        }
        else if (b.length<8){
            b=b+numClicked;
        }
    }
    console.log("a:",a);
    console.log("b: ",b);
    showScreen();
}

function operatorClicked(event){
    showAnswer=false;
    console.log(event.target.getAttribute("data-op"));
    if (answer!="" && a==""){
        a=answer;
    }
    if (a=="" || a=="-"){
        console.log("Need to put number before putting operator")
    }
    else if(operator!=""){
        console.log("You already put an operator"); 
    }
    else{
        aDone=true;
        bDone=false;
        operator=event.target.getAttribute("data-op");
        sign=event.target.textContent;
    }
    showScreen();
}

function deleteClicked(event){
    showAnswer=false; 
    //If delete and a.length+b.length is smaller, then make size larger
    if (aDone==false && !(a=="")){
        let aLength=a.length;
        let aNew = a.substr(0, aLength-1);
        a=aNew;
        console.log("deleted from a");
    }
    else if(bDone==false && !(b=="")){
        let bLength=b.length;
        let bNew = b.substr(0, bLength-1);
        b=bNew;
        console.log("deleted from b");
    }
    //NOTE: delete operator option as well
    console.log("a:",a);
    console.log("b: ",b);
    showScreen();
}

function clearClicked(event){
    screenPrev.textContent="";
    showAnswer=false;
    console.log(event.target.getAttribute("id"));
    operator ="";
    sign="";
    answer="";
    a = "";
    b = "";
    aDone = false;
    bDone =false;
    console.log("a:",a);
    console.log("b: ",b);
    showScreen();
}

function dotClicked(event){
    showAnswer=false;
    console.log(event.target.getAttribute("id"));
    //NOTE: not make beyond 2 decimal points
    if (aDone==false){
        if (a==""){
            a="0.";
        }
        else if (a.includes(".")){
            console.log("already put a point");
        }
        else{
            a=a+".";
        }
    }
    else if (bDone==false){
        if (b==""){
            b="0.";
        }
        else if (b.includes(".")){
            console.log("already put a point");
        }
        else{
            b=b+".";
        }
    }
    console.log("a:",a);
    console.log("b: ",b);
    showScreen();
}


function flipSignClicked(event){
    showAnswer=false;
    console.log(event.target.getAttribute("id"));
    //NOTE: Answer is negative, don't do neg on neg
    //NOTE: 8---5 happens
    if (a=="" && !(answer=="")){
        if (answer[0]=="-"){
            a=answer.substr(1,answer.length);
        }
        else{
            a="-"+answer;
        }
    }
    else if (aDone==false){
        if (a=="" && answer==""){
            a="-";
        }
        else{
            if (a[0]=="-"){
                a=a.substr(1,a.length);
            }
            else{
                a="-"+a;
            }
        }
    }
    else if (bDone==false){
        if (b==""){
            b="-";
        }
        else{
            if (b[0]=="-"){
                b=b.substr(1,b.length);
            }
            else{
                b="-"+b;
            }
        }
    }
    console.log("a:",a);
    console.log("b: ",b);
    showScreen();
}


function equalClicked(event){
    console.log(event.target.getAttribute("id"));
    //NOTE: in case only 'a' put 
    //      in case nothing put
    //      in case operator put and 'b' not put
    //      in case one of them finished in '.' ex. 2+54.
    //      operation has sign and operation because of sign and operation 3*-4 (maybe can ignore)
    if (!(b=="") && b!="-"){
        screenPrev.textContent=screenCurrent.textContent;
        console.log("gonna operate: ",operator);
        answer=operate(operator,Number(a),Number(b));
        if (answer.length>10){
            answer=answer.substr(0,8);
        }
        
        showAnswer=true;
        operator=""
        sign=""
        bDone=true;
        aDone=false;
        a="";
        b="";
        showScreen();
    }
    else{
        console.log("please enter a valid equation");
    }
}


function showScreen(){
    screenCurrent.textContent=a+sign+b;
    if ((a.length+b.length)>10){
        screenCurrent.style.fontSize = '35px'; 
    }
    else{
        screenCurrent.style.fontSize = '60px';
    }
    if (showAnswer==true){
        screenCurrent.textContent=answer;
    }
}


function findCurrent(){
    if(aDone==false){
        return a;
    }
    else if(bDone==false){
        return b; //make this shorter: no else if
    }
}


//NOTES:

//  Instead of doing seperate 'a' and then 'b', send current number as argument
//have function findCurrent() that finds if we are on 'a' or on 'b'
//  Make answer incapable  of being longer than 10 or something

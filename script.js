

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
    if (b!=0){
        return (a/b).toFixed(2);
    }
    
}
function power(a,b){
    return a**b;
}
function modulo(a,b){
    if (b!=0){
        return a%b;
    }
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
const message = document.querySelector("#div-message");
//
let operatorName ="";
let operatorSign="";
let answer="";
let a = "";
let b = "";
let aDone = false;
let bDone =true;
let showAnswer =false;
let showMessage = false;


//ATTACH EVENTS
window.addEventListener("click", event => {
    if (showMessage == true) {
        message.style.backgroundColor="var(--primary)";
    }
    else{
        message.style.backgroundColor="white";
    }
    showMessage=false;
});
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
    let variable=findCurrent();
    let numClicked=event.target.getAttribute("data-num"); //string
    if (variable==""){
        variable=numClicked;
    }
    else if (variable.includes(".") && ((variable.indexOf(".")+3)==variable.length)){
        console.log("limit of up to 2 decimal points")
        showMessage=true;
        message.textContent="Limit of up to 2 decimal points";

    }
    else if (variable.length<8){
        variable=variable+numClicked;
    }
    updateCurrent(variable);
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
        console.log("Need to put number before putting operator");
        message.textContent="Need to put number before putting operating";
        showMessage=true;
    }
    else if(operatorName!=""){
        console.log("You already put an operator"); 
        message.textContent="You already put an operator";
        showMessage=true;
    }
    else{
        aDone=true;
        bDone=false;
        operatorName=event.target.getAttribute("data-op");
        operatorSign=event.target.textContent;
    }
    showScreen();
}

function deleteClicked(event){
    showAnswer=false; 
    let variable=findCurrent();
    //On 'a' or 'b'
    if (variable!=""){
        let varLength=variable.length;
        let varNew = variable.substr(0, varLength-1);
        variable=varNew;
        updateCurrent(variable);
    }
    //On operator
    else if (variable=="" && operatorSign!=""){
        operatorSign="";
        operatorName=""
        aDone=false;
        bDone=true;
    }
    console.log("a:",a);
    console.log("b: ",b);
    showScreen();
}

function clearClicked(event){
    screenPrev.textContent="";
    showAnswer=false;
    console.log(event.target.getAttribute("id"));
    operatorName ="";
    operatorSign="";
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
    let variable = findCurrent();
    if (variable==""){
        variable="0.";
    }
    else if (variable.includes(".")){
        console.log("already put a point");
        message.textContent="You already put a point";
        showMessage=true;
    }
    else{
        variable=variable+".";
    }
    updateCurrent(variable);
    console.log("a:",a);
    console.log("b: ",b);
    showScreen();
}


function flipSignClicked(event){
    showAnswer=false;
    console.log(event.target.getAttribute("id"));
    let variable = findCurrent();
    if (a=="" && !(answer=="")){ //make answer flip sign: ans=3 -> -3___
        if (answer[0]=="-"){
            a=answer.substr(1,answer.length);
        }
        else{
            a="-"+answer;
        }
    }
    else if (aDone==false || bDone==false){ //make variable flip sign
        if (findCurrent()==a && a=="" && answer==""){ //no variable or answer put yet: ___ -> -___
            a="-"
        }
        else{
            if (variable==""){ //flip sign of empty variable: 3+__ -> 3+-__
                variable="-";
            }
            else{
                if (variable[0]=="-"){ //flip sign of negative 3+-2 -> 3+2
                    variable=variable.substr(1,variable.length); 
                }
                else{ //flip sign of positive 3+2 -> 3+-2
                    variable="-"+variable;
                }
            }
            updateCurrent(variable);
        }
    }
    
    console.log("a:",a);
    console.log("b: ",b);
    showScreen();
}


function equalClicked(event){
    console.log(event.target.getAttribute("id"));
    if (!(b=="") && b!="-" && (b!="0" || operatorName!="divide")&& (b!="0" || operatorName!="modulo")){
        screenPrev.textContent=screenCurrent.textContent;
        console.log("gonna operate: ",operatorName);
        answer=operate(operatorName,Number(a),Number(b));
        if (answer.length>10){
            answer=answer.substr(0,8);
        }
        
        showAnswer=true;
        operatorName=""
        operatorSign=""
        bDone=true;
        aDone=false;
        a="";
        b="";
        showScreen();
    }
    else{
        console.log("please enter a valid equation");
        if (!(b=="0" && operatorName=="divide" ) && !(b=="0" && operatorName=="modulo")){
            message.textContent="Please enter a valid equation";
            showMessage=true;
        }
        else{
            message.textContent="Can't divide by zero";
            showMessage=true;
        }
    }
}


//HELPER FUNCTIONS
function showScreen(){
    screenCurrent.textContent=a+operatorSign+b;
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

function updateCurrent(variable){
    if (findCurrent()==a){
        a=variable;
    }
    else{
        b=variable;
    }
}


//NOTES:

//  Instead of doing seperate 'a' and then 'b', send current number as argument
//have function findCurrent() that finds if we are on 'a' or on 'b'
//  Make answer incapable  of being longer than 10 or something
//  Make function for updating variables:
//if (findCurrent()==a){
//   a=variable;
//}
//else{
//    b=variable;
//}

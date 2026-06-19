// Select the calculator display element
let display = document.querySelector(".display_input span");

// Select all calculator buttons
const box1 = document.querySelectorAll(".box1");
let Dot_in_Calculator = true;

// Used for toggling between opening and closing parenthesis
let leftB = 0;
const lastChar = display.innerText[display.innerText.length - 1] ;
const SecondlastChar = display.innerText[display.innerText.length - 2] ;
let operator = true


// Clears the calculator screen
function clearScreen() {
  display.innerText = "";
  leftB = 0;
  Dot_in_Calculator = true;
}

// Add click event listener to every calculator button
box1.forEach((element) => {
  element.addEventListener("click", (event) => {

    

    if (event.target.textContent === "C") {
      
      clearScreen();
    }

    // Equal button
    else if (event.target.textContent === "=") {

      Evaluation_Compute();
    }

    // Parenthesis button
    else if (event.target.textContent === "()") {
      handleParenthesis();
    }

    // All other buttons
    else if(display.innerText.length === 0){
      // console.log(display.innerText);
      
      if( ('*/%+').includes(event.target.innerText)) return;
      else if(event.target.innerText === ".") {
        
        
        Dot_in_Calculator = !Dot_in_Calculator
        display.innerText +='0.'
      }
      else display.innerText += (event.target.textContent)
      
    }

    // Handle all numbers
    else if(('0123456789').includes(event.target.innerText)){
      
      display.innerText += event.target.innerText
    }


    else{
      if(event.target.innerText === '.' && Dot_in_Calculator)
      {
          // Dot_in_Calculator = !Dot_in_Calculator
          display.innerText += (event.target.textContent);
      }

      else if(('+-x*/%').includes(event.target.innerText) ){

        
        if( event.target.innerText !== lastChar ){
          
          
          display.innerText += event.target.innerText;
        }

      }
      else return;   
      
    }

  });
});

// Keyboard support
document.addEventListener("keydown", (event) => {
  // Press Enter to calculate
  if(('+-x/%()').includes(lastChar)){
    Dot_in_Calculator = true;
    if(event.key === 'Backspace') Dot_in_Calculator = false
    
  } 
  if (event.key === "Enter") {
    Evaluation_Compute();
  }

  // Press Backspace to delete last character
  else if (event.key === "Backspace") {
    
    if(lastChar === '('  ) leftB --;
    else if(lastChar)

    display.innerText = display.innerText.slice(0, -1);
  }

  // Press C or c to clear screen
  else if (event.key.toLowerCase() === "c") {
    clearScreen();
  }

  else if(event.key === '='){
    Evaluation_Compute()
  }

  else if(display.innerText.length === 0){
      // console.log(display.innerText);
      
      if( ('*/%+').includes(event.key)) return;
      else if(event.key === ".") {
        
        
        Dot_in_Calculator = !Dot_in_Calculator
        display.innerText +='0.'
      }
      else display.innerText += (event.key)
      
  }

    // Handle all numbers
  else if(('0123456789').includes(event.key)){
      display.innerText += event.key
  }

  else {
    if (("0123456789()+-*/.").includes(event.key)) {
      display.innerText+=(event.key)
    }
    else return;
  }
});

// Evaluates the expression written on display
function Evaluation_Compute() {
  try {
    // Evaluate mathematical expression
    let ev = eval(display.innerText);

    // Show result on screen
    display.textContent = ev;
  } catch (error) {
    // If expression is invalid
    display.innerText = "invalid";
  }
}

// Adds values to display
function ExpressionAddDisplay(value) {
  // Clear display if previous result was invalid
  if (display.innerText === "invalid" || display.innerText === 0) {

    
    display.innerText = "";
  }

  // Limit expression length to 15 characters
  if (display.innerText.length === 15) {
    return;
  }

  // Reduce font size for longer expressions
  else if (display.innerText.length > 7) {
    display.style.fontSize = "25px";
  }

  // Use larger font size for shorter expressions
  else {
    display.style.fontSize = "50px";
  }

  // Append new value to display
  display.innerText += value;
}

// A function to handle the parenthesis Logic part
function handleParenthesis() {
  // cases -> 1) num then press -> 8x(  , 2) none size press -> adds up till next num -> ((((((( (count left and right), 3) num then press continiously ->8x(((((
  // cases 1) -> num toh () par -> 8x(
  // cases 2) -> num toh () par -> 8x( , but agar again press then -> 8x(((((((
  // cases 3) -> khali hai toh ((((((
  // cases 4) -> khali hai toh (((((( toh jab tak number ni atta  tab jake ) use karni hai only ohk
  // cases 5)  8x((((((( tab tak number ni aata tab jake ) use karni hai

  let str = display.innerText;
  let slength = str.length;

  if (slength === 0  ) {
    leftB += 1;
    ExpressionAddDisplay("(");
  }
  else if(slength === 1){
    let lc = str[slength-1];
    if(('0123456789').includes(lc)){
      
      
      leftB+=1
      ExpressionAddDisplay('*(')
    }
    else{
      leftB+=1
      ExpressionAddDisplay('(')
    }
  }

  // last is not a number && sec last is also not a number
  else if (
    leftB &&
    !"0123456789".includes(str[slength - 1]) &&
    !"0123456789".includes(str[slength - 2])
  ) {
    if (str[slength - 1] === "(") {
      leftB += 1;
      ExpressionAddDisplay("(");
    } else {
      if (leftB) {
        ExpressionAddDisplay(")");
        leftB -= 1;
      }
    }
  }

  // last is a number && sec last is also  a number
  else if (
    "0123456789".includes(str[slength - 1]) &&
    "0123456789".includes(str[slength - 2])
  ) {
    if(leftB){
      leftB = leftB-1;
      ExpressionAddDisplay(')')
    }
    else{
      leftB += 1;
      ExpressionAddDisplay("*(");
    }
  }

  // last is a number && sec last is also not a number
  else if (
    leftB &&
    "0123456789".includes(str[slength - 1]) &&
    !"0123456789".includes(str[slength - 2])
  ) {

    if(leftB){
      leftB = leftB - 1;
      ExpressionAddDisplay(')')
    }
    else{
      leftB = leftB - 1;
      ExpressionAddDisplay(")");
    }``
  }

  // last is not a number && sec last is a number
  else if (
    leftB &&
    !"0123456789".includes(str[slength - 1]) &&
    "0123456789".includes(str[slength - 2])
  ) {
    leftB = leftB - 1;
    ExpressionAddDisplay(")");
  } else {
    leftB += 1;
    ExpressionAddDisplay("*(");
  }
}



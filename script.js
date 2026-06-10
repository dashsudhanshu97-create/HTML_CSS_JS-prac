const display = document.querySelector(".display_input span");
const box1 = document.querySelectorAll(".box1");

function clearScreen() {
  display.innerText = "";
}

box1.forEach((element) => {
  element.addEventListener("click", (event) => {

    if (event.target.textContent === "C") {
      clearScreen();
    } 

    else if (event.target.textContent === "=") {
      Evaluation_Compute();

    } 
    
    else {
      ExpressionAddDisplay(event.target.textContent);
    }

  });
});

function Evaluation_Compute() {
  try {
    let ev = eval(display.innerText);
    display.textContent = ev;
  } catch (error) {
    display.innerText = "invalid";
  }
}

function ExpressionAddDisplay(value) {
    console.log(display);
    
  display.innerText += value;
  console.log(display);
}

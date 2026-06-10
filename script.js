const display = document.querySelector('.display_input span');
const box1 = document.querySelectorAll('.box1')

box1.forEach(element => {
    element.addEventListener('click',(event)=>{
    

    if(event.target.textContent === 'C'){

        console.log(event.target.textContent);
        
        clearScreen()

    }


    else if (event.target.textContent !== '='){


        ExpressionDisplayScreen();

    }

    else if(event.target.textContent === '='){

        
        Evaluation_Compute();
    
    }
})
});


function clearScreen(){

    display.innerText = '';

}

function Evaluation_Compute(){

    let ev = display.innerText;
    console.log(display)
    ev = eval(ev)
    display.innerText = ev;
}

function ExpressionDisplayScreen(){
        let UserBttnPress = event.target.textContent;
        display.innerHTML += UserBttnPress;
}





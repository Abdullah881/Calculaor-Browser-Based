// creates an object to keep track of values


const Calculator = {
    // Display zero initially on screen
    Display_Value: '0',
    // Create a const to hold the first operand, set to null initially
    First_Operand: null,
    // wait and check if second operand has been inputted 
    Wait_Second_Operand: true,
    //Create a const to hold the operator, set to null initially
    operator: null,
};

// function to modify value as each button is clicked

function Input_Digit(digit) {
    const {Display_Value, Wait_Second_Operand} = Calculator;
    // this checks if the Wait_Second_Operand is true and sets Display_Value
    if (Wait_Second_Operand == true) {
        Calculator.Display_Value = digit;
        Calculator.Wait_Second_Operand = false;
    } else {
        // this overwrites the Display_Value if the current value is 0
        //otherwise it adds to it
        Calculator.Display_Value = Display_Value === '0' ? digit : Display_Value + digit;

    }
}

// This Section handles decimal points
function Input_Decimal(dot) {
    // this ensures that an accidental click of decimal point doesn't cause a bug
    if (Calculator.Wait_Second_Operand == true) return;
    if (!Calculator.Display_Value.includes(dot)){
        // We are saying if the display_value does not contain a decimal point
        // to add decimal point
        Calculator.Display_Value += dot;
    }
}

// this section handles operators 

function Handle_Operator(Next_Operator) {
    const {First_Operand, Display_Value, operator} = Calculator;
    //when operator key is pressed we convert the current number
    // Displayed on the scenario a number and then store the
    // result in Calculator.First_Operand , if it does not exist already
    const Value_of_Input = parseFloat(Display_Value);
    // check if operator already exists and if wait_second_operand is true 
    //then updates the operator an exits the function 
    if (operator && Calculator.Wait_Second_Operand){
        Calculator.operator = Next_Operator;
        return;
    }
    if (First_Operand == null) {
        Calculator.First_Operand = Value_of_Input;
    } else if (operator) {
        const Value_Now = First_Operand || 0;
        //check if operator exists, property lookup is preformed for the operator 
        // in the perform object and the function that matches the operator is executed
        let result = Perform_Calculation[operator](Value_Now, Value_of_Input);
        // here we fixed amount of numbers after the decimal
        result = Number(result).toFixed(9);
        // this will remove any trailing 0s
        result = (result * 1).toString();
        Calculator.Display_Value = parseFloat(result);
        Calculator.First_Operand = parseFloat(result);
    }
    Calculator.Wait_Second_Operand = true;
    Calculator.operator = Next_Operator;
}

const Perform_Calculation = {
    '/' : (First_Operand , Second_Operand) => First_Operand / Second_Operand,
    '*' : (First_Operand , Second_Operand) => First_Operand * Second_Operand,
    '-' : (First_Operand , Second_Operand) => First_Operand - Second_Operand,
    '+' : (First_Operand , Second_Operand) => First_Operand + Second_Operand,
    '=' : (First_Operand , Second_Operand) => Second_Operand,

}

function Calculator_Reset() {
    Calculator.Display_Value = 0;
    Calculator.First_Operand = null;
    Calculator.Wait_Second_Operand = false;
    Calculator.operator = null;
}

// this function updates the calculator screen with Display_Value

function Update_Display(){
    // makes sure the calculator screen class to target the
    // input tag in html document
    const display = document.querySelector('.calculator-screen');
    display.value = Calculator.Display_Value;
}

Update_Display();

// this section monitors button clicks

const keys = document.querySelector('.calculator-keys');
keys.addEventListener('click',(event) => {
    // the target variable is an object that represents the element
    //that was clicked
    const {target} = event;
    // if the element that was clicked on is not a button; exit function
    if (!target.matches('button')){
        return;
    }
    if (target.classList.contains('operator')) {
        Handle_Operator(target.value);
        Update_Display();
        return;
    }
    if (target.classList.contains('decimal')) {
        Input_Decimal(target.value);
        Update_Display();
        return;
    }
    //ensures that AC clears all inputs from calculator screen
    if (target.classList.contains('all-clear')){
        Calculator_Reset();
        Update_Display();
        Calculator.Wait_Second_Operand = true;
        return;
    }
    Input_Digit(target.value);
    Update_Display();
})

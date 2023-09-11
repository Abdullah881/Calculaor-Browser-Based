// creates an object to keep track of values

const Calculator = {
    // Display zero initially on screen
    Display_Value: '0',
    // Create a const to hold the first operand, set to null initially
    First_Operand: null,
    // wait and check if second operand has been inputted 
    Wait_Second_Operand: false,
    //Create a const to hold the operator, set to null initially
    operator: null,
};

// function to modify value as each button is clicked

function Input_Digit(digit) {
    const {Display_Value, Wait_Second_Operand} =Calculator;
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
    // to add decimal point
    Calculator.Display_Value += dot;
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
    if (First_Operand == null) {
        Calculator.First_Operand = Value_of_Input;

    } else if (operator) {
        //check if operator exists, property lookup is preformed for the operator 
        // in the preform_calculation object and the function that matches the operator is executed
        let result = Preform_Calculation[operator](value_Now, Value_of_Input);
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

const Preform_Calculation = {
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

function Update_Display(){}
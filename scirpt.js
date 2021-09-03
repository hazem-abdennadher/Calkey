
//=================>Theme changer
const themeButton = document.getElementById("theme-button")
const themeIcon = document.getElementById("theme-icon")
const body = document.body;
const icon="uil-sun"
const theme="dark-theme"

themeButton.addEventListener("click", ()=>{
    themeIcon.classList.toggle(icon)
    body.classList.toggle(theme)

})



//============================================================>Calculator
//---------variables 

class Calculator{
    constructor(previousOperandText,currentOperandText){
        this.previousOperandText = previousOperandText
        this.currentOperandText = currentOperandText
        this.clear()
    }

    clear(){
        this.previousOperand = ""
        this.currentOperand = ""
        this.operation = undefined
    }


    addNumber( number ){
        if(number === '.' && this.currentOperand.includes(".")) return 
        else if(number === '.' && (this.currentOperand ==="0" || this.currentOperand === "")){
            this.currentOperand = "0" + "."
        }
        else if(this.currentOperand === "0") {
            this.currentOperand = number
        }
        else{
            this.currentOperand = this.currentOperand + number
        }
       
    }

    selectOperation(operation){
        if(this.currentOperand=="") return

        if(this.previousOperand !== ""){
            this.calculate()
        }



        this.operation=operation
        if(this.currentOperand === "0."){
            this.previousOperand = this.currentOperand +"0" 
        }
        else { 
            this.previousOperand = this.currentOperand
        }
       
        this.currentOperand = ""
        
    }   
    getDisplaynumbers(number){
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        if (isNaN(integerDigits)) {
          integerDisplay = ''
        } else {
          integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
        }
        if (decimalDigits != null) {
          return `${integerDisplay}.${decimalDigits}`
        } else {
          return integerDisplay
        }
    }
    updateDisplay(){
         
        this.currentOperandText.innerHTML =this.getDisplaynumbers(this.currentOperand)
      
        if(this.operation != null){
           this.previousOperandText.innerHTML = `${this.getDisplaynumbers(this.previousOperand)} ${this.operation}`
        }else{
            this.previousOperandText.innerHTML =""
        }
        
    }
    calculate(){
    
        let num1 = parseFloat(this.currentOperand)
        let num2 = parseFloat(this.previousOperand)
        if(isNaN(num1)||isNaN(num2))return 
        this.currentOperand =  this.getResult(num2,this.operation,num1) 
        this.previousOperand = ""
        this.operation = undefined
    }


    getResult(n1,op,n2){
        if(op ==="+"){
            return n1+n2
        }else if(op=="-"){
            return n1-n2
        }
        else if(op=="*"){
            return n1*n2
        }
        else if(op=="/"){
            return n1/n2
        }
        else{
            return
        }
    }

}


const numbersButton = document.querySelectorAll("[date-num]")
const operationButton = document.querySelectorAll("[date-op]")
const equalsButton = document.querySelector('[data-equals]')
const clearButton = document.querySelector('[data-clear]')
const previousOperandText = document.querySelector('[data-previous-operand]')
const currentOperandText = document.querySelector('[data-current-operand]')





const calculator = new Calculator(previousOperandText,currentOperandText);

numbersButton.forEach(button => {
    button.addEventListener("click",()=>{
        calculator.addNumber(button.value)
        calculator.updateDisplay()
    })
    
});
operationButton.forEach(button => {
    button.addEventListener("click",()=>{
        calculator.selectOperation(button.value)
        calculator.updateDisplay()
    })
});


equalsButton.addEventListener("click", ()=>{
    calculator.calculate()
    calculator.updateDisplay()
})



clearButton.addEventListener("click", ()=>{
    calculator.clear()
    calculator.updateDisplay()
})







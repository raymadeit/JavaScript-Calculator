/**
 * Performs basic calculator operations.
 */
class Calculator {
  /**
   * @param {Element} previousOperandDiv The DIV of the previous operand
   * @param {Element} currentOperandDiv The DIV of the current operand
   */
  constructor(previousOperandDiv, currentOperandDiv) {
    /** @private @const {!Element} */
    this.previousOperandDiv_ = previousOperandDiv;

    /** @private @const {!Element} */
    this.currentOperandDiv_ = currentOperandDiv;
    
    /** @private {string} */
    this.operation_ = '';

    /** @private {string} */
    this.currentOperand_ = '';

    /** @private {string} */
    this.previousOperand_ = '';
  }

  /**
   * Adds a number to the current operand.
   * @param {number} number The number to add
   */
  appendNumber(number) {
    if (number === '.' && this.currentOperand_.includes('.')) {
      return;
    }
    this.currentOperand_ = this.currentOperand_ + number.toString();
  }

  /**
   * Sets the operation for the calculator.
   * @param {string} operation The operation to use, e.g. addition
   */
  setOperation(operation) {
    if (this.currentOperand_ === '') {
      return;
    }
    if (this.previousOperand_ !== '') {
      this.calculate();
    }
    this.operation_ = operation;
    this.previousOperand_ = this.currentOperand_;
    this.currentOperand_ = '';
  }

  /**
   * Deletes the most recently added number in the current operand.
   */
  delete() {
    this.currentOperand_ = this.currentOperand_.slice(0, -1);
  }

  /**
   * Performs a calculation.
   */
  calculate() {
    const previous = parseFloat(this.previousOperand_);
    const current = parseFloat(this.currentOperand_);
    if (isNaN(previous) || isNaN(current)) {
      return;
    }

    let result;
    switch(this.operation_) {
      case '÷':
        result = previous / current;
        break;

      case '*':
        result = previous * current;
        break;

      case '+':
        result = previous + current;
        break;

      case '-':
        result = previous - current;
        break;

      default:
        result = '';
        break;
    }

    this.previousOperand_ = '';
    this.currentOperand_ = result;
    this.operation_ = '';
  }

  /**
   * Clears the contents of the calculator.
   */
  clear() {
    this.operation_ = '';
    this.currentOperand_ = '';
    this.previousOperand_ = '';
  }

  /**
   * 
   * @param {number} number The number to display.
   */
  displayNumber(number) {
    const stringifiedNumber = number.toString();
    const integerDigits = parseFloat(stringifiedNumber.split('.')[0]);
    const decimalDigits = stringifiedNumber.split('.')[1];

    let intDisplay = '';
    if (!isNaN(integerDigits)) {
      intDisplay =
          integerDigits.toLocaleString('en', { maximumFractionDigits: 0 });
    }

    let decimalDisplay = '';
    if (decimalDigits != null) {
      decimalDisplay = "." + decimalDigits.toLocaleString('en')
    }

    return `${intDisplay}${decimalDisplay}`
  }

  /**
   * Updates the display of the calculator.
   */
  updateDisplay() {
    this.currentOperandDiv_.innerText =
        this.displayNumber(this.currentOperand_);
    if (this.operation_ !== '') {
      this.previousOperandDiv_.innerText =
          `${this.displayNumber(this.previousOperand_)} ${this.operation_}`;
    } else {
      this.previousOperandDiv_.innerText = '';
    } 
  }
}

/**
 * Starting point of the application.
 */
function run() {
  const previousOperandDiv = document.querySelector('[data-previous-operand]');
  const currentOperandDiv = document.querySelector('[data-current-operand]')
  const calculator = new Calculator(previousOperandDiv, currentOperandDiv);

  const numberButtons = document.querySelectorAll('[data-number]');
  numberButtons.forEach( button => {
    button.addEventListener('click', () => {
      calculator.appendNumber(button.innerText);
      calculator.updateDisplay();
    })
  })

  const operationButtons = document.querySelectorAll('[data-operation]');
  operationButtons.forEach( button => {
    button.addEventListener('click', () => {
      calculator.setOperation(button.innerText);
      calculator.updateDisplay();
    })
  })

  const deleteButton = document.querySelector('[data-delete]');
  deleteButton.addEventListener('click', () => {
    calculator.delete();
    calculator.updateDisplay();
  })

  const equalsButton = document.querySelector('[data-equals]');
  equalsButton.addEventListener('click', () => {
    calculator.calculate();
    calculator.updateDisplay();
  })

  const allClearButton = document.querySelector('[data-all-clear]');
  allClearButton.addEventListener('click', () => {
    calculator.clear();
    calculator.updateDisplay();
  })
}

run();


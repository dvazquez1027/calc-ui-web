export const CalcOperations = {
  PLUS: "+",
  MINUS: "-",
  MULTIPLY: "*",
  DIVIDE: "/",
  EQUALS: "=",
  DECIMAL: ".",
  CLEAR: "C",
  CLEAR_ALL: "AC",
  precedence: function(operator) {
    switch (operator) {
      case CalcOperations.PLUS:
      case CalcOperations.MINUS:
        return 1;

      case CalcOperations.MULTIPLY:
      case CalcOperations.DIVIDE:
        return 2;

      case CalcOperations.EQUALS:
        return 0;

      default:
        return -1;
    }
  },
  operate: function(operator, left, right) {
    switch (operator) {
      case CalcOperations.PLUS:
        return left + right;

      case CalcOperations.MINUS:
        return left - right;

      case CalcOperations.MULTIPLY:
        return left * right;

      case CalcOperations.DIVIDE:
        return left / right;

      default:
        break;
    }
  }
};

export const CalcDigits = {
  ONE: "1",
  TWO: "2",
  THREE: "3",
  FOUR: "4",
  FIVE: "5",
  SIX: "6",
  SEVEN: "7",
  EIGHT: "8",
  NINE: "9",
  ZERO: "0"
};

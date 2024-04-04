class Calculator {
  // 小數點後保留位數
  constructor(round) {
    this.round = round
  }

  // 運算: (1)拆解數字及運算符號 (2)依運算子優先順序運算
  compute(formula) {
    const elements = this.parse(formula)
    const answer = this.compute_(elements)
    return answer
  }

  // (1)拆解數字及運算符號：'1/2*7/3+3-2' 轉換成陣列 [1,'/',2,'*',7...]
  parse(formula) {
    const elements = []

    // 使用正則表達式比對數字(含浮點數)和運算子
    const regex = /(\d+(\.\d+)?|\+|\-|\*|\/)/g
    const matches = formula.match(regex)

    // 將數字轉為數字型態
    matches.forEach((match) => {
      if (isNaN(match)) {
        elements.push(match)
      } else {
        elements.push(Number(match))
      }
    })
    return elements
  }

  // (2)依運算子優先順序運算：[1,'/',2,'*',7...] 的計算結果
  compute_(elements) {
    const empty = 'empty'

    // 先計算乘與除
    let elementLength = elements.length
    for (let index = 0; index < elementLength; index++) {
      const element = elements[index]
      if (element === '*' || element === '/') {
        // 使用 calculate 函式執行運算
        let result = this.calculate(
          element,
          elements[index - 1],
          elements[index + 1]
        )
        // 避免執行運算後，陣列長度變短，影響 for 迴圈 index ，故先以 empty 填補
        elements.splice(index - 1, 3, empty, empty, result)
      }
    }
    // 清除 empty 填補的值，續行後續加減運算
    elements = elements.filter((element) => element !== empty)

    // 後計算加與減
    elementLength = elements.length
    for (let index = 0; index < elementLength; index++) {
      const element = elements[index]
      if (element === '+' || element === '-') {
        // 使用 calculate 函式執行運算
        let result = this.calculate(
          element,
          elements[index - 1],
          elements[index + 1]
        )
        // 避免執行運算後，陣列長度變短，影響 for 迴圈 index ，故先以 empty 填補
        elements.splice(index - 1, 3, empty, empty, result)
      }
    }
    // 清除 empty 填補的值，輸出最終運算結果
    let answer = elements.filter((element) => element !== empty)
    console.log(answer)

    // 設定小數點後幾位數，轉成數字型態後，回傳
    return Number(answer[0].toFixed(this.round)) //'23.00000' => 23
  }

  calculate(operator, operand1, operand2) {
    switch (operator) {
      case '+':
        return operand1 + operand2
      case '-':
        return operand1 - operand2
      case '*':
        return operand1 * operand2
      case '/':
        if (operand2 !== 0) {
          return operand1 / operand2
        } else {
          return 'Error: Division by zero!'
        }
      default:
        return 'Error: Invalid operator'
    }
  }
}

// 建立 Calculator 實例，取到小數點第五位數
const Calculation = new Calculator(5)

// 其他路徑得引用 class Calculator
module.exports = Calculation

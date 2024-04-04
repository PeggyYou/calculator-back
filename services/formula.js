class Calculator {
  // 小數點後保留位數
  constructor(round) {
    this.round = round
  }

<<<<<<< HEAD
  // 統包計算公式 (一次處理加減乘除)
=======
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

  // 版本1: 統包計算公式 (一次處理加減乘除) => 棄用，程式碼太複雜，不利使用
>>>>>>> feature/task2-formula-algorithm
  formula(value) {
    // const decodedStr = decodeURIComponent(value)
    const decodedStr = value
    console.log(`decodedStr: ${decodedStr}, value: ${value}`)

    // 拆解加號(+)
    const str_plus = decodedStr.split('+')

    // 拆解減號(-)
    const str_minus_list = []
    str_plus.forEach((item) => {
      const str_minus = item.split('-')

      //當偵測到減號(-)，插入 minus 字串
      let str_minus_length = item.split('-').length
      if (str_minus_length > 1) {
        for (let i = 1; i < str_minus_length; i += 2) {
          str_minus.splice(i, 0, 'minus')
          str_minus_length += 1
        }
      }
      str_minus_list.push(str_minus)
    })

    // 拆解乘號和除號，並標示運算符號
    const str_multiplication_division_list = []
    str_minus_list.forEach((item) => {
      item.forEach((element) => {
        let operation = element.match(/(\d+)([\/*])(\d+)/)
        let cal = ''
        // 當匹配到乘號(*)或除號(/)，執行乘除運算
        while (operation) {
          if (operation[2] === '*') {
            cal = Number(operation[1]) * Number(operation[3])
            // 將運算結果與原始字串串接
            element =
              cal.toString() + operation.input.slice(operation[0].length)
          } else if (operation[2] === '/') {
            cal = Number(operation[1]) / Number(operation[3])
            // 將運算結果與原始字串串接
            element =
              cal.toString() + operation.input.slice(operation[0].length)
          }
          // 重複比對原始字串是否仍有乘號(*)或除號(/)，如有，再次執行運算
          operation = element.match(/(\d+)([\/*])(\d+)/)
        }
        str_multiplication_division_list.push(element)
      })
    })

    // 將完成乘除計算的數字，繼續執行加號(+)及減號(-)運算
    let result = Number(str_multiplication_division_list[0])
    for (let i = 1; i < str_multiplication_division_list.length; i++) {
      // 當有minus字串，則執行減號(-)運算
      if (str_multiplication_division_list[i] === 'minus') {
        result = result - Number(str_multiplication_division_list[i + 1])
        i = i + 1
      } else {
        //否，則執行加號(+)運算
        result = result + Number(str_multiplication_division_list[i])
      }
    }

    // 運算到小數指定位數 (有小數位則計算至指定位數，無則運算至整數)
    function roundDecimal(val, precision) {
      return (
        Math.round(Math.round(val * Math.pow(10, (precision || 0) + 1)) / 10) /
        Math.pow(10, precision || 0)
      )
    }
    result = roundDecimal(result, this.round)

    return result
  }
}

// 其他路徑得引用 class Calculator
module.exports = Calculator

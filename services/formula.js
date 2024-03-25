class Calculator {
  //小數點後保留位數
  constructor(round) {
    this.round = round
  }

  plus(v1, v2) {
    const answer = v1 + v2
    return answer
  }

  minus(v1, v2) {
    const answer = v1 - v2
    return answer
  }

  divide(v1, v2) {
    const answer = Number((v1 / v2).toFixed(this.round))
    return answer
  }

  multiply(v1, v2) {
    const answer = v1 * v2
    return answer
  }

  // 統包計算公式 (一次處理加減乘除)
  formula(value) {
    const decodedStr = decodeURIComponent(value)

    // 拆解加號(+)
    const str_plus = decodedStr.split('+')

    // 拆解減號(-)
    const str_minus_list = []
    str_plus.forEach((item) => {
      const str_minus = item.split('-')

      //當偵測到減號(-)，插入minus字串
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

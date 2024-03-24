// 引用後端框架 express
const express = require('express')
const cors = require('cors')

// 建立 express 實例
const app = express()

// 使用 cors 中間件，允許不同網域來的請求，免於同源策略的限制
app.use(cors())

// 設置監聽的 port (後端 URL 會是 localhost:[PORT])
const PORT = 3000

// 運算式規則
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

// 建立實例 (數字取到小數點第五位)
const c = new Calculator(5)

// 處理 GET localhost:[PORT] 的請求(註：localhost:[PORT] 和 localhost:[PORT]/ 是等價的，結尾有無 / 都一樣)
// req: 前端發送來的請求物件
// res: 回傳給前端的回應物件，可以透過 send 回傳字串，或透過 json 回傳 json 格式數據。
app.get('/', (req, res) => {
  // 以字串形式返回
  res.status(200).send('This is backend of Calculator.')

  // res 的 status 設置 HTTP 回應碼，若沒設置，預設為 200
  // res.send('This is backend of Calculator.')
})

// 處理 GET localhost:[PORT]/plus?v1=xxx&v2=xxx 的請求
// ex:
// request: /plus?v1=3&v2=7
// response: { answer: 10 }
app.get('/plus', (req, res) => {
  const QUERY = req.query
  // v1 和 v2 必須為數字，目前尚未處理非數字的情況
  const v1 = Number(QUERY.v1)
  const v2 = Number(QUERY.v2)
  const answer = c.plus(v1, v2)
  res.json({
    answer
  })
})

// 處理 GET localhost:[PORT]/minus?v1=xxx&v2=xxx 的請求
// ex:
// request: /minus?v1=3&v2=7
// response: { answer: -4 }
app.get('/minus', (req, res) => {
  const QUERY = req.query
  const v1 = Number(QUERY.v1)
  const v2 = Number(QUERY.v2)
  const answer = c.minus(v1, v2)
  res.json({
    answer
  })
})

// 處理 GET localhost:[PORT]/multiply?v1=xxx&v2=xxx 的請求
// ex:
// request: /multiply?v1=3&v2=7
// response: { answer: 21 }
app.get('/multiply', (req, res) => {
  const QUERY = req.query
  const v1 = Number(QUERY.v1)
  const v2 = Number(QUERY.v2)
  const answer = c.multiply(v1, v2)
  res.json({
    answer
  })
})

// 處理 GET localhost:[PORT]/divide?v1=xxx&v2=xxx 的請求
// ex:
// request: /divide?v1=3&v2=7
// response: { answer: 0.42857 }
app.get('/divide', (req, res) => {
  const QUERY = req.query
  const v1 = Number(QUERY.v1)
  const v2 = Number(QUERY.v2)
  // 預設只保留小數點後 ROUND 位
  const answer = c.divide(v1, v2)
  res.json({
    answer
  })
})

// 處理 GET localhost:[PORT]/formula?value=12+2-4*5/2 的請求
// ex:
// request: /formula?value=1+2-4*5/6
// response: { answer: 4 }
app.get('/formula', (req, res) => {
  const QUERY = req.query
  const value = QUERY.value
  const answer = c.formula(value)
  res.json({
    answer
  })
})

app.listen(PORT, () => {
  console.log(`express server is running on http://localhost:${PORT}`)
})

// 引用後端框架 express
const express = require('express')
const cors = require('cors')

// 建立 express 實例
const app = express()

// 使用 cors 中間件，允許不同網域來的請求，免於同源策略的限制
app.use(cors())

// 設置監聽的 port (後端 URL 會是 localhost:[PORT])
const PORT = 3000

// 引用 class Calculator
const Calculator = require('./services/formula')

// 建立 Calculator 實例 (數字取到小數點第五位)
const c = new Calculator(5)

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

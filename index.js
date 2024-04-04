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
const { calculator } = require('./services')

// 處理 GET localhost:[PORT]/formula?value=12+2-4*5/2 的請求
// ex:
// request: /formula?value=1+2-4*5/6
// response: { answer: 4 }
app.get('/formula', (req, res) => {
  const QUERY = req.query
  const value = QUERY.value
  // const answer = calculator.formula(value)
  const answer = calculator.compute(value)
  console.log(calculator.compute(value))
  res.json({
    answer
  })
})

app.listen(PORT, () => {
  console.log(`express server is running on http://localhost:${PORT}`)
})

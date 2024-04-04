// 引用後端框架 express
const express = require('express')
const cors = require('cors')

// 建立 express 實例
const app = express()

// 使用 cors 中間件，允許不同網域來的請求，免於同源策略的限制
app.use(cors())

// 告訴 Express 應用程式要使用 express.json() 中間件來解析請求主體中的 JSON 格式資料
app.use(express.json())

// 設置監聽的 port (後端 URL 會是 localhost:[PORT])
const PORT = 3000

// 引用及使用路由
const router = require('./routes')
app.use(router)

app.listen(PORT, () => {
  console.log(`express server is running on http://localhost:${PORT}`)
})

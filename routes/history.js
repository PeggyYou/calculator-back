// 引用 Express 與 Express 路由器
const Router = require('express')

// 引用 class
const { History } = require('../services')

// 建立路由物件
const router = Router()

// 處理 GET localhost:[PORT]/v2 的請求
// ex:
// request: /v2
// response: { history: [ { '1%2F2*7.123%2F3%2B3-2.34' : 1.84717 } ] }
router.get('/', (req, res) => {
  const history = History.getAll()
  res.json({
    history
  })
})

module.exports = router

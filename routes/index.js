// 引用 Express 與 Express 路由器
const Router = require('express')

// 建立根路由
const router = Router()

// 準備引入路由模組
const v1 = require('./calculation')

// 將 API-v1 相關路由加入根路由
router.use('/v1', v1)

// 匯出路由器
module.exports = router

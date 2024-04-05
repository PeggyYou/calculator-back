// 引用 Express 與 Express 路由器
const { Router } = require('express')

// 準備引入路由模組
const calculation = require('./calculation')
const history = require('./history')

const router = Router()

router.use('/calculation', calculation)
router.use('/history', history)

// 匯出路由器
module.exports = router

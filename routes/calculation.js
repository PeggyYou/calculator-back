const Router = require('express')
const { Calculation }= require('../services')

const router = Router()

router.get('/', (req, res) => {
  const QUERY = req.query
  const value = QUERY.value
  let answer = Calculation.compute(value)
  res.json({
    answer
  })
})

// 處理 PUT localhost:[PORT]/calculation?round=12 的請求
// ex:
// request: /v1?round=12
// response: { feedback: "成功" }
router.put('/', (req, res) => {
  const QUERY = req.query
  const round = QUERY.round
  let feedback = Calculation.roundChanged(round)
  res.json({
    feedback
  })
})

module.exports = router

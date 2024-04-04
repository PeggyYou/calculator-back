const Router = require('express')
const Calculation = require('../services')

const router = Router()

router.get('/',(req,res)=>{
  const QUERY = req.query
  const value = QUERY.value
  let answer = Calculation.compute(value)
  res.json({
    answer
  })
})

module.exports = router
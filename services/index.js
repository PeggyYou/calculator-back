// 引用 class Calculator
const Calculator = require('./formula')

// 建立 Calculator 實例 (數字取到小數點第五位)
const calculator = new Calculator(5)

module.exports = { calculator }

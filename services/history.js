class HistoryService {
  constructor() {
    this.HistoryService = []
  }

  add(formula, answer) {
    this.HistoryService.push({
      formula: formula,
      answer: answer
    })
  }

  getAll() {
    return this.HistoryService
  }
}

const History = new HistoryService()

module.exports = History

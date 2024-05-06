## API 請求回應格式

- GET /v2/calculation?value=12+2-4\*5/2
  - 取得運算結果
  - Response 數據格式：
  ```
  { answer: 4 }
  ```
- PUT /v2/calculation
  - 修改小數點位數
  - Request 數據格式：
  ```
  {
    "round":6
  }
  ```
  - Response 數據格式：
  ```
  {
    "feedback": "小數點後保留位數修改成功!"
  }
  ```
- GET /v2/history
  - 返回歷史記錄
  - Response 數據格式：
  ```
  {
    "history": [
        {
            "formula": "1/2*7.123/3+3-2.34",
            "answer": 1.84717
        },
        {
            "formula": "1/2*7.123/3+3-2.34",
            "answer": 1.847167
        }
    ]
  }
  ```

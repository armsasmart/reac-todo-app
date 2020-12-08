const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()
const PORT = process.env.PORT || 3000

const indexRouter = require('./routes/index')
const todoRouter = require('./routes/todos')

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/api', indexRouter)
app.use('/api/todos', todoRouter)

app.use((req, res) => {
  return res.status(404).json({
    data: null,
    message: "URL Not Found",
  })
})

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
})

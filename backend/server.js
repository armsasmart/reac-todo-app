const PORT = process.env.PORT || 3002
const app = require('./app')

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
})

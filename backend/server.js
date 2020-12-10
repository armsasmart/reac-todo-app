const PORT = process.env.PORT || 3000
const app = require('./app')

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
})

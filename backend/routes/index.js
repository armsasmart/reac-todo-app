const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  const apiInfo = {
    status: 'running'
  }
  res.send(apiInfo)
})

module.exports = router

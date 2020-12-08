const mongoose = require('mongoose')
const todoSchema = new mongoose.Schema({
  message:{
    type: String,
    required: true,
    unique: true
  },
  completed:{
    type: Boolean,
    default: false
  }
})

const todoModel = mongoose.model('Todo', todoSchema)
module.exports = todoModel

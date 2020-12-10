const express = require('express')
const router = express.Router()
const Todo = require('../models/todo')

router.get('/', async (req, res) => {
  try {
    const todos = await Todo.find({})
    res.status(200).json({
      data: todos,
      message: null
    })
  }
  catch (error) {
    res.status(500).json({
      data: null,
      message: 'can not get todos'
    })
  }
})

router.post('/', async (req, res) => {
  try {
    const todo = await Todo.create(req.body)
    res.status(200).json({
      data: todo,
      message: null
    })
  }
  catch (error) {
    res.status(500).json({
      data: null,
      message: 'can not create todo'
    })
  }
})

router.put('/:id', async (req, res) => {
  try {
    const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.status(200).json({
      data: todo,
      message: null
    })
  }
  catch (error) {
    res.status(500).json({
      data: null,
      message: 'can not update todo'
    })
  }
})

router.delete('/:id', async (req, res) => {
  try {
    await Todo.findByIdAndRemove(req.params.id)
    res.status(200).json({
      data: null,
      message: 'deleted successful'
    })
  }catch (error){
    res.status(500).json({
      data: null,
      message: 'can not delete todo'
    })
}
})

module.exports = router

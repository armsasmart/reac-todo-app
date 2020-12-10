const request = require('supertest')
const app = require('../app')
const mongoDB = require('../models');
const Todo = require('../models/todo')


describe('Todo CRUD', () => {
  beforeAll(async () => {
    await mongoDB.connect()
  });

  beforeEach(async () => {
    await Todo.deleteMany()
  })

  afterEach(async () => {
    await Todo.deleteMany()
  })

  afterAll(async () => {
    await mongoDB.disconnect()
  })

  test('It should get todo', async done => {
   await request(app)
    .get('/api/todos/')
    .then(response => {
      expect(response.statusCode).toBe(200)
      expect(response.body.data).toEqual([])
      expect(response.body.message).toBe(null)
      done()
    })
  })

  test('It should create todo', async done => {
    const requestBody = {
      'message': 'todo 1'
    }
    await request(app)
    .post('/api/todos/')
    .send(requestBody)
    .then(response =>{
      expect(response.statusCode).toBe(200)
      expect(response.body.data.message).toBe('todo 1')
    })

    const todos = await Todo.find({})
    expect(todos).toHaveLength(1)
    expect(todos[0].message).toBe('todo 1')
    expect(todos[0].completed).toBe(false)
    done()
  })


  test('It shout update todo', async done => {
    const todoOld = {
      'message': 'eating'
    }
    const { _id, completed } = await Todo.create(todoOld)
    expect(completed).toBe(false)

    const requestBody = {
      'completed': true
    }

   await request(app)
    .put(`/api/todos/${_id}`)
    .send(requestBody)
    .then(response => {
      expect(response.statusCode).toBe(200)
      expect(response.body.data.completed).toBe(true)
      done()
    })

  })

  test('It shout delete todo', async done => {
    const todoOld = {
      'message': 'eating'
    }
    const { _id, completed } = await Todo.create(todoOld)
    expect(completed).toBe(false)

    await request(app)
    .delete(`/api/todos/${_id}`)
    .then(response => {
      expect(response.statusCode).toBe(200)
    })

    const todos = await Todo.find({})
    expect(todos).toHaveLength(0)
    done()
  })
})

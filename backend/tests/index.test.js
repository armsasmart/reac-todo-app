const request = require('supertest')
const app = require('../app')

describe('Test the root path', () => {
  test('It should response the GET method', done => {
    request(app)
    .get('/api')
    .then(response => {
      expect(response.statusCode).toBe(200)
      expect(response.body.status).toBe('running')
      done()
    })
  })
})
